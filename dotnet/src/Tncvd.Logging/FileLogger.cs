using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Serilog;
using Serilog.Core;
using Serilog.Events;
using Serilog.Formatting;
using Serilog.Formatting.Compact;
using Serilog.Formatting.Json;
using Serilog.Sinks.File;
using Tncvd.AppConfig.Env;
using Tncvd.AppConfig.Execution;
using Tncvd.Logging.Serilog;

namespace Tncvd.Logging
{
    public class FileLogger : LoggerBase
    {
        public FileLogger(string loggerName) : base(loggerName)
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
                retainedFileCountLimit: 31,
                encoding: null,
                hooks: this.GetFileLifecycleHooks()).CreateLogger();

            return logger;
        }

        protected virtual FileLifecycleHooks GetFileLifecycleHooks()
        {
            FileLifecycleHooks hooks = new LoggerFileLifecycleHooks();
            return hooks;
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
            string dirPath = AppEnvConfigContainer.Instance.GetEnvLogsPath(loggerName);
            Directory.CreateDirectory(dirPath);

            return dirPath;
        }

        private string GetLoggerFileName(string loggerName)
        {
            // string fileName = $"log-{AppExecutionInfoContainer.Instance.Info.AppExecutionStartTimeTicks}-{AppExecutionInfoContainer.Instance.Info.AppExecutionId}-.txt";
            string fileName = $"log-{AppExecutionInfoContainer.Instance.Info.AppExecutionStartTimeTicks}-{AppExecutionInfoContainer.Instance.Info.AppExecutionId}-{{Date}}.json";
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
