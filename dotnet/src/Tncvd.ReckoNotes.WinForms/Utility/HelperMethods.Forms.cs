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

        public static void AddMainAppFormProperties(MainAppFormBase mainAppForm)
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
                ReckoNotes.Utility.HelperMethods.GetAppLogoImageFilePath(
                    ConstantValues.AppLogoImageSizes.SIZE_32_PX));
        }
    }
}
