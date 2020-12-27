using Tncvd.WinForms.Forms;

namespace Tncvd.ReckoNotes.WinForms.Forms
{
    public partial class AppMainForm : AppMainFormBase
    {
        public AppMainForm()
        {
            InitializeComponent();
            this.InitForm();
        }

        protected override void InitForm()
        {
            base.InitForm();
            Utility.HelperMethods.AddMainAppFormProperties(this);
        }
    }
}
