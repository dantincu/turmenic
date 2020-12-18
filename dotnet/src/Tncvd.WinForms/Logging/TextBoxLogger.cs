using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Tncvd.WinForms.Styles.Colors;

namespace Tncvd.WinForms.Logging
{
    public class TextBoxLogger
    {
        protected const string MESSAGE_PARTS_DELIMITER = " >>>> ";
        protected const string EXCEPTION_DELIMITER_STRING = "EXCEPTION";
        protected const string MESSAGE_PARTS_EMPHASIZER_START = "[";
        protected const string MESSAGE_PARTS_EMPHASIZER_END = "]";

        protected readonly Action<LogLevel, string> LogInternalDelegate;
        protected readonly Action<LogLevel, Exception, string> LogExceptionInternalDelegate;

        private readonly TextBoxBase _textBox;
        private readonly string _loggerName;

        public TextBoxLogger(TextBoxBase textBox, string loggerName)
        {
            _textBox = textBox;
            _loggerName = loggerName;

            LogInternalDelegate = new Action<LogLevel, string>(LogInternal);
            LogExceptionInternalDelegate = new Action<LogLevel, Exception, string>(LogExceptionInternal);
        }

        protected string LoggerName => _loggerName;
        protected TextBoxBase TextBox => _textBox;

        #region Public

        public void Debug(string message)
        {
            LogInternalAsync(LogLevel.Debug, message);
        }

        public void Information(string message)
        {
            LogInternalAsync(LogLevel.Information, message);
        }

        public void Success(string message)
        {
            LogInternalAsync(LogLevel.Success, message);
        }

        public void Warning(string message)
        {
            LogInternalAsync(LogLevel.Warning, message);
        }

        public void Error(string message)
        {
            LogInternalAsync(LogLevel.Error, message);
        }

        public void Debug(Exception ex, string message)
        {
            LogInternalAsync(LogLevel.Debug, ex, message);
        }

        public void Information(Exception ex, string message)
        {
            LogInternalAsync(LogLevel.Information, ex, message);
        }

        public void Success(Exception ex, string message)
        {
            LogInternalAsync(LogLevel.Success, ex, message);
        }

        public void Warning(Exception ex, string message)
        {
            LogInternalAsync(LogLevel.Warning, ex, message);
        }

        public void Error(Exception ex, string message)
        {
            LogInternalAsync(LogLevel.Error, ex, message);
        }

        public virtual void Clear()
        {
            TextBox.Clear();
        }

        #endregion Public

        #region Protected Virtual

        protected virtual void LogInternalAsync(LogLevel logLevel, string message)
        {

            _textBox.Invoke(LogInternalDelegate, logLevel, message);
        }

        protected virtual void LogInternalAsync(LogLevel logLevel, Exception ex, string message)
        {
            _textBox.Invoke(LogExceptionInternalDelegate, logLevel, ex, message);
        }

        protected virtual void LogInternal(LogLevel logLevel, string message)
        {
            string logMessage = GetLogMessage(logLevel, message);
            AppendMessageToTextBox(logMessage);
        }

        protected virtual void LogExceptionInternal(LogLevel logLevel, Exception ex, string message)
        {
            string logMessage = GetLogMessage(logLevel, ex, message);
            AppendMessageToTextBox(logMessage);
        }

        protected virtual string GetLogLevelString(LogLevel logLevel)
        {
            return logLevel.ToString().ToUpper();
        }

        protected virtual string GetExceptionString(Exception ex)
        {
            string excStackTraceString = ex.StackTrace;
            string excString = $"[MESSAGE] {ex.Message}{Environment.NewLine} [TYPE] {ex.GetType().FullName}{Environment.NewLine} [STACKTRACE] {ex.StackTrace}";

            return excString;
        }

        protected virtual string GetDateTimeString(DateTime dateTime)
        {
            string retStr = dateTime.ToString("yyyy-MM-dd HH:mm:ss.fffffff zzz");
            return retStr;
        }

        protected void AppendMessageToTextBox(string message)
        {
            _textBox.AppendText(message);
        }

        protected string GetLogMessage(LogLevel logLevel, string message)
        {
            string retVal = string.Empty;

            string timeStampString = GetDateTimeString(DateTime.Now);
            string logLevelString = GetLogLevelString(logLevel);
            retVal = $" [{logLevelString}] {MESSAGE_PARTS_DELIMITER} [{timeStampString}] {MESSAGE_PARTS_DELIMITER} [{LoggerName}] {MESSAGE_PARTS_DELIMITER} {message}{Environment.NewLine}{Environment.NewLine}";

            return retVal;
        }

        protected string GetLogMessage(LogLevel logLevel, Exception ex, string message)
        {
            string retVal = $"{message}{Environment.NewLine} [EXCEPTION] {MESSAGE_PARTS_DELIMITER} {GetExceptionString(ex)}";

            retVal = GetLogMessage(logLevel, message);
            return retVal;
        }

        #endregion Protected
    }
}
