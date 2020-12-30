using Tncvd.WinForms.Forms.AppMainWindow.Base;

namespace Tncvd.ReckoNotes.WinForms.Forms
{
    public partial class AppMainWindowForm : AppMainWindowFormBase
    {
        public AppMainWindowForm()
        {
            this.InitializeComponent();
        }

        protected AppMainWindowContentUC ContentUC => this.AppWindowContentUC as AppMainWindowContentUC;

        protected override void AddFormProperties()
        {
            base.AddFormProperties();
            Utility.HelperMethods.AddMainAppWindowProperties(this);
        }

        protected override void AddControls()
        {
            base.AddControls();
        }

        protected override void AddContentUC()
        {
            this.AppWindowContentUC = new AppMainWindowContentUC();
            this.AppWindowUC.MainContentPanel.Controls.Add(this.AppWindowContentUC);
        }
    }
}
