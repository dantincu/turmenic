using System.Windows.Forms;
using Tncvd.ReckoNotes.WinForms.Forms;
using Tncvd.WinForms.AppExecution;

namespace Tncvd.ReckoNotes.WinForms.App.AppExecution
{
    public class AppLauncher : AppLauncherBase
    {
        public override void Launch()
        {
            new AppExecutionInfoRegistrar().Register();
            Application.Run(GetAppContainerForm());
        }

        protected override AppContainerInitializer GetAppContainerInitializer()
        {
            AppContainerInitializer appContainerInitializer = new AppContainerInitializer
            {
                MainAppFormCreator = () => new AppMainForm(),
                AppContainerFormPropsAssigner = appContainerForm =>
                {
                    Utility.HelperMethods.AddAppContainerFormProperties(appContainerForm);
                }
            };

            return appContainerInitializer;
        }
    }
}
