using Common;
using Common.Reflection;
using Serilog;
using Serilog.Core;
using Serilog.Events;
using Serilog.Formatting;
using Serilog.Formatting.Compact;
using Serilog.Formatting.Json;
using System;
using System.Globalization;
using System.IO;

namespace Logging
{
    public class SimpleFileLogger : LoggerBase
    {
        public SimpleFileLogger(Type loggerType) : this(loggerType.GetTypeFullName())
        {
        }

        public SimpleFileLogger(string loggerName) : base(loggerName)
        {
        }

        protected override Logger GetLoggerInstance(string loggerName)
        {
            Logger logger = new LoggerConfiguration().MinimumLevel.Is(LogEventLevel.Verbose).WriteTo.File(
                this.GetTextFormatter(),
                this.GetLogFilePath(loggerName),
                restrictedToMinimumLevel: LogEventLevel.Verbose,
                fileSizeLimitBytes: 1024 * 1024,
                levelSwitch: new LoggingLevelSwitch(LogEventLevel.Verbose),
                buffered: false,
                shared: false,
                flushToDiskInterval: TimeSpan.FromSeconds(2),
                rollingInterval: RollingInterval.Day,
                rollOnFileSizeLimit: true,
                retainedFileCountLimit: null,
                encoding: null,
                hooks: null).CreateLogger();

            return logger;
        }

        protected virtual ITextFormatter GetTextFormatter()
        {
            return this.GetJsonFormatter();
        }

        protected virtual ITextFormatter GetJsonFormatter()
        {
            ITextFormatter formatter = new JsonFormatter(
                closingDelimiter: $",{Environment.NewLine}",
                renderMessage: true,
                formatProvider: CultureInfo.InvariantCulture);
            return formatter;
        }

        protected virtual ITextFormatter GetCompactJsonFormatter()
        {
            ITextFormatter formatter = new CompactJsonFormatter();
            return formatter;
        }

        private string AssureLoggerDir(string loggerName)
        {
            string dirPath = AppEnvConfigContainer.Instance.GetEnvPath(AppEnvFolderType.Logs, loggerName);

            Directory.CreateDirectory(dirPath);
            return dirPath;
        }

        private string GetLoggerFileName(string loggerName)
        {
            string fileName = "log-.json";
            return fileName;
        }

        private string GetLogFilePath(string loggerName)
        {
            string retVal = Path.Combine(
                this.AssureLoggerDir(loggerName),
                this.GetLoggerFileName(loggerName));

            return retVal;
        }
    }
}
