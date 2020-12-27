using System.Windows.Forms;
using Tncvd.WinForms.Forms;

namespace Tncvd.WinForms.Utility
{
    public static partial class HelperMethods
    {
        public static void AddWinFormsFormProperties(Form form)
        {
        }

        public static void AddAppFormProperties(AppFormBase appForm)
        {
            AddWinFormsFormProperties(appForm);
        }

        public static void AddMainAppFormProperties(AppMainFormBase mainAppForm)
        {
        }

        public static void SetFormIcon(Form form, string iconFilePath)
        {
            form.Icon = new System.Drawing.Icon(iconFilePath);
        }
    }
}
