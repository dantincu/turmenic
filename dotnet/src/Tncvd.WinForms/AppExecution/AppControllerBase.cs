using System;
using Tncvd.WinForms.Forms.AppContainerWindow;
using Tncvd.WinForms.Forms.AppMainWindow.Base;

namespace Tncvd.WinForms.AppExecution
{
    public abstract class AppControllerBase<TAppMainForm, TAppExecutionRegistrar> : IDisposable where TAppMainForm : AppMainWindowFormBase, new() where TAppExecutionRegistrar : AppConfig.Execution.AppExecutionInfoRegistrarBase, new()
    {
        public virtual void Launch()
        {
            new TAppExecutionRegistrar().Register();

            this.InitAppForms();
            this.InitAppContainer();

            this.LaunchApp();
        }

        protected AppContainerWindowForm AppContainerWindowForm { get; private set; }

        protected TAppMainForm AppMainForm { get; private set; }

        protected abstract void LaunchApp();

        protected abstract void ExitApp();

        protected abstract void OnAppContainerFormLoad();

        private AppContainerWindowForm GetAppContainerWindowForm()
        {
            return new AppContainerWindowForm();
        }

        private TAppMainForm GetAppMainForm()
        {
            return new TAppMainForm();
        }

        private void InitAppForms()
        {
            this.InitAppContainerForm();
            this.InitAppMainForm();
        }

        private void InitAppContainerForm()
        {
            this.AppContainerWindowForm = this.GetAppContainerWindowForm();

            this.AttachAppContainerFormEventHandlers();
        }

        private void AttachAppContainerFormEventHandlers()
        {
            this.AppContainerWindowForm.Load += this.OnAppContainerFormLoad;
            this.AppContainerWindowForm.Shown += AppContainerFormShown;
            this.AppContainerWindowForm.FormClosed += AppContainerFormFormClosed;
        }

        private void InitAppMainForm()
        {
            this.AppMainForm = this.GetAppMainForm();
            this.AppMainForm.FormClosed += AppMainFormFormClosed;
        }

        private void AppContainerFormFormClosed(object sender, System.Windows.Forms.FormClosedEventArgs e)
        {
            this.ExitApp();
        }

        private void AppMainFormFormClosed(object sender, System.Windows.Forms.FormClosedEventArgs e)
        {
            this.AppContainerWindowForm.Close();
        }

        private void AppContainerFormShown(object sender, System.EventArgs e)
        {
            this.AppMainForm.BringToFront();
        }

        private void OnAppContainerFormLoad(object sender, System.EventArgs e)
        {
            this.OnAppContainerFormLoad();
            this.AppMainForm.Show();
        }

        private void InitAppContainer()
        {
            AppContainer.Instance.AssignAppContainerForm(this.AppContainerWindowForm);
            AppContainer.Instance.AssignAppMainForm(this.AppMainForm);
        }

        public void Dispose()
        {
            this.AppContainerWindowForm?.Dispose();
            this.AppMainForm?.Dispose();
        }
    }
}
