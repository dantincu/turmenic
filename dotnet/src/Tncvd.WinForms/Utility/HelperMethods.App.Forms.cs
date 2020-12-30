using System.Windows.Forms;
using Tncvd.WinForms.Forms.AppContainerWindow;
using Tncvd.WinForms.Forms.AppForm.Base;
using Tncvd.WinForms.Forms.AppMainWindow.Base;
using Tncvd.WinForms.Forms.AppWindow.Base;

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

        public static void AddAppWindowProperties(AppWindowFormBase appWindowForm)
        {
            appWindowForm.Size = ConstantValues.AppWindowDefaultSize;
            appWindowForm.WindowState = FormWindowState.Normal;
        }

        public static void AddMainAppWindowProperties(AppMainWindowFormBase mainAppForm)
        {
            mainAppForm.StartPosition = FormStartPosition.CenterParent;
        }

        public static void AddAppContainerWindowProperties(AppContainerWindowForm appContainerFormWindow)
        {
            appContainerFormWindow.StartPosition = FormStartPosition.CenterScreen;
        }

        public static void SetFormIcon(Form form, string iconFilePath)
        {
            form.Icon = new System.Drawing.Icon(iconFilePath);
        }
    }
}
