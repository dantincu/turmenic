using System.Windows.Forms;

namespace Tncvd.WinForms.Utility
{
    public static partial class HelperMethods
    {
        public static void AddBasicControlProperties(Control control)
        {
            control.BackColor = ConstantValues.AppColors.DefaultAppBackColor;
            control.ForeColor = ConstantValues.AppColors.DefaultAppForeColor;
        }

        public static void AddBasicUserControlProperties(UserControl userControl)
        {
            AddBasicControlProperties(userControl);
        }

        public static void AddBasicTextBoxProperties(TextBoxBase textBox)
        {
            AddBasicControlProperties(textBox);
            textBox.BackColor = ConstantValues.AppColors.DefaultAppTextBoxBackColor;
        }

        public static void AddTextAreaProperties(TextBox textBox)
        {
            AddBasicTextBoxProperties(textBox);
            textBox.Multiline = true;
        }

        public static void AddRichTextBoxProperties(RichTextBox richTextBox)
        {
            AddBasicTextBoxProperties(richTextBox);
        }

        public static void AddButtonProperties(Button button)
        {
            AddBasicControlProperties(button);
            button.BackColor = ConstantValues.AppColors.DefaultAppButtonBackColor;
        }
    }
}
