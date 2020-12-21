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
            this.Information(message);
            return this.ShowInformationMessageBox(message);
        }

        public DialogResult ShowMessage(Exception ex, string message)
        {
            this.Information(ex, message);
            return this.ShowInformationMessageBox(message);
        }

        public DialogResult ShowErrorMessage(string message)
        {
            this.Error(message);
            return this.ShowErrorMessageBox(message);
        }

        public DialogResult ShowErrorMessage(Exception ex, string message)
        {
            this.Error(ex, message);
            return this.ShowErrorMessageBox(message);
        }

        public DialogResult ShowWarningMessage(string message, bool showCancelButton = false)
        {
            this.Warning(message);
            return this.ShowWarningMessageBox(message, showCancelButton);
        }

        public DialogResult ShowWarningMessage(Exception ex, string message, bool showCancelButton = false)
        {
            this.Warning(ex, message);
            return this.ShowWarningMessageBox(message, showCancelButton);
        }

        public DialogResult ShowSuccessMessage(string message)
        {
            this.Success(message);
            return this.ShowSuccessMessageBox(message);
        }

        public DialogResult ShowSuccessMessage(Exception ex, string message)
        {
            this.Success(ex, message);
            return this.ShowSuccessMessageBox(message);
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
            MessageBoxButtons messageBoxButtons = this.GetMessageBoxButtons(false, showCancelButton);
            return MessageBox.Show(message, "Warning", messageBoxButtons, MessageBoxIcon.Warning);
        }

        public DialogResult ShowSuccessMessageBox(string message)
        {
            return MessageBox.Show(message, "Success", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }

        public DialogResult ShowQuestionBox(string questionText, string caption, bool isYesNo, bool showCancelButton)
        {
            MessageBoxButtons messageBoxButtons = this.GetMessageBoxButtons(isYesNo, showCancelButton);
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
