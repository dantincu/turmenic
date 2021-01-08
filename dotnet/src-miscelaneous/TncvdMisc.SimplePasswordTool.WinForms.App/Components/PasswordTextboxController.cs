using System;
using System.Windows.Forms;

namespace SimplePasswordTool.Components
{
    public class PasswordTextboxController
    {
        private bool showPassword;

        public PasswordTextboxController(TextBox textBox, Button button, bool initDefaultButtonAction = true) : this(
            textBox,
            new ShowHideButtonController(
                new ShowHideButtonWrapperData(button)),
            initDefaultButtonAction)
        {
        }

        public PasswordTextboxController(TextBox textBox, ShowHideButtonController triggerButtonWrapper, bool initDefaultButtonAction = true)
        {
            TextBox = textBox ?? throw new ArgumentNullException(nameof(textBox));
            TriggerButtonWrapper = triggerButtonWrapper ?? throw new ArgumentNullException(nameof(triggerButtonWrapper));

            showPassword = !triggerButtonWrapper.TriggerShow;
            UpdateTextBox();

            if (initDefaultButtonAction)
            {
                InitDefaultButtonAction();
            }
        }

        public ShowHideButtonController TriggerButtonWrapper { get; }
        public TextBox TextBox { get; }

        public void SetShowPassword(bool show)
        {
            showPassword = show;
            UpdateControl();
        }

        public bool ToggleShowPassword()
        {
            showPassword = !showPassword;
            UpdateControl();

            return showPassword;
        }

        private void UpdateControl()
        {
            UpdateTextBox();
            TriggerButtonWrapper.SetTriggerShow(!showPassword);
        }

        private void UpdateTextBox()
        {
            TextBox.UseSystemPasswordChar = !showPassword;
        }

        private void InitDefaultButtonAction()
        {
            TriggerButtonWrapper.Button.Click += button_Click;
        }

        private void button_Click(object sender, EventArgs e)
        {
            ToggleShowPassword();
        }
    }
}
