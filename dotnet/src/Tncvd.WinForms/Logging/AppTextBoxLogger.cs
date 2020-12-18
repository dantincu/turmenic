using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Tncvd.WinForms.Logging
{
    public class AppTextBoxLogger : RichTextBoxLogger
    {
        public AppTextBoxLogger(RichTextBox textBox, string loggerName) : base(textBox, loggerName)
        {
        }

        public DialogResult ShowMessage(string message)
        {
            Information(message);
            return ShowInformationMessageBox(message);
        }

        public DialogResult ShowMessage(Exception ex, string message)
        {
            Information(ex, message);
            return ShowInformationMessageBox(message);
        }

        public DialogResult ShowErrorMessage(string message)
        {
            Error(message);
            return ShowErrorMessageBox(message);
        }

        public DialogResult ShowErrorMessage(Exception ex, string message)
        {
            Error(ex, message);
            return ShowErrorMessageBox(message);
        }

        public DialogResult ShowWarningMessage(string message, bool showCancelButton = false)
        {
            Warning(message);
            return ShowWarningMessageBox(message, showCancelButton);
        }

        public DialogResult ShowWarningMessage(Exception ex, string message, bool showCancelButton = false)
        {
            Warning(ex, message);
            return ShowWarningMessageBox(message, showCancelButton);
        }

        public DialogResult ShowSuccessMessage(string message)
        {
            Success(message);
            return ShowSuccessMessageBox(message);
        }

        public DialogResult ShowSuccessMessage(Exception ex, string message)
        {
            Success(ex, message);
            return ShowSuccessMessageBox(message);
        }

        public DialogResult ShowInformationMessageBox(string message)
        {
            return MessageBox.Show(message, "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }

        public DialogResult ShowErrorMessageBox(string message)
        {
            return MessageBox.Show(message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }

        public DialogResult ShowWarningMessageBox(string message, bool showCancelButton = false)
        {
            MessageBoxButtons messageBoxButtons = GetMessageBoxButtons(false, showCancelButton);
            return MessageBox.Show(message, "Warning", messageBoxButtons, MessageBoxIcon.Warning);
        }

        public DialogResult ShowSuccessMessageBox(string message)
        {
            return MessageBox.Show(message, "Success", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }

        public DialogResult ShowQuestionBox(string questionText, string caption, bool isYesNo, bool showCancelButton)
        {
            MessageBoxButtons messageBoxButtons = GetMessageBoxButtons(isYesNo, showCancelButton);
            return MessageBox.Show(questionText, caption, messageBoxButtons, MessageBoxIcon.Question);
        }

        private MessageBoxButtons GetMessageBoxButtons(bool isYesNo, bool showCancelButton)
        {
            MessageBoxButtons messageBoxButtons = MessageBoxButtons.OK;
            if (isYesNo)
            {
                if (showCancelButton)
                {
                    messageBoxButtons = MessageBoxButtons.YesNoCancel;
                }
                else
                {
                    messageBoxButtons = MessageBoxButtons.YesNo;
                }
            }
            else if (showCancelButton)
            {
                messageBoxButtons = MessageBoxButtons.OKCancel;
            }

            return messageBoxButtons;
        }
    }
}
