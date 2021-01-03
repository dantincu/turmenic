using System;
using System.Windows.Forms;

namespace SimplePasswordTool
{
    public class PasswordTextboxWrapper
    {
        private bool _showPassword;

        public PasswordTextboxWrapper(TextBox textBox, Button button, bool initDefaultButtonAction = true) : this(
            textBox,
            new ShowHideButtonWrapper(
                new ShowHideButtonWrapperData(button)),
            initDefaultButtonAction)
        {
        }

        public PasswordTextboxWrapper(TextBox textBox, ShowHideButtonWrapper triggerButtonWrapper, bool initDefaultButtonAction = true)
        {
            this.TextBox = textBox ?? throw new ArgumentNullException(nameof(textBox));
            this.TriggerButtonWrapper = triggerButtonWrapper ?? throw new ArgumentNullException(nameof(triggerButtonWrapper));

            this._showPassword = !triggerButtonWrapper.TriggerShow;
            this.UpdateTextBox();

            if (initDefaultButtonAction)
            {
                this.InitDefaultButtonAction();
            }
        }

        public ShowHideButtonWrapper TriggerButtonWrapper { get; }
        public TextBox TextBox { get; }

        public void SetShowPassword(bool show)
        {
            this._showPassword = show;
            this.UpdateControl();
        }

        public bool ToggleShowPassword()
        {
            this._showPassword = !this._showPassword;
            this.UpdateControl();

            return this._showPassword;
        }

        private void UpdateControl()
        {
            this.UpdateTextBox();
            this.TriggerButtonWrapper.SetTriggerShow(!this._showPassword);
        }

        private void UpdateTextBox()
        {
            this.TextBox.UseSystemPasswordChar = !this._showPassword;
        }

        private void InitDefaultButtonAction()
        {
            this.TriggerButtonWrapper.Button.Click += this.button_Click;
        }

        private void button_Click(object sender, EventArgs e)
        {
            this.ToggleShowPassword();
        }
    }
}
