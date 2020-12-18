using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Tncvd.WinForms.Styles.Colors;

namespace Tncvd.WinForms.Logging
{
    public class RichTextBoxLogger : TextBoxLogger
    {
        private readonly RichTextBox _richTextBox;
        public RichTextBoxLogger(RichTextBox textBox, string loggerName) : base(textBox, loggerName)
        {
            _richTextBox = textBox;
        }

        protected RichTextBox RichTextBox => _richTextBox;

        protected override void LogExceptionInternal(LogLevel logLevel, Exception ex, string message)
        {
            Color logMessageColor = GetLogMessageColor(logLevel);
            LogInternalCore(logLevel, message, logMessageColor);
            AppendException(_richTextBox, logLevel, logMessageColor, ex);
            AppendLogMessageEnding(_richTextBox, logLevel, logMessageColor);
        }

        protected override void LogInternal(LogLevel logLevel, string message)
        {
            Color logMessageColor = GetLogMessageColor(logLevel);
            LogInternalCore(logLevel, message, logMessageColor);
            AppendLogMessageEnding(_richTextBox, logLevel, logMessageColor);
        }

        protected virtual void LogInternalCore(LogLevel logLevel, string message, Color logMessageColor)
        {
            AppendLogLevel(_richTextBox, logLevel, logMessageColor);
            AppendTimeStamp(_richTextBox, DateTime.Now, logMessageColor);
            AppendLoggerName(_richTextBox, logLevel, logMessageColor);
            AppendMessageText(_richTextBox, logLevel, logMessageColor, message);
        }

        protected void AppendMessageText(RichTextBox textBox, LogLevel logLevel, Color logMessageColor, string message)
        {
            AppendText(_richTextBox, logMessageColor, FontStyle.Regular, $" {message}{Environment.NewLine}");
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

            SetSelectionFontStyle(textBox, fontStyle);
        }

        protected Color GetLogMessageColor(LogLevel logLevel)
        {
            Color retVal = ConstantValues.TextColors.DefaultTextColor;

            switch (logLevel)
            {
                case LogLevel.Debug:
                    retVal = ConstantValues.TextColors.DefaultTextColor;
                    break;
                case LogLevel.Information:
                    retVal = ConstantValues.TextColors.InformationTextColor;
                    break;
                case LogLevel.Success:
                    retVal = ConstantValues.TextColors.SuccessColor;
                    break;
                case LogLevel.Warning:
                    retVal = ConstantValues.TextColors.WarningTextColor;
                    break;
                case LogLevel.Error:
                    retVal = ConstantValues.TextColors.ErrorTextColor;
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
            AppendText(textBox, color, FontStyle.Bold | FontStyle.Italic, logLevelString);
        }

        protected void AppendMessagePartsDelimiter(RichTextBox textBox, Color color)
        {
            AppendText(textBox, color, FontStyle.Bold | FontStyle.Underline, MESSAGE_PARTS_DELIMITER);
        }

        protected void AppendTimeStamp(RichTextBox textBox, DateTime timeStamp, Color color)
        {
            string timeStampString = GetDateTimeString(DateTime.Now);
            string message = $" [{timeStampString}] ";

            AppendMessagePartsDelimiter(textBox, color);
            AppendText(textBox, color, FontStyle.Regular, message);
            AppendMessagePartsDelimiter(textBox, color);
        }

        protected void AppendLoggerName(RichTextBox textBox, LogLevel logLevel, Color color)
        {
            AppendText(textBox, color, FontStyle.Regular, $" [{LoggerName}] ");
            AppendMessagePartsDelimiter(textBox, color);
        }

        protected void AppendException(RichTextBox textBox, LogLevel logLevel, Color color, Exception ex)
        {
            AppendExceptionPart(textBox, logLevel, color, "[EXCEPTION-MESSAGE]", ex.Message);
            AppendExceptionPart(textBox, logLevel, color, "[EXCEPTION-TYPE]", ex.GetType().FullName);
            AppendExceptionPart(textBox, logLevel, color, "[EXCEPTION-STACKTRACE]", ex.StackTrace);
        }

        protected void AppendExceptionPart(RichTextBox textBox, LogLevel logLevel, Color color, string exceptionPartNameString, string exceptionPartString)
        {
            AppendText(textBox, color, FontStyle.Bold | FontStyle.Italic, $" {exceptionPartNameString} ");
            AppendMessagePartsDelimiter(textBox, color);

            AppendMessageText(_richTextBox, logLevel, color, exceptionPartString);
        }
    }
}
