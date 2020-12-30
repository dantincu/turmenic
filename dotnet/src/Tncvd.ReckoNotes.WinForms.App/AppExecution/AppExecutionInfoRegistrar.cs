using System.Windows.Forms;
using Tncvd.AppSettings.AppExecution;
using Tncvd.AppSettings.SettingsLoader;
using Tncvd.ReckoNotes.WinForms.Forms;
using Tncvd.WinForms.AppExecution;

namespace Tncvd.ReckoNotes.WinForms.App.AppExecution
{
    public class AppExecutionInfoRegistrar : AppExecutionInfoRegistrarBase<AppEnvSettingsLoader>
    {
    }

    public class AppEnvSettingsLoader : AppEnvSettingsLoaderBase
    {
    }

    public class AppController : AppControllerBase<AppMainWindowForm, AppExecutionInfoRegistrar>
    {
        private static AppController _instance;

        private AppController()
        {
        }

        public static AppController Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new AppController();
                }

                return _instance;
            }
        }

        protected override void ExitApp()
        {
            // Application.Exit();
        }

        protected override void LaunchApp()
        {
            Application.Run(this.AppContainerWindowForm);
        }

        protected override void OnAppContainerFormLoad()
        {
            Utility.HelperMethods.AddAppContainerWindowProperties(this.AppContainerWindowForm);
        }
    }
}
