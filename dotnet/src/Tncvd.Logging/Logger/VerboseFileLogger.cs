using System;
using Tncvd.Core.Reflection;

namespace Tncvd.Logging.Logger
{
    public class VerboseFileLogger : FileLoggerBase
    {
        public VerboseFileLogger(Type loggerType) : this(loggerType.GetTypeFullName())
        {
        }

        public VerboseFileLogger(string loggerName) : base(loggerName)
        {
        }

        public DateTime DateCreated { get; private set; }

        protected override  long? FileSizeLimitBytes => base.FileSizeLimitBytes * 100;
        protected override bool IsLoggerBuffered => true;

        protected override Serilog.Core.Logger GetLoggerInstance(string loggerName)
        {
            this.DateCreated = DateTime.Now;

            Serilog.Core.Logger instance = base.GetLoggerInstance(loggerName);
            return instance;
        }

        protected override string GetLoggerFileName(string loggerName)
        {
            string fileName = HelperMethods.GetBulkLoggerFileName(this.DateCreated);
            return fileName;
        }
    }
}
