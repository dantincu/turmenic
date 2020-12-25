using Tncvd.WinForms.Controls;

namespace Tncvd.WinForms.Utility
{
    public static partial class HelperMethods
    {
        public static void AddAppUserControlProperties(AppUserControlBase userControl)
        {
            AddBasicUserControlProperties(userControl);
        }

        public static void AddAppTextBoxProperties(AppTextBox textBox)
        {
            AddBasicTextBoxProperties(textBox);
        }

        public static void AddAppTextAreaProperties(AppTextBox textBox)
        {
            AddTextAreaProperties(textBox);
        }

        public static void AddAppRichTextBoxProperties(AppRichTextBox richTextBox)
        {
            AddRichTextBoxProperties(richTextBox);
        }

        public static void AddAppButtonProperties(AppButton button)
        {
            AddButtonProperties(button);
        }

        public static void AddAppLabelProperties(AppLabel label)
        {
            AddBasicControlProperties(label);
        }

        public static void AddAppCheckBoxProperties(AppCheckBox checkBox)
        {
            AddBasicControlProperties(checkBox);
        }

        public static void AddAppRadioButtonProperties(AppRadioButton radioButton)
        {
            AddBasicControlProperties(radioButton);
        }

        public static void AddAppGroupBoxProperties(AppGroupBox groupBox)
        {
            AddBasicControlProperties(groupBox);
        }
    }
}
