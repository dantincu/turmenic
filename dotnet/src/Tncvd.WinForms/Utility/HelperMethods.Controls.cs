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
            richTextBox.Font = ConstantValues.Fonts.DefaultMonospaceFont;
        }

        public static void AddButtonProperties(Button button)
        {
            AddBasicControlProperties(button);
            button.BackColor = ConstantValues.AppColors.DefaultAppButtonBackColor;
        }

        public static void AddLabelProperties(Label label)
        {
            AddBasicControlProperties(label);
        }

        public static void AddCheckBoxProperties(CheckBox checkBox)
        {
            AddBasicControlProperties(checkBox);
        }

        public static void AddRadioButtonProperties(RadioButton radioButton)
        {
            AddBasicControlProperties(radioButton);
        }

        public static void AddGroupBoxProperties(GroupBox groupBox)
        {
            AddBasicControlProperties(groupBox);
        }

        public static void AddSplitContainerProperties(SplitContainer splitContainer)
        {
            AddBasicControlProperties(splitContainer);
            splitContainer.Dock = DockStyle.Fill;
        }

        public static void AddTabControlProperties(TabControl tabControl)
        {
            AddBasicControlProperties(tabControl);
            tabControl.Dock = DockStyle.Fill;
        }

        public static void AddTabPageProperties(TabPage tabPage)
        {
            AddBasicControlProperties(tabPage);
        }

        public static void AddMenuStripProperties(MenuStrip menuStrip)
        {
            AddBasicControlProperties(menuStrip);
        }

        public static void AddStatusStripProperties(StatusStrip statusStrip)
        {
            AddBasicControlProperties(statusStrip);
        }

        public static void AddPanelProperties(Panel panel)
        {
            AddBasicControlProperties(panel);
            panel.Dock = DockStyle.Fill;
        }
    }
}
