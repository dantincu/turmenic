using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Tncvd.WinForms.UserControls.Utility
{
    public static class HelperMethods
    {
        #region WinForms Controls
        public static void AddBasicControlProperties(Control Control)
        {
            Control.BackColor = ConstantValues.AppColors.DefaultAppBackColor;
            Control.ForeColor = ConstantValues.AppColors.DefaultAppForeColor;
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

        #endregion WinForms Controls

        #region App Controls

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

        #region App Controls Custom Properties

        #endregion App Controls Custom Properties

        #endregion App Controls
    }
}
