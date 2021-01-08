using SimplePasswordTool.Components;
using SimplePasswordTool.Services;
using System;
using System.Windows.Forms;

namespace SimplePasswordTool.UC
{
    public partial class CheckPasswordUC : UserControl
    {
        private Action<PasswordData> deletePasswordValue;

        public CheckPasswordUC()
        {
            this.InitializeComponent();
            this.InitControls();
        }

        protected PasswordData DataSource { get; private set; }

        protected PasswordHelper PasswordHelper { get; private set; }

        protected PasswordTextboxController TypedPasswordController { get; private set; }

        protected PasswordTextboxController ActualPasswordController { get; private set; }

        public event Action<PasswordData> DeletePasswordValue
        {
            add
            {
                this.deletePasswordValue += value;
            }

            remove
            {
                this.deletePasswordValue -= value;
            }
        }

        public void SetHelper(PasswordHelper passwordHelper)
        {
            this.PasswordHelper = passwordHelper;
        }

        public void SetDataSource(PasswordData passwordData)
        {
            this.DataSource = passwordData;
            this.RefreshControls();
        }

        private void InitControls()
        {
            this.TypedPasswordController = this.GetTypedPasswordController();
            this.ActualPasswordController = this.GetActualPasswordController();
        }

        private void RefreshControls()
        {
            this.pnlCheckPasswordMsg.Visible = false;
            this.txtActualPassword.Text = this.DataSource.PasswordValue;

            this.SetShowActualPasswordPanels(this.DataSource.PasswordValue != null);
        }

        private PasswordTextboxController GetTypedPasswordController()
        {
            return new PasswordTextboxController(
                this.txtTypedPassword,
                this.btnShowTypedPassword);
        }

        private PasswordTextboxController GetActualPasswordController()
        {
            return new PasswordTextboxController(
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

        private void BtnCheckPassword_Click(object sender, System.EventArgs e)
        {
            bool passwordCorrect = this.IsPasswordCorrect(this.txtTypedPassword.Text);
            this.ShowMessage(true, passwordCorrect);
        }

        private void BtnDeletePasswordValue_Click(object sender, System.EventArgs e)
        {
            txtActualPassword.Text = string.Empty;
            this.DataSource.DeleteValue();
            this.deletePasswordValue(this.DataSource);

            this.SetShowActualPasswordPanels(false);
            // this.ShowMessage(true, true, "The actual password has been deleted and only the password hash is being kept for future checks.");
        }

        private void TxtTypedPassword_TextChanged(object sender, System.EventArgs e)
        {
            this.ShowMessage(false);
        }
    }
}
