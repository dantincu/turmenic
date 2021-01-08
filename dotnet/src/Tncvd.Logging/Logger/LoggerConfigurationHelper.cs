using Serilog.Core;
using Serilog.Events;
using Serilog.Formatting;
using Serilog.Formatting.Compact;
using Serilog.Formatting.Json;
using System;
using System.Globalization;

namespace Tncvd.Logging.Logger
{
    public class LoggerConfigurationHelper
    {
        public static readonly LoggerConfigurationHelper Instance = new LoggerConfigurationHelper();

        public LoggerConfigurationHelper()
        {
            this.TextFormatter = this.GetTextFormatter();
            this.LoggingLevelSwitch = new LoggingLevelSwitch(LogEventLevel.Verbose);
            this.FlushedToDiskInterval = TimeSpan.FromSeconds(2);
        }

        public ITextFormatter TextFormatter { get; }

        public LoggingLevelSwitch LoggingLevelSwitch { get; }

        public TimeSpan FlushedToDiskInterval { get; }

        protected virtual ITextFormatter GetTextFormatter()
        {
            return GetJsonFormatter();
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
    }
}
