using Tncvd.WinForms.Forms.AppForm.Base;

namespace Tncvd.WinForms.Forms.AppWindow.Base
{
    public partial class AppWindowFormBase : AppFormBase
    {
        public AppWindowFormBase()
        {
            this.InitializeComponent();
        }

        protected virtual AppWindowUC AppWindowUC => this.AppFormUC as AppWindowUC;
        protected virtual AppWindowContentUCBase AppWindowContentUC { get; set; }

        protected override void AddFormProperties()
        {
            base.AddFormProperties();
            Utility.HelperMethods.AddAppWindowProperties(this);
        }

        protected override void AddControls()
        {
            base.AddControls();
            this.AddContentUC();
        }

        protected override void AddFormUC()
        {
            this.AppFormUC = new AppWindowUC();
            this.Controls.Add(this.AppFormUC);
        }

        protected virtual void AddContentUC()
        {
        }
    }
}
