using System;
using System.Drawing;
using System.Windows.Forms;
using Tncvd.Reflection;
using Tncvd.WinForms.Styles.Colors;

namespace Tncvd.WinForms.Logging
{
    public class RichTextBoxLogger : TextBoxLogger
    {
        public const string EXCEPTION_MESSAGE_DELIMITER = "[EXCEPTION-MESSAGE]";
        public const string EXCEPTION_TYPE_DELIMITER = "[EXCEPTION-TYPE]";
        public const string EXCEPTION_STACKTRACE_DELIMITER = "[EXCEPTION-STACKTRACE]";

        private readonly RichTextBox _richTextBox;
        public RichTextBoxLogger(RichTextBox textBox, string loggerName) : base(textBox, loggerName)
        {
            this._richTextBox = textBox;
        }

        protected RichTextBox RichTextBox => this._richTextBox;

        protected override void LogExceptionInternal(LogLevel logLevel, Exception ex, string message)
        {
            Color logMessageColor = this.GetLogMessageColor(logLevel);
            this.LogInternalCore(logLevel, message, logMessageColor);
            this.AppendException(this._richTextBox, logLevel, logMessageColor, ex);
            this.AppendLogMessageEnding(this._richTextBox, logLevel, logMessageColor);
        }

        protected override void LogInternal(LogLevel logLevel, string message)
        {
            Color logMessageColor = this.GetLogMessageColor(logLevel);
            this.LogInternalCore(logLevel, message, logMessageColor);
            this.AppendLogMessageEnding(this._richTextBox, logLevel, logMessageColor);
        }

        protected virtual void LogInternalCore(LogLevel logLevel, string message, Color logMessageColor)
        {
            this.AppendLogLevel(this._richTextBox, logLevel, logMessageColor);
            this.AppendTimeStamp(this._richTextBox, DateTime.Now, logMessageColor);
            this.AppendLoggerName(this._richTextBox, logLevel, logMessageColor);
            this.AppendMessageText(this._richTextBox, logLevel, logMessageColor, message);
        }

        protected void AppendMessageText(RichTextBox textBox, LogLevel logLevel, Color logMessageColor, string message)
        {
            this.AppendText(this._richTextBox, logMessageColor, FontStyle.Regular, $" {message}{Environment.NewLine}");
        }

        protected void AppendLogMessageEnding(RichTextBox textBox, LogLevel logLevel, Color logMessageColor)
        {
            textBox.AppendText(Environment.NewLine);
        }

        protected void AppendText(RichTextBox textBox, Color color, FontStyle fontStyle, string text)
        {
            int initialTextLength = textBox.TextLength;

            textBox.AppendText(text);
            int textLength = textBox.TextLength;

            textBox.Select(initialTextLength, textLength);
            textBox.SelectionColor = color;

            this.SetSelectionFontStyle(textBox, fontStyle);
        }

        protected Color GetLogMessageColor(LogLevel logLevel)
        {
            Color retVal = Styles.Colors.ConstantValues.TextColors.DefaultTextColor;

            switch (logLevel)
            {
                case LogLevel.Debug:
                    retVal = Styles.Colors.ConstantValues.TextColors.DefaultTextColor;
                    break;
                case LogLevel.Information:
                    retVal = Styles.Colors.ConstantValues.TextColors.InformationTextColor;
                    break;
                case LogLevel.Success:
                    retVal = Styles.Colors.ConstantValues.TextColors.SuccessColor;
                    break;
                case LogLevel.Warning:
                    retVal = Styles.Colors.ConstantValues.TextColors.WarningTextColor;
                    break;
                case LogLevel.Error:
                    retVal = Styles.Colors.ConstantValues.TextColors.ErrorTextColor;
                    break;
                default:
                    throw new NotSupportedException("The provided log level is not currently supported.");
            }

            return retVal;
        }

        protected void SetSelectionFontStyle(RichTextBox textBox, FontStyle fontStyle)
        {
            Font currentFont = textBox.SelectionFont;
            Font font = new Font(currentFont, fontStyle);

            textBox.SelectionFont = font;
        }

        protected void AppendLogLevel(RichTextBox textBox, LogLevel logLevel, Color color)
        {
            string logLevelString = $" [{GetLogLevelString(logLevel)}] ";
            this.AppendText(textBox, color, FontStyle.Bold | FontStyle.Italic, logLevelString);
        }
        protected void AppendMessagePartsDelimiter(RichTextBox textBox, Color color)
        {
            this.AppendText(textBox, color, FontStyle.Bold | FontStyle.Underline, TextBoxLogger.MESSAGE_PARTS_DELIMITER);
        }

        protected void AppendTimeStamp(RichTextBox textBox, DateTime timeStamp, Color color)
        {
            string timeStampString = this.GetDateTimeString(DateTime.Now);
            string message = $" [{timeStampString}] ";

            this.AppendMessagePartsDelimiter(textBox, color);
            this.AppendText(textBox, color, FontStyle.Regular, message);
            this.AppendMessagePartsDelimiter(textBox, color);
        }

        protected void AppendLoggerName(RichTextBox textBox, LogLevel logLevel, Color color)
        {
            this.AppendText(textBox, color, FontStyle.Regular, $" [{LoggerName}] ");
            this.AppendMessagePartsDelimiter(textBox, color);
        }

        protected void AppendException(RichTextBox textBox, LogLevel logLevel, Color color, Exception ex)
        {
            this.AppendExceptionPart(textBox, logLevel, color, EXCEPTION_MESSAGE_DELIMITER, ex.Message);
            this.AppendExceptionPart(textBox, logLevel, color, EXCEPTION_TYPE_DELIMITER, ex.GetType().GetTypeFullName());
            this.AppendExceptionPart(textBox, logLevel, color, EXCEPTION_STACKTRACE_DELIMITER, ex.StackTrace);
        }

        protected void AppendExceptionPart(RichTextBox textBox, LogLevel logLevel, Color color, string exceptionPartNameString, string exceptionPartString)
        {
            this.AppendText(textBox, color, FontStyle.Bold | FontStyle.Italic, $" {exceptionPartNameString} ");
            this.AppendMessagePartsDelimiter(textBox, color);

            this.AppendMessageText(this._richTextBox, logLevel, color, exceptionPartString);
        }
    }
}
