using SimplePasswordTool.Components;
using SimplePasswordTool.Services;
using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Windows.Forms;

namespace SimplePasswordTool.Forms
{
    public partial class PasswordGeneratorForm : Form
    {
        private readonly ReadOnlyCollection<Label> validationMessageLabels;

        private Action passwordOptionsSave;

        public PasswordGeneratorForm()
        {
            this.InitializeComponent();

            this.validationMessageLabels = new ReadOnlyCollection<Label>(
                this.GetValidationLabelsArr());
        }

        public PasswordGeneratorForm(PasswordOptions passwordOptions) : this()
        {
            this.PasswordOptions = passwordOptions ?? throw new ArgumentNullException(nameof(passwordOptions));
            this.PasswordTextboxWrapper = new PasswordTextboxController(this.txtGeneratedPassword, this.btnShowGeneratedPassword);
            // this.PasswordGenerator = new PasswordGenerator(this.PasswordOptions);

            this.InitControls();
        }

        protected PasswordOptions PasswordOptions { get; }

        protected PasswordTextboxController PasswordTextboxWrapper { get; }

        // protected PasswordGenerator PasswordGenerator { get; private set; }

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

        private void InitControls()
        {
            this.HideUserMessageLabels();
            this.btnCopyPasswordToClipboard.Enabled = false;
            this.InitControlValues();
        }

        private void InitControlValues()
        {
            this.nrUpDownMaxLength.Value = this.PasswordOptions.MaxLength;
            this.nrUpDownRequiredLength.Value = this.PasswordOptions.RequiredLength;
            this.nrUpDownRequiredUniqueChars.Value = this.PasswordOptions.RequiredUniqueChars;

            this.txtAllowedNonAlphaNumericSymbols.Text = this.PasswordOptions.AllowedNonAlphaNumericChars;

            this.checkBoxRequireDigit.Checked = this.PasswordOptions.RequireDigit;
            this.checkBoxRequireLowerCase.Checked = this.PasswordOptions.RequireLowercase;
            this.checkBoxRequireNonAlphaNumeric.Checked = this.PasswordOptions.RequireNonAlphanumeric;
            this.checkBoxRequireUpperCase.Checked = this.PasswordOptions.RequireUppercase;
        }

        private void ResetAllowedNonAlphaNumericSymbolsList()
        {
            this.txtAllowedNonAlphaNumericSymbols.Text = PasswordService.DEFAULT_ALLOWED_NON_ALPHA_NUMERIC_CHARS;
            this.PasswordOptions.AllowedNonAlphaNumericChars = PasswordService.DEFAULT_ALLOWED_NON_ALPHA_NUMERIC_CHARS;
        }

        private void AssureNonAlphaNumericSymbolsListNotRequired(string allowedNonAlphaNumericChars)
        {
            if (string.IsNullOrWhiteSpace(allowedNonAlphaNumericChars))
            {
                this.txtAllowedNonAlphaNumericSymbols.Clear();
                this.checkBoxRequireNonAlphaNumeric.Checked = false;

                this.PasswordOptions.AllowedNonAlphaNumericChars = null;
                this.PasswordOptions.RequireNonAlphanumeric = false;
            }
        }

        private void AssureAllowedNonAlphaNumericSymbolsListNotEmpty(bool assure = false)
        {
            if (assure && string.IsNullOrWhiteSpace(this.PasswordOptions.AllowedNonAlphaNumericChars))
            {
                this.ResetAllowedNonAlphaNumericSymbolsList();
            }
        }

        #region PasswordOptionsValidation

        private Label[] GetValidationLabelsArr()
        {
            return new Label[]
            {
                this.lblMaxLengthErrorMsg,
                this.lblRequiredLengthErrorMsg,
                this.lblRequiredUniqueCharsErrorMsg,
                this.lblAllowedNonAlphaNumericSymbolsErrorMsg,
                this.lblGeneratedPasswordCopiedToClipboardMsg
            };
        }

