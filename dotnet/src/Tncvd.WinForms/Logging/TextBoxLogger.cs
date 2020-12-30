using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Windows.Forms;
using Tncvd.Reflection;
using Tncvd.WinForms.Styles.Colors;
using Tncvd.Collections;

namespace Tncvd.WinForms.Logging
{
    public class TextBoxLogger
    {
        protected const string MESSAGE_PARTS_DELIMITER = " >>>> ";
        protected const string EXCEPTION_MAIN_PART = "EXCEPTION";
        protected const string MESSAGE_PARTS_EMPHASIZER_START = "[";
        protected const string MESSAGE_PARTS_EMPHASIZER_END = "]";

        protected readonly Action<LogLevel, string, DateTime> LogInternalDelegate;
        protected readonly Action<LogLevel, Exception, string, DateTime> LogExceptionInternalDelegate;

        protected readonly object TextBoxSyncLock = new object();

        private readonly string _loggerName;
        private readonly ConcurrentQueue<LogMessage> _logMessageQueue = new ConcurrentQueue<LogMessage>();

        private TextBoxBase _textBox;

        public TextBoxLogger(TextBoxBase textBox, string loggerName)
        {
            this._textBox = textBox;
            this._loggerName = loggerName;

            this.LogInternalDelegate = new Action<LogLevel, string, DateTime>(this.LogInternal);
            this.LogExceptionInternalDelegate = new Action<LogLevel, Exception, string, DateTime>(this.LogExceptionInternal);
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

        public void AssignTextBox(TextBoxBase textBox)
        {
            lock (this.TextBoxSyncLock)
            {
                this.AssignTextBoxCore(textBox);
            }

            this.ConsumeLogMessageQueue();
        }

        public virtual void Clear()
        {
            this.TextBox.Clear();
        }

        #endregion Public

        #region Protected

        protected virtual void AssignTextBoxCore(TextBoxBase textBox)
        {
            if (this.IsTextBoxAvailable())
            {
                throw new InvalidOperationException("The logger's text box cannot be assigned twice!");
            }

            this._textBox = textBox ?? throw new ArgumentNullException(nameof(textBox));
        }

        protected virtual void LogInternalAsync(LogLevel logLevel, string message)
        {
            if (this.IsTextBoxAvailable())
            {
                this._textBox.Invoke(this.LogInternalDelegate, logLevel, message, DateTime.Now);
            }
            else
            {
                this.AddLogMessageToQueue(logLevel, null, message, DateTime.Now);
            }
        }

        protected virtual void LogInternalAsync(LogLevel logLevel, Exception ex, string message)
        {
            if (this.IsTextBoxAvailable())
            {
                this._textBox.Invoke(this.LogExceptionInternalDelegate, logLevel, ex, message, DateTime.Now);
            }
            else
            {
                this.AddLogMessageToQueue(logLevel, ex, message, DateTime.Now);
            }
        }

        protected virtual void AddLogMessageToQueue(LogLevel logLevel, Exception ex, string message, DateTime dateTime)
        {
            this._logMessageQueue.Enqueue(new LogMessage
            {
                LogLevel = logLevel,
                Ex = ex,
                Message = message,
                DateTime = dateTime
            });
        }

        protected void ConsumeLogMessageQueue()
        {
            this._logMessageQueue.CloneAndConsume(logMessage =>
            {
                if (logMessage.Ex != null)
                {
                    this._textBox.Invoke(this.LogExceptionInternalDelegate, logMessage.LogLevel, logMessage.Ex, logMessage.Message, logMessage.DateTime);
                }
                else
                {
                    this._textBox.Invoke(this.LogInternalDelegate, logMessage.LogLevel, logMessage.Message, logMessage.DateTime);
                }
            });
        }

        protected virtual void LogInternal(LogLevel logLevel, string message, DateTime dateTime)
        {
            string logMessage = this.GetLogMessage(logLevel, message, dateTime);
            this.AppendMessageToTextBox(logMessage);
        }

        protected virtual void LogExceptionInternal(LogLevel logLevel, Exception ex, string message, DateTime dateTime)
        {
            string logMessage = this.GetLogMessage(logLevel, ex, message, dateTime);
            this.AppendMessageToTextBox(logMessage);
        }

        protected virtual string GetLogLevelString(LogLevel logLevel)
        {
            return logLevel.ToString().ToUpper();
        }

        protected virtual string GetExceptionString(Exception ex)
        {
            string excString = $"[MESSAGE] {ex.Message}{Environment.NewLine} [TYPE] {ex.GetType().GetTypeFullName()}{Environment.NewLine} [STACKTRACE] {ex.StackTrace}";
            return excString;
        }

        protected virtual string GetDateTimeString(DateTime dateTime)
        {
            string retStr = dateTime.ToString("yyyy-MM-dd HH:mm:ss.fffffff zzz");
            return retStr;
        }

        protected bool IsTextBoxAvailable()
        {
            bool retVal = true;

            if (this._textBox == null)
            {
                lock (this.TextBoxSyncLock)
                {
                    if (this._textBox == null)
                    {
                        retVal = false;
                    }
                }
            }

            return retVal;
        }

        protected void AppendMessageToTextBox(string message)
        {
            this._textBox.AppendText(message);
        }

        protected string GetLogMessage(LogLevel logLevel, string message, DateTime dateTime)
        {
            string retVal = string.Empty;

            string timeStampString = this.GetDateTimeString(dateTime);
            string logLevelString = this.GetLogLevelString(logLevel);
            retVal = $" [{logLevelString}] {MESSAGE_PARTS_DELIMITER} [{timeStampString}] {MESSAGE_PARTS_DELIMITER} [{LoggerName}] {MESSAGE_PARTS_DELIMITER} {message}{Environment.NewLine}{Environment.NewLine}";

            return retVal;
        }

        protected string GetLogMessage(LogLevel logLevel, Exception ex, string message, DateTime dateTime)
        {
            string retVal = $"{message}{Environment.NewLine} [EXCEPTION] {MESSAGE_PARTS_DELIMITER} {GetExceptionString(ex)}";

            retVal = this.GetLogMessage(logLevel, message, dateTime);
            return retVal;
        }

        #endregion Protected

        protected class LogMessage
        {
            public LogLevel LogLevel { get; set; }
            public Exception Ex { get; set; }
            public string Message { get; set; }
            public DateTime DateTime { get; set; }
        }
    }
}
