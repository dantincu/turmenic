using System.Windows.Forms;
using Tncvd.WinForms.Forms;

namespace Tncvd.ReckoNotes.WinForms.Utility
{
    public static partial class HelperMethods
    {
        public static void AddFormProperties(Form form)
        {
        }

        public static void AddAppFormProperties(AppFormBase appForm)
        {
        }

        public static void AddMainAppFormProperties(AppMainFormBase mainAppForm)
        {
            SetDefaultAppFormIconProperty(mainAppForm);
        }

        public static void AddAppContainerFormProperties(AppContainerForm appContainerForm)
        {
            SetDefaultAppFormIconProperty(appContainerForm);
        }

        public static void SetDefaultAppFormIconProperty(Form form)
        {
            Tncvd.WinForms.Utility.HelperMethods.SetFormIcon(
                form,
                GetAppLogoImageFilePath());
        }
    }
}
