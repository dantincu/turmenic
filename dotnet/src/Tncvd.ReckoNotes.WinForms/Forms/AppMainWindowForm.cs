using Tncvd.WinForms.Forms.AppMainWindow.Base;

namespace Tncvd.ReckoNotes.WinForms.Forms
{
    public partial class AppMainWindowForm : AppMainWindowFormBase
    {
        public AppMainWindowForm()
        {
            this.InitializeComponent();
        }

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
        }
    }
}
