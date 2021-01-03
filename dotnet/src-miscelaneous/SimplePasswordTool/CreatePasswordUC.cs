using SimplePasswordTool.Services;
using System.Windows.Forms;

namespace SimplePasswordTool
{
    public partial class CreatePasswordUC : UserControl
    {
        public CreatePasswordUC()
        {
            this.InitializeComponent();
        }

        protected PasswordHelper PasswordHelper { get; private set; }

        public void SetHelper(PasswordHelper passwordHelper)
        {
            this.PasswordHelper = passwordHelper;
        }

        public void RefreshControls()
        {
            this.txtCreatePassword.Clear();
            this.txtConfirmCreatePassword.Clear();

            this.pnlCreatePasswordMsg.Visible = false;
            this.btnCreatePasswordSave.Enabled = false;
        }

        private void btnGenerateRandomPassword_Click(object sender, System.EventArgs e)
        {
            string randomPassword = this.PasswordHelper.GenerateRandomPassword();
            txtCreatePassword.Text = randomPassword;
            txtConfirmCreatePassword.Clear();
        }

        private void btnCreatePasswordSave_Click(object sender, System.EventArgs e)
        {

        }

        private void btnCreatePasswordCancel_Click(object sender, System.EventArgs e)
        {

        }
    }
}
