using Tncvd.WinForms.Forms.AppWindow.Base;

namespace Tncvd.WinForms.Forms.AppMainWindow.Base
{
    public partial class AppMainWindowFormBase : AppWindowFormBase
    {
        public AppMainWindowFormBase()
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
