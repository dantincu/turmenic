using Tncvd.WinForms.Controls;

namespace Tncvd.WinForms.Utility
{
    public static partial class HelperMethods
    {
        public static void AddAppUserControlProperties(AppUserControl appUserControl)
        {
            AddBasicUserControlProperties(appUserControl);
        }

        public static void AddAppTextBoxProperties(AppTextBox appTextBox)
        {
            AddBasicTextBoxProperties(appTextBox);
        }

        public static void AddAppTextAreaProperties(AppTextBox appTextArea)
        {
            AddTextAreaProperties(appTextArea);
        }

        public static void AddAppRichTextBoxProperties(AppRichTextBox appRichTextBox)
        {
            AddRichTextBoxProperties(appRichTextBox);
        }

        public static void AddAppButtonProperties(AppButton appButton)
        {
            AddButtonProperties(appButton);
        }

        public static void AddAppLabelProperties(AppLabel appLabel)
        {
            AddLabelProperties(appLabel);
        }

        public static void AddAppCheckBoxProperties(AppCheckBox appCheckBox)
        {
            AddCheckBoxProperties(appCheckBox);
        }

        public static void AddAppRadioButtonProperties(AppRadioButton appRadioButton)
        {
            AddRadioButtonProperties(appRadioButton);
        }

        public static void AddAppGroupBoxProperties(AppGroupBox appGroupBox)
        {
            AddGroupBoxProperties(appGroupBox);
        }

        public static void AddAppSplitContainerProperties(AppSplitContainer appSplitContainer)
        {
            AddSplitContainerProperties(appSplitContainer);
        }

        public static void AddAppTabControlProperties(AppTabControl appTabControl)
        {
            AddTabControlProperties(appTabControl);
        }

        public static void AddAppTabPageProperties(AppTabPage tabPage)
        {
            AddTabPageProperties(tabPage);
        }
    }
}
