using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Specialized;
using System.Text;
using System.IO;
using Sitecore.CH.Base.Services;
using Sitecore.CH.Implementation.Services.Config;

namespace Sitecore.CH.Implementation.AzFunctions.Functions
{
    public class H_ReactServerSideLogging
    {
        private readonly ILogger _logger;
        private readonly BlobStorageConfig _blobStorageConfig;

        public H_ReactServerSideLogging(ILoggerService<H_ReactServerSideLogging> logger, IOptions<BlobStorageConfig> storageOptions)
        {
            this._logger = logger;
            _blobStorageConfig = storageOptions.Value;
        }

        [FunctionName("H_ReactServerSideLogging")]
        public async Task<IActionResult> EntryPoint(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req, ILogger log)
        {
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var data = JsonConvert.DeserializeObject<dynamic>(requestBody);
                string logMessage = data.message;

                log.LogInformation(logMessage);
                // Retrieve the connection string from the application settings.
                var connectionString = _blobStorageConfig.ConnectionString;
                var containerName = "external-component-log";
                var blobName = $"log-{DateTime.UtcNow:yyyy-MM-dd}.txt";

                var blobServiceClient = new BlobServiceClient(connectionString);
                var containerClient = blobServiceClient.GetBlobContainerClient(containerName);
                await containerClient.CreateIfNotExistsAsync();
                var appendBlobClient = containerClient.GetAppendBlobClient(blobName);

                if (!await appendBlobClient.ExistsAsync())
                {
                    await appendBlobClient.CreateAsync();
                }

                // Append a new line to the blob for each log message.
                using (var stream = new MemoryStream(Encoding.UTF8.GetBytes(logMessage + Environment.NewLine)))
                {
                    await appendBlobClient.AppendBlockAsync(stream);
                }

                var response = new
                {
                    Message = "Log message appended to Azure Blob Storage successfully."
                };

                return new OkObjectResult(JsonConvert.SerializeObject(response));
            }
            catch (Exception ex)
            {
                var errorResponse = new
                {
                    Message = $"Error appending log message to Azure Blob Storage: {ex.Message}"
                };

                return new BadRequestObjectResult(JsonConvert.SerializeObject(errorResponse));
            }
        }
    }
}