        private void HideUserMessageLabels()
        {
            foreach (Label lbl in this.validationMessageLabels)
            {
                lbl.Visible = false;
            }
        }

        private void ShowUserMessage(Label labelControl, bool show, string message = null)
        {
            this.HideUserMessageLabels();
            labelControl.Visible = show;

            if (message != null)
            {
                labelControl.Text = message;
            }
        }

        private bool PerformOptionsValidation()
        {
            this.HideUserMessageLabels();
            return this.PerformOptionsValidation(this.PasswordOptions);
        }

        private bool PerformOptionsValidation(PasswordOptions passwordOptions)
        {
            bool retVal = this.ValidatePasswordMaxLength(passwordOptions);
            retVal = retVal && this.ValidatePasswordRequiredLength(passwordOptions);

            retVal = retVal && this.ValidateAllowedNonAlphaNumericSymbols(passwordOptions);
            retVal = retVal && this.ValidatePasswordRequiredUniqueSymbols(passwordOptions);

            return retVal;
        }

        private bool ValidatePasswordMaxLength(PasswordOptions passwordOptions)
        {
            bool retVal = passwordOptions.MaxLength >= PasswordService.MIN_PASSWORD_LENGTH && passwordOptions.MaxLength <= PasswordService.MAX_PASSWORD_LENGTH;

            if (retVal == false)
            {
                this.ShowUserMessage(this.lblMaxLengthErrorMsg, true, $"The password maximum length must be between {PasswordService.MIN_PASSWORD_LENGTH} and {PasswordService.MAX_PASSWORD_LENGTH}");
            }

            return retVal;
        }

        private bool ValidatePasswordRequiredLength(PasswordOptions passwordOptions)
        {
            bool retVal = passwordOptions.RequiredLength >= PasswordService.MIN_PASSWORD_LENGTH && passwordOptions.RequiredLength <= passwordOptions.MaxLength;

            if (retVal == false)
            {
                this.ShowUserMessage(this.lblRequiredLengthErrorMsg, true, $"The password required length must be between {PasswordService.MIN_PASSWORD_LENGTH} and the password max length");
            }

            return retVal;
        }

        private bool ValidateAllowedNonAlphaNumericSymbols(PasswordOptions passwordOptions)
        {
            bool retVal = true;

            if (passwordOptions.RequireNonAlphanumeric && passwordOptions.AllowedNonAlphaNumericChars != null)
            {
                retVal = passwordOptions.AllowedNonAlphaNumericChars.Length == passwordOptions.AllowedNonAlphaNumericChars.Distinct().Count();
                retVal = retVal && passwordOptions.AllowedNonAlphaNumericChars.All(c => this.IsNonAlphaNumericSymbolValid(c));

                if (retVal == false)
                {
                    this.ShowUserMessage(this.lblAllowedNonAlphaNumericSymbolsErrorMsg, true, "The list of allowed non alpha numeric symbols must not contain duplicates or white spaces");
                }
            }

            return retVal;
        }

        private bool IsNonAlphaNumericSymbolValid(char c)
        {
            bool valid = (char.IsWhiteSpace(c) || char.IsDigit(c) || char.IsLetter(c)) == false;
            return valid;
        }

        private bool ValidatePasswordRequiredUniqueSymbols(PasswordOptions passwordOptions)
        {
            bool retVal;

            int maxUniqueCharsCount = this.GetMaxUniqueCharsCount(passwordOptions);
            retVal = passwordOptions.RequiredUniqueChars >= 0 && passwordOptions.RequiredUniqueChars <= maxUniqueCharsCount;

            if (retVal == false)
            {
                this.ShowUserMessage(this.lblRequiredUniqueCharsErrorMsg, true, $"The number of required unique chars must be between 0 and {maxUniqueCharsCount}, according to the rest of the chosen options");
            }

            return retVal;
        }

