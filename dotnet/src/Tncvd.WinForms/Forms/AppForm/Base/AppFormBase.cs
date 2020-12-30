using System.Windows.Forms;

namespace Tncvd.WinForms.Forms.AppForm.Base
{
    public partial class AppFormBase : Form
    {
        public AppFormBase()
        {
            this.InitializeComponent();
        }

        protected virtual AppFormUCBase AppFormUC { get; set; }

        protected virtual void AddFormProperties()
        {
            Utility.HelperMethods.AddAppFormProperties(this);
        }

        protected override void OnCreateControl()
        {
            base.OnCreateControl();
            this.AddFormProperties();
            this.AddControls();
        }

        protected virtual void AddControls()
        {
            this.AddFormUC();
        }

        protected virtual void AddFormUC()
        {
        }
    }
}
