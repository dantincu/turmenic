using Serilog.Core;
using Serilog.Events;
using Serilog.Sinks.File;
using System;
using Turmenic.Core.Reflection;

namespace Turmenic.Logging.Logger
{
    public class SharedFileLogger : FileLoggerBase
    {
        public SharedFileLogger(Type loggerType) : this(loggerType.GetTypeFullName())
        {
        }

        public SharedFileLogger(string loggerName) : base(loggerName)
        {
        }

        protected override bool IsLoggerShared => true;
        protected override LogEventLevel RestrictedToMinimumLevel => LogEventLevel.Debug;
        protected override LoggingLevelSwitch LoggingLevelSwitch => LoggerConfigurationHelper.Instance.SharedLoggingLevelSwitch;

        protected override FileLifecycleHooks FileLifecycleHooks => null;

        protected override string GetLoggerFileName(string loggerName)
        {
            string fileName = HelperMethods.GetLoggerFileName();
            return fileName;
        }
    }
}
