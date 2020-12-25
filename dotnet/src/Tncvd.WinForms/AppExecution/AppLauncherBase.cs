using Tncvd.WinForms.Forms;

namespace Tncvd.WinForms.AppExecution
{
    public abstract class AppLauncherBase
    {
        public abstract void Launch();

        protected virtual AppContainerForm GetAppContainerForm()
        {
            AppContainerForm appContainerForm = new AppContainerForm(
                GetAppContainerInitializer());

            return appContainerForm;
        }

        protected abstract AppContainerInitializer GetAppContainerInitializer();
    }
}
