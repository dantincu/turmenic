using Tncvd.WinForms.Forms.AppWindow.Base;
using Tncvd.WinForms.Logging;

namespace Tncvd.WinForms.Forms.AppContainerWindow
{
    public partial class AppContainerWindowForm : AppWindowFormBase
    {
        public AppContainerWindowForm()
        {
            this.InitializeComponent();
        }

        protected AppContainerWindowUC WindowUC => this.AppWindowUC as AppContainerWindowUC;
        protected AppContainerWindowContentUC ContentUC => this.AppWindowContentUC as AppContainerWindowContentUC;

        protected override void AddFormProperties()
        {
            base.AddFormProperties();
            Utility.HelperMethods.AddAppContainerWindowProperties(this);
        }

        private void InitTextBoxLoggers()
        {
            TextBoxLoggerFactory.Instance.RegisterDefaultLoggingAppTextBox(this.ContentUC.LogsTextBox);
            TextBoxLoggerFactory.Instance.RegisterDefaultOutputAppTextBox(this.ContentUC.OutputTextBox);
        }

        protected override void OnCreateControl()
        {
            base.OnCreateControl();
        }

        protected override void AddFormUC()
        {
            this.AppFormUC = new AppContainerWindowUC();
            this.Controls.Add(this.AppFormUC);
        }

        protected override void AddContentUC()
        {
            this.AppWindowContentUC = new AppContainerWindowContentUC();
            this.WindowUC.MainContentPanel.Controls.Add(this.ContentUC);
            this.InitTextBoxLoggers();
        }
    }
}
