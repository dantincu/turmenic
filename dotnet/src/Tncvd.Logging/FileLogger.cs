using Serilog;
using Serilog.Core;
using Serilog.Events;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tncvd.AppConfig.Env;
using Tncvd.AppConfig.Execution;

namespace Tncvd.Logging
{
    public class FileLogger : LoggerBase
    {
        public FileLogger(string loggerName) : base(loggerName)
        {
        }

        protected override Logger GetLoggerInstance(string loggerName)
        {
            Logger logger = new LoggerConfiguration().MinimumLevel.Is(
                LogEventLevel.Verbose).WriteTo.File(
                this.GetLogFilePath(loggerName),
                restrictedToMinimumLevel: LogEventLevel.Verbose,
                outputTemplate: "[{Timestamp:yyyy-MM-dd HH:mm:ss.fffffff zzz}] [{Level}] [{Message:lj}]{NewLine}{Exception}",
                formatProvider: null,
                fileSizeLimitBytes: 1024 * 1024 * 1024,
                levelSwitch: new LoggingLevelSwitch(LogEventLevel.Verbose),
                buffered: true,
                shared: false,
                flushToDiskInterval: TimeSpan.FromSeconds(2),
                rollingInterval: RollingInterval.Day,
                rollOnFileSizeLimit: true,
                retainedFileCountLimit: null,
                encoding: null,
                hooks: null)
                .CreateLogger();

            return logger;
        }

        private string AssureLoggerDir(string loggerName)
        {
            string dirPath = AppEnvConfigContainer.Instance.GetEnvLogsPath(loggerName);
            Directory.CreateDirectory(dirPath);

            return dirPath;
        }

        private string GetLoggerFileName(string loggerName)
        {
            string fileName = $"log-{AppExecutionInfoContainer.Instance.Info.AppExecutionStartTimeTicks}-{AppExecutionInfoContainer.Instance.Info.AppExecutionId}-.txt";
            return fileName;
        }

        private string GetLogFilePath(string loggerName)
        {
            string retVal = Path.Combine(
                this.AssureLoggerDir(loggerName),
                this.GetLoggerFileName(loggerName)
            );

            return retVal;
        }
    }
}
