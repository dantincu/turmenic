using System.Windows.Forms;
using Tncvd.ReckoNotes.WinForms.Forms;
using Tncvd.WinForms.Forms.AppContainerWindow;

namespace Tncvd.ReckoNotes.WinForms.Utility
{
    public static partial class HelperMethods
    {
        public static void AddMainAppWindowProperties(AppMainWindowForm appMainWindow)
        {
            SetDefaultFormIconProperty(appMainWindow);
        }

        public static void AddAppContainerWindowProperties(AppContainerWindowForm appContainerWindow)
        {
            SetDefaultFormIconProperty(appContainerWindow);
        }

        public static void SetDefaultFormIconProperty(Form form)
        {
            Tncvd.WinForms.Utility.HelperMethods.SetFormIcon(
                form,
                GetAppLogoImageFilePath());
        }
    }
}