        private int GetTotalRandomCharsCount(PasswordOptions passwordOptions)
        {
            return PasswordGenerator.BasicRandomCharsCount + (passwordOptions.AllowedNonAlphaNumericChars?.Length ?? 0);
        }

        private int GetMaxUniqueCharsCount(PasswordOptions passwordOptions)
        {
            /* Ignoring the limit case where the password max length is equal to the total number of possible unique chars,
             * as for any other case it's impossible not to duplicate at least one character,
             * which is why the value 1 is being substracted from the absolute maximum value of possible unique chars */
            int maxUniqueCharsCount = this.GetTotalRandomCharsCount(passwordOptions) - 1;

            return Math.Min(maxUniqueCharsCount, passwordOptions.MaxLength);
        }

        #endregion PasswordOptionsValidation

        #region Control Events

        private void btnGeneratePassword_Click(object sender, EventArgs e)
        {
            if (this.PerformOptionsValidation())
            {
                this.txtGeneratedPassword.Text = new PasswordGenerator(this.PasswordOptions).GenerateRandomPassword();
                this.passwordOptionsSave();
                this.btnCopyPasswordToClipboard.Enabled = true;
            }
        }

        private void nrUpDownMaxLength_ValueChanged(object sender, EventArgs e)
        {
            this.PasswordOptions.MaxLength = (int)((NumericUpDown)sender).Value;
            this.PerformOptionsValidation();
        }

        private void nrUpDownRequiredLength_ValueChanged(object sender, EventArgs e)
        {
            this.PasswordOptions.RequiredLength = (int)((NumericUpDown)sender).Value;
            this.PerformOptionsValidation();
        }

        private void nrUpDownRequiredUniqueChars_ValueChanged(object sender, EventArgs e)
        {
            this.PasswordOptions.RequiredUniqueChars = (int)((NumericUpDown)sender).Value;
            this.PerformOptionsValidation();
        }

        private void checkBoxRequireDigit_CheckedChanged(object sender, EventArgs e)
        {
            this.PasswordOptions.RequireDigit = ((CheckBox)sender).Checked;
            this.PerformOptionsValidation();
        }

        private void checkBoxRequireLowerCase_CheckedChanged(object sender, EventArgs e)
        {
            this.PasswordOptions.RequireLowercase = ((CheckBox)sender).Checked;
            this.PerformOptionsValidation();
        }

        private void checkBoxRequireNonAlphaNumeric_CheckedChanged(object sender, EventArgs e)
        {
            this.PasswordOptions.RequireNonAlphanumeric = ((CheckBox)sender).Checked;
            this.AssureAllowedNonAlphaNumericSymbolsListNotEmpty(((CheckBox)sender).Checked);
            this.PerformOptionsValidation();
        }

        private void checkBoxRequireUpperCase_CheckedChanged(object sender, EventArgs e)
        {
            this.PasswordOptions.RequireUppercase = ((CheckBox)sender).Checked;
            this.PerformOptionsValidation();
        }

        private void btnResetAllowedNonAlphaNumericChars_Click(object sender, EventArgs e)
        {
            this.ResetAllowedNonAlphaNumericSymbolsList();
            this.PerformOptionsValidation();
        }

        private void txtAllowedNonAlphaNumericSymbols_TextChanged(object sender, EventArgs e)
        {
            this.PasswordOptions.AllowedNonAlphaNumericChars = ((TextBox)sender).Text;
            this.AssureNonAlphaNumericSymbolsListNotRequired(((TextBox)sender).Text);
            this.PerformOptionsValidation();
        }

        private void btnCopyPasswordToClipboard_Click(object sender, EventArgs e)
        {
            Clipboard.SetText(this.txtGeneratedPassword.Text);
            this.ShowUserMessage(this.lblGeneratedPasswordCopiedToClipboardMsg, true);
        }

        #endregion Control Events
    }
}
