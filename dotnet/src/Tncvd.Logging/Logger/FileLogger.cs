using System;
using Tncvd.Core.AppConfig.ExecutionInfo;
using Tncvd.Core.Reflection;

namespace Tncvd.Logging.Logger
{
    public class FileLogger : FileLoggerBase
    {
        public FileLogger(Type loggerType) : this(loggerType.GetTypeFullName())
        {
        }

        public FileLogger(string loggerName) : base(loggerName)
        {
        }

        protected override string GetLoggerFileName(string loggerName)
        {
            string fileName = $"log-{AppExecutionInfoContainer.Instance.Info.AppExecutionStartTimeTicks}-{AppExecutionInfoContainer.Instance.Info.AppExecutionId}-.json";
            return fileName;
        }
    }
}
