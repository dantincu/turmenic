using System;
using Tncvd.WinForms.AppExecution;

namespace Tncvd.WinForms.Forms
{
    public partial class MainAppFormBase : AppFormBase
    {
        public MainAppFormBase()
        {
            Utility.HelperMethods.AddMainAppFormProperties(this);
        }

        protected override void InitForm()
        {
            base.InitForm();
            AppContainer.Instance.SetAppMainForm(this);
        }

        protected virtual void InitForm(Action<AppContainerForm> assignCallback)
        {
            AppContainer.LaunchAppContainerForm(assignCallback);
            AppContainer.Instance.SetAppMainForm(this);

            base.InitForm();
        }
    }
}
