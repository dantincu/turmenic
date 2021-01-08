using System;
using Tncvd.Core.AppConfig.ExecutionInfo;
using Tncvd.Core.Reflection;

namespace Tncvd.Logging.Logger
{
    public class BulkFileLogger : FileLoggerBase
    {
        public BulkFileLogger(Type loggerType) : this(loggerType.GetTypeFullName())
        {
        }

        public BulkFileLogger(string loggerName) : base(loggerName)
        {
        }

        protected override  long? FileSizeLimitBytes => base.FileSizeLimitBytes * 100;
        protected override bool IsLoggerBuffered => true;

        protected override string GetLoggerFileName(string loggerName)
        {
            string fileName = $"bulk-log-{DateTime.Now.Ticks}-{AppExecutionInfoContainer.Instance.Info.AppExecutionId}-.json";
            return fileName;
        }
    }
}
