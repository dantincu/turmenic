using SimplePasswordTool.Services;
using System.Windows.Forms;

namespace SimplePasswordTool
{
    public partial class CheckPasswordUC : UserControl
    {
        public CheckPasswordUC()
        {
            this.InitializeComponent();
        }

        protected PasswordData DataSource { get; private set; }

        protected PasswordHelper PasswordHelper { get; private set; }

        protected PasswordTextboxWrapper TypedPasswordWrapper { get; private set; }

        protected PasswordTextboxWrapper ActualPasswordWrapper { get; private set; }

        public void SetHelper(PasswordHelper passwordHelper)
        {
            this.PasswordHelper = passwordHelper;
        }

        public void SetDataSource(PasswordData passwordData)
        {
            this.DataSource = passwordData;
            this.RefreshControls();
        }

        private void RefreshControls()
        {
            this.pnlCheckPasswordMsg.Visible = false;
            this.txtActualPassword.Text = this.DataSource.PasswordValue;

            this.SetShowActualPasswordPanels(this.DataSource.PasswordValue != null);

            this.TypedPasswordWrapper = this.GetTypedPasswordWrapper();
            this.ActualPasswordWrapper = this.GetActualPasswordWrapper();
        }

        private PasswordTextboxWrapper GetTypedPasswordWrapper()
        {
            return new PasswordTextboxWrapper(
                this.txtTypedPassword,
                this.btnShowTypedPassword);
        }

        private PasswordTextboxWrapper GetActualPasswordWrapper()
        {
            return new PasswordTextboxWrapper(
                this.txtActualPassword,
                this.btnShowActualPassword);
        }

        private void SetShowActualPasswordPanels(bool visible)
        {
            this.pnlLblShowPassword.Visible = visible;
            this.pnlShowPassword.Visible = visible;
            this.pnlTxtShowPassword.Visible = visible;
        }

        private void ShowMessage(bool show, bool success = false, string message = null)
        {
            this.pnlCheckPasswordMsg.Visible = show;

            if (success)
            {
                this.lblCorrectPasswordMsg.Visible = true;
                this.lblCorrectPasswordMsg.Text = message ?? "Password correct";
                this.lblIncorrectPasswordMsg.Visible = false;
            }
            else
            {
                this.lblCorrectPasswordMsg.Visible = false;
                this.lblIncorrectPasswordMsg.Visible = true;
                this.lblCorrectPasswordMsg.Text = message ?? "Password incorrect";
            }
        }

        private bool IsPasswordCorrect(string typedValue)
        {
            return this.PasswordHelper.DoPasswordsMatch(typedValue, this.DataSource.PasswordHash);
        }

        private void btnCheckPassword_Click(object sender, System.EventArgs e)
        {
            bool passwordCorrect = this.IsPasswordCorrect(this.txtTypedPassword.Text);
            this.ShowMessage(true, passwordCorrect);
        }

        private void btnDeletePasswordValue_Click(object sender, System.EventArgs e)
        {
            this.DataSource.DeleteValue();
            this.SetShowActualPasswordPanels(false);
            this.ShowMessage(true, true, "The actual password has been deleted and only the password hash is being kept for future checks.");
        }

        private void txtTypedPassword_TextChanged(object sender, System.EventArgs e)
        {
            this.ShowMessage(false);
        }
    }
}
