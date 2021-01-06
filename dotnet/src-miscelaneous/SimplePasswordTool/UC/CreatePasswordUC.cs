using SimplePasswordTool.Components;
using SimplePasswordTool.Forms;
using SimplePasswordTool.Services;
using System;
using System.Windows.Forms;

namespace SimplePasswordTool.UC
{
    public partial class CreatePasswordUC : UserControl
    {
        private Action onUserCancelledForm;
        private Action<PasswordData> onUserSavedForm;
        private Action passwordOptionsSave;

        public CreatePasswordUC()
        {
            this.InitializeComponent();
            this.InitControls();
        }

        protected PasswordHelper PasswordHelper { get; private set; }

        protected PasswordData PasswordData { get; private set; }

        protected PasswordOptions PasswordOptions { get; private set; }

        protected PasswordTextboxController CreatePasswordWrapper { get; private set; }

        protected PasswordTextboxController ConfirmCreatePasswordWrapper { get; private set; }

        public event Action UserCancelledForm
        {
            add
            {
                this.onUserCancelledForm += value;
            }

            remove
            {
                this.onUserCancelledForm -= value;
            }
        }

        public event Action<PasswordData> UserSavedForm
        {
            add
            {
                this.onUserSavedForm += value;
            }

            remove
            {
                this.onUserSavedForm -= value;
            }
        }

        public event Action PasswordOptionsSave
        {
            add
            {
                this.passwordOptionsSave += value;
            }

            remove
            {
                this.passwordOptionsSave -= value;
            }
        }

        public void SetHelper(PasswordHelper passwordHelper)
        {
            this.PasswordHelper = passwordHelper;
        }

        public void SetDataSource(PasswordData passwordData)
        {
            this.PasswordData = passwordData;
            this.UpdateControls(passwordData);
        }

        public void SetOptions(PasswordOptions passwordOptions)
        {
            this.PasswordOptions = passwordOptions;
            this.btnGenerateRandomPassword.Enabled = true;
        }

        public void ResetControls()
        {
            this.txtPasswordName.Clear();
            this.txtCreatePassword.Clear();
            this.txtConfirmCreatePassword.Clear();
        }

        private PasswordTextboxController GetCreatePasswordController()
        {
            return new PasswordTextboxController(
                this.txtCreatePassword,
                this.btnShowCreatePassword);
        }

        private PasswordTextboxController GetConfirmCreatePasswordController()
        {
            return new PasswordTextboxController(
                this.txtConfirmCreatePassword,
                this.btnShowConfirmCreatePassword);
        }

        private void UpdateControls(PasswordData passwordData)
        {
            if (passwordData.IsDirty == false)
            {
                this.ResetControls();
            }

            this.EnableControls(true);
        }

        private void InitControls()
        {
            this.CreatePasswordWrapper = this.GetCreatePasswordController();
            this.ConfirmCreatePasswordWrapper = this.GetConfirmCreatePasswordController();

            this.btnGenerateRandomPassword.Enabled = false;
            this.EnableControls(false);
        }

        private void EnableControls(bool enable = false)
        {
            this.txtPasswordName.Enabled = enable;
            this.txtCreatePassword.Enabled = enable;
            this.txtConfirmCreatePassword.Enabled = enable;
            this.btnCreatePasswordSave.Enabled = enable;
            this.btnCreatePasswordCancel.Enabled = enable;
        }

        private bool PerformPasswordValidation()
        {
            bool isValid = false;

            if (this.PasswordHasValidLength(this.txtCreatePassword.Text) == false)
            {
                this.ShowValidationMessage(false, $"The password length must be between {PasswordService.MIN_PASSWORD_LENGTH} and {PasswordService.MAX_PASSWORD_LENGTH} symbols");
            }
            else if (this.txtCreatePassword.Text != this.txtConfirmCreatePassword.Text)
            {
                this.ShowValidationMessage(false);
            }
            else
            {
                this.ShowValidationMessage(true);
                isValid = true;
            }

            this.btnCreatePasswordSave.Enabled = isValid;

            return isValid;
        }

        private bool PasswordHasValidLength(string passwordValue)
        {
            bool retVal = false;

            if (passwordValue != null)
            {
                int passwordLength = passwordValue.Length;
                retVal = passwordLength >= PasswordService.MIN_PASSWORD_LENGTH && passwordLength <= PasswordService.MAX_PASSWORD_LENGTH;
            }

            return retVal;
        }

        private void ShowValidationMessage(bool isValid, string message = "Passwords must match")
        {
            this.lblPasswordsMatchMsg.Visible = isValid;
            this.lblCreatePasswordErrorMsg.Visible = !isValid;

            if (isValid == false)
            {
                this.lblCreatePasswordErrorMsg.Text = message;
            }
        }

        private void SetPasswordDataDirty(bool dirty = true)
        {
            this.PasswordData.IsDirty = true;
        }

        private PasswordData GetAppModel()
        {
            string passwordValue = this.txtCreatePassword.Text;

            return new PasswordData(
                0,
                this.txtPasswordName.Text,
                passwordValue,
                this.PasswordHelper.GenerateHash(passwordValue));
        }

        private void BtnGenerateRandomPassword_Click(object sender, EventArgs e)
        {
            PasswordGeneratorForm passwordGeneratorForm = new PasswordGeneratorForm(this.PasswordOptions);
            passwordGeneratorForm.PasswordOptionsSave += this.PasswordOptionsUserSave;
            passwordGeneratorForm.ShowDialog();
        }

        private void PasswordOptionsUserSave()
        {
            this.passwordOptionsSave();
        }

        private void BtnCreatePasswordSave_Click(object sender, System.EventArgs e)
        {
            if (this.PerformPasswordValidation())
            {
                this.EnableControls(false);

                this.onUserSavedForm(
                    this.GetAppModel());
            }
        }

        private void BtnCreatePasswordCancel_Click(object sender, System.EventArgs e)
        {
            this.ResetControls();
            this.EnableControls(false);
            this.SetPasswordDataDirty(false);

            this.onUserCancelledForm();
        }

        private void TxtCreatePassword_TextChanged(object sender, System.EventArgs e)
        {
            this.SetPasswordDataDirty();
            this.PerformPasswordValidation();
        }

        private void TxtConfirmCreatePassword_TextChanged(object sender, System.EventArgs e)
        {
            this.SetPasswordDataDirty();
            this.PerformPasswordValidation();
        }

        private void TxtPasswordName_TextChanged(object sender, EventArgs e)
        {
            this.SetPasswordDataDirty();
        }
    }
}
