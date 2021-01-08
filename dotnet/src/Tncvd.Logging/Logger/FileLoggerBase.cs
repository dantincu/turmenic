using Serilog;
using Serilog.Core;
using Serilog.Events;
using Serilog.Formatting;
using Serilog.Formatting.Compact;
using Serilog.Formatting.Json;
using Serilog.Sinks.File;
using System;
using System.Globalization;
using System.IO;
using System.Text;
using Tncvd.Core.AppConfig;
using Tncvd.Core.Reflection;
using Tncvd.Logging.LifecycleHooks;

namespace Tncvd.Logging.Logger
{
    public abstract class FileLoggerBase : LoggerBase
    {
        public FileLoggerBase(Type loggerType) : this(loggerType.GetTypeFullName())
        {
        }

        public FileLoggerBase(string loggerName) : base(loggerName)
        {
        }

        protected virtual long? FileSizeLimitBytes => 1024 * 1024;
        protected virtual bool IsLoggerBuffered => false;
        protected virtual bool IsLoggerShared => false;
        protected virtual bool RollOnFileSizeLimit => true;
        protected virtual int? RetainedFileCountLimit => 31;
        protected virtual LogEventLevel RestrictedToMinimumLevel => LogEventLevel.Verbose;
        protected virtual RollingInterval RollingInterval => RollingInterval.Day;
        protected virtual Encoding Encoding => null;
        protected virtual TimeSpan FlushedToDiskInterval => LoggerConfigurationHelper.Instance.FlushedToDiskInterval;
        protected virtual LoggingLevelSwitch LoggingLevelSwitch => LoggerConfigurationHelper.Instance.LoggingLevelSwitch;
        protected virtual ITextFormatter TextFormatter => LoggerConfigurationHelper.Instance.TextFormatter;

        protected virtual FileLifecycleHooks FileLifecycleHooks => this.GetFileLifecycleHooks();

        protected override Serilog.Core.Logger GetLoggerInstance(string loggerName)
        {
            Serilog.Core.Logger logger = new LoggerConfiguration().MinimumLevel.Is(LogEventLevel.Verbose).WriteTo.File(
                this.TextFormatter,
                this.GetLogFilePath(loggerName),
                restrictedToMinimumLevel: this.RestrictedToMinimumLevel,
                fileSizeLimitBytes: this.FileSizeLimitBytes,
                levelSwitch: this.LoggingLevelSwitch,
                buffered: this.IsLoggerBuffered,
                shared: this.IsLoggerShared,
                flushToDiskInterval: this.FlushedToDiskInterval,
                rollingInterval: this.RollingInterval,
                rollOnFileSizeLimit: this.RollOnFileSizeLimit,
                retainedFileCountLimit: this.RetainedFileCountLimit,
                encoding: this.Encoding,
                hooks: this.FileLifecycleHooks).CreateLogger();

            return logger;
        }

        protected virtual FileLifecycleHooks GetFileLifecycleHooks()
        {
            FileLifecycleHooks hooks = new LoggerFileLifecycleHooks();
            return hooks;
        }

        

        private string AssureLoggerDir(string loggerName)
        {
            string dirPath = EnvConfigContainer.Instance.GetEnvRelPath(EnvDir.Logs, loggerName);
            Directory.CreateDirectory(dirPath);

            return dirPath;
        }

        protected abstract string GetLoggerFileName(string loggerName);

        protected string GetLogFilePath(string loggerName)
        {
            string retVal = Path.Combine(
                AssureLoggerDir(loggerName),
                GetLoggerFileName(loggerName));

            return retVal;
        }
    }
}
