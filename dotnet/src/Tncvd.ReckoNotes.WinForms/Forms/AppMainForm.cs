using Tncvd.WinForms.Forms;

namespace Tncvd.ReckoNotes.WinForms.Forms
{
    public partial class AppMainForm : MainAppFormBase
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

        private void AppMainForm_Load(object sender, System.EventArgs e)
        {
            this.BringToFront();
        }
    }
}
