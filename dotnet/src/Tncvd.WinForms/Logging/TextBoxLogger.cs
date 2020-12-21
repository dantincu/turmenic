using System;
using System.Windows.Forms;
using Tncvd.Reflection;
using Tncvd.WinForms.Styles.Colors;

namespace Tncvd.WinForms.Logging
{
    public class TextBoxLogger
    {
        protected const string MESSAGE_PARTS_DELIMITER = " >>>> ";
        protected const string EXCEPTION_MAIN_PART = "EXCEPTION";
        protected const string MESSAGE_PARTS_EMPHASIZER_START = "[";
        protected const string MESSAGE_PARTS_EMPHASIZER_END = "]";

        protected readonly Action<LogLevel, string> LogInternalDelegate;
        protected readonly Action<LogLevel, Exception, string> LogExceptionInternalDelegate;

        private readonly TextBoxBase _textBox;
        private readonly string _loggerName;

        public TextBoxLogger(TextBoxBase textBox, string loggerName)
        {
            this._textBox = textBox;
            this._loggerName = loggerName;

            this.LogInternalDelegate = new Action<LogLevel, string>(this.LogInternal);
            this.LogExceptionInternalDelegate = new Action<LogLevel, Exception, string>(this.LogExceptionInternal);
        }

        protected string LoggerName => this._loggerName;
        protected TextBoxBase TextBox => this._textBox;

        #region Public

        public void Debug(string message)
        {
            this.LogInternalAsync(LogLevel.Debug, message);
        }

        public void Information(string message)
        {
            this.LogInternalAsync(LogLevel.Information, message);
        }

        public void Success(string message)
        {
            this.LogInternalAsync(LogLevel.Success, message);
        }

        public void Warning(string message)
        {
            this.LogInternalAsync(LogLevel.Warning, message);
        }

        public void Error(string message)
        {
            this.LogInternalAsync(LogLevel.Error, message);
        }

        public void Debug(Exception ex, string message)
        {
            this.LogInternalAsync(LogLevel.Debug, ex, message);
        }

        public void Information(Exception ex, string message)
        {
            this.LogInternalAsync(LogLevel.Information, ex, message);
        }

        public void Success(Exception ex, string message)
        {
            this.LogInternalAsync(LogLevel.Success, ex, message);
        }

        public void Warning(Exception ex, string message)
        {
            this.LogInternalAsync(LogLevel.Warning, ex, message);
        }

        public void Error(Exception ex, string message)
        {
            this.LogInternalAsync(LogLevel.Error, ex, message);
        }

        public virtual void Clear()
        {
            this.TextBox.Clear();
        }

        #endregion Public

        #region Protected Virtual

        protected virtual void LogInternalAsync(LogLevel logLevel, string message)
        {

            this._textBox.Invoke(this.LogInternalDelegate, logLevel, message);
        }

        protected virtual void LogInternalAsync(LogLevel logLevel, Exception ex, string message)
        {
            this._textBox.Invoke(this.LogExceptionInternalDelegate, logLevel, ex, message);
        }

        protected virtual void LogInternal(LogLevel logLevel, string message)
        {
            string logMessage = this.GetLogMessage(logLevel, message);
            this.AppendMessageToTextBox(logMessage);
        }

        protected virtual void LogExceptionInternal(LogLevel logLevel, Exception ex, string message)
        {
            string logMessage = this.GetLogMessage(logLevel, ex, message);
            this.AppendMessageToTextBox(logMessage);
        }

        protected virtual string GetLogLevelString(LogLevel logLevel)
        {
            return logLevel.ToString().ToUpper();
        }

        protected virtual string GetExceptionString(Exception ex)
        {
            string excStackTraceString = ex.StackTrace;
            string excString = $"[MESSAGE] {ex.Message}{Environment.NewLine} [TYPE] {ex.GetType().GetFullTypeName()}{Environment.NewLine} [STACKTRACE] {ex.StackTrace}";

            return excString;
        }

        protected virtual string GetDateTimeString(DateTime dateTime)
        {
            string retStr = dateTime.ToString("yyyy-MM-dd HH:mm:ss.fffffff zzz");
            return retStr;
        }

        protected void AppendMessageToTextBox(string message)
        {
            this._textBox.AppendText(message);
        }

        protected string GetLogMessage(LogLevel logLevel, string message)
        {
            string retVal = string.Empty;

            string timeStampString = this.GetDateTimeString(DateTime.Now);
            string logLevelString = this.GetLogLevelString(logLevel);
            retVal = $" [{logLevelString}] {MESSAGE_PARTS_DELIMITER} [{timeStampString}] {MESSAGE_PARTS_DELIMITER} [{LoggerName}] {MESSAGE_PARTS_DELIMITER} {message}{Environment.NewLine}{Environment.NewLine}";

            return retVal;
        }

        protected string GetLogMessage(LogLevel logLevel, Exception ex, string message)
        {
            string retVal = $"{message}{Environment.NewLine} [EXCEPTION] {MESSAGE_PARTS_DELIMITER} {GetExceptionString(ex)}";

            retVal = this.GetLogMessage(logLevel, message);
            return retVal;
        }

        #endregion Protected
    }
}
