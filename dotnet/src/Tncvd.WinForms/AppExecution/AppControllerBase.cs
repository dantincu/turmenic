using System;
using Tncvd.WinForms.Forms;

namespace Tncvd.WinForms.AppExecution
{
    public abstract class AppControllerBase<TAppMainForm, TAppExecutionRegistrar> : IDisposable where TAppMainForm : AppMainFormBase, new() where TAppExecutionRegistrar : AppConfig.Execution.AppExecutionInfoRegistrarBase, new()
    {
        public virtual void Launch()
        {
            new TAppExecutionRegistrar().Register();

            this.InitAppForms();
            this.InitAppContainer();

            this.LaunchApp();
        }

        protected AppContainerForm AppContainerForm { get; private set; }

        protected TAppMainForm AppMainForm { get; private set; }

        protected abstract void LaunchApp();

        protected abstract void ExitApp();

        protected abstract void OnAppContainerFormLoad();

        private AppContainerForm GetAppContainerForm()
        {
            return new AppContainerForm();
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
            this.AppContainerForm = this.GetAppContainerForm();
            this.AppContainerForm.InitTextBoxLoggers();

            this.AttachAppContainerFormEventHandlers();
        }

        private void AttachAppContainerFormEventHandlers()
        {
            this.AppContainerForm.Load += this.OnAppContainerFormLoad;
            this.AppContainerForm.Shown += AppContainerFormShown;
            this.AppContainerForm.FormClosed += AppContainerFormFormClosed;
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
            this.AppContainerForm.Close();
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
            AppContainer.Instance.AssignAppContainerForm(this.AppContainerForm);
            AppContainer.Instance.AssignAppMainForm(this.AppMainForm);
        }

        public void Dispose()
        {
            this.AppContainerForm?.Dispose();
            this.AppMainForm?.Dispose();
        }
    }
}
