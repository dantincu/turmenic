
namespace SimplePasswordTool.Forms
{
    partial class PasswordGeneratorForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.lblMaxLength = new System.Windows.Forms.Label();
            this.nrUpDownMaxLength = new System.Windows.Forms.NumericUpDown();
            this.lblRequiredLength = new System.Windows.Forms.Label();
            this.nrUpDownRequiredLength = new System.Windows.Forms.NumericUpDown();
            this.lblRequiredUniqueChars = new System.Windows.Forms.Label();
            this.nrUpDownRequiredUniqueChars = new System.Windows.Forms.NumericUpDown();
            this.checkBoxRequireDigit = new System.Windows.Forms.CheckBox();
            this.checkBoxRequireLowerCase = new System.Windows.Forms.CheckBox();
            this.checkBoxRequireNonAlphaNumeric = new System.Windows.Forms.CheckBox();
            this.checkBoxRequireUpperCase = new System.Windows.Forms.CheckBox();
            this.pnlOptions = new System.Windows.Forms.Panel();
            this.lblGeneratedPasswordCopiedToClipboardMsg = new System.Windows.Forms.Label();
            this.btnCopyPasswordToClipboard = new System.Windows.Forms.Button();
            this.lblAllowedNonAlphaNumericSymbolsErrorMsg = new System.Windows.Forms.Label();
            this.btnResetAllowedNonAlphaNumericChars = new System.Windows.Forms.Button();
            this.lblAllowedNonAlphaNumericChars = new System.Windows.Forms.Label();
            this.txtAllowedNonAlphaNumericSymbols = new System.Windows.Forms.TextBox();
            this.lblRequiredUniqueCharsErrorMsg = new System.Windows.Forms.Label();
            this.lblRequiredLengthErrorMsg = new System.Windows.Forms.Label();
            this.lblMaxLengthErrorMsg = new System.Windows.Forms.Label();
            this.btnShowGeneratedPassword = new System.Windows.Forms.Button();
            this.btnGeneratePassword = new System.Windows.Forms.Button();
            this.pnlGeneratedPassword = new System.Windows.Forms.Panel();
            this.txtGeneratedPassword = new System.Windows.Forms.TextBox();
            ((System.ComponentModel.ISupportInitialize)(this.nrUpDownMaxLength)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.nrUpDownRequiredLength)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.nrUpDownRequiredUniqueChars)).BeginInit();
            this.pnlOptions.SuspendLayout();
            this.pnlGeneratedPassword.SuspendLayout();
            this.SuspendLayout();
            // 
            // lblMaxLength
            // 
            this.lblMaxLength.AutoSize = true;
            this.lblMaxLength.Location = new System.Drawing.Point(67, 9);
            this.lblMaxLength.Name = "lblMaxLength";
            this.lblMaxLength.Size = new System.Drawing.Size(67, 15);
            this.lblMaxLength.TabIndex = 0;
            this.lblMaxLength.Text = "Max length";
            // 
            // nrUpDownMaxLength
            // 
            this.nrUpDownMaxLength.Location = new System.Drawing.Point(140, 5);
            this.nrUpDownMaxLength.Maximum = new decimal(new int[] {
            128,
            0,
            0,
            0});
            this.nrUpDownMaxLength.Name = "nrUpDownMaxLength";
            this.nrUpDownMaxLength.Size = new System.Drawing.Size(120, 23);
            this.nrUpDownMaxLength.TabIndex = 1;
            this.nrUpDownMaxLength.ValueChanged += new System.EventHandler(this.nrUpDownMaxLength_ValueChanged);
            // 
            // lblRequiredLength
            // 
            this.lblRequiredLength.AutoSize = true;
            this.lblRequiredLength.Location = new System.Drawing.Point(43, 33);
            this.lblRequiredLength.Name = "lblRequiredLength";
            this.lblRequiredLength.Size = new System.Drawing.Size(91, 15);
            this.lblRequiredLength.TabIndex = 2;
            this.lblRequiredLength.Text = "Required length";
            // 
            // nrUpDownRequiredLength
            // 
            this.nrUpDownRequiredLength.Location = new System.Drawing.Point(140, 31);
            this.nrUpDownRequiredLength.Maximum = new decimal(new int[] {
            128,
            0,
            0,
            0});
            this.nrUpDownRequiredLength.Name = "nrUpDownRequiredLength";
            this.nrUpDownRequiredLength.Size = new System.Drawing.Size(120, 23);
            this.nrUpDownRequiredLength.TabIndex = 3;
            this.nrUpDownRequiredLength.ValueChanged += new System.EventHandler(this.nrUpDownRequiredLength_ValueChanged);
            // 
            // lblRequiredUniqueChars
            // 
            this.lblRequiredUniqueChars.AutoSize = true;
            this.lblRequiredUniqueChars.Location = new System.Drawing.Point(9, 59);
            this.lblRequiredUniqueChars.Name = "lblRequiredUniqueChars";
            this.lblRequiredUniqueChars.Size = new System.Drawing.Size(125, 15);
            this.lblRequiredUniqueChars.TabIndex = 4;
            this.lblRequiredUniqueChars.Text = "Required unique chars";
            // 
            // nrUpDownRequiredUniqueChars
            // 
            this.nrUpDownRequiredUniqueChars.Location = new System.Drawing.Point(140, 57);
            this.nrUpDownRequiredUniqueChars.Maximum = new decimal(new int[] {
            128,
            0,
            0,
            0});
            this.nrUpDownRequiredUniqueChars.Name = "nrUpDownRequiredUniqueChars";
            this.nrUpDownRequiredUniqueChars.Size = new System.Drawing.Size(120, 23);
            this.nrUpDownRequiredUniqueChars.TabIndex = 5;
            this.nrUpDownRequiredUniqueChars.ValueChanged += new System.EventHandler(this.nrUpDownRequiredUniqueChars_ValueChanged);
            // 
            // checkBoxRequireDigit
            // 
            this.checkBoxRequireDigit.AutoSize = true;
            this.checkBoxRequireDigit.Location = new System.Drawing.Point(140, 125);
            this.checkBoxRequireDigit.Name = "checkBoxRequireDigit";
            this.checkBoxRequireDigit.Size = new System.Drawing.Size(93, 19);
            this.checkBoxRequireDigit.TabIndex = 7;
            this.checkBoxRequireDigit.Text = "Require digit";
            this.checkBoxRequireDigit.UseVisualStyleBackColor = true;
            this.checkBoxRequireDigit.CheckedChanged += new System.EventHandler(this.checkBoxRequireDigit_CheckedChanged);
            // 
            // checkBoxRequireLowerCase
            // 
            this.checkBoxRequireLowerCase.AutoSize = true;
            this.checkBoxRequireLowerCase.Location = new System.Drawing.Point(140, 145);
            this.checkBoxRequireLowerCase.Name = "checkBoxRequireLowerCase";
            this.checkBoxRequireLowerCase.Size = new System.Drawing.Size(124, 19);
            this.checkBoxRequireLowerCase.TabIndex = 8;
            this.checkBoxRequireLowerCase.Text = "Require lower case";
            this.checkBoxRequireLowerCase.UseVisualStyleBackColor = true;
            this.checkBoxRequireLowerCase.CheckedChanged += new System.EventHandler(this.checkBoxRequireLowerCase_CheckedChanged);
            // 
            // checkBoxRequireNonAlphaNumeric
            // 
            this.checkBoxRequireNonAlphaNumeric.AutoSize = true;
            this.checkBoxRequireNonAlphaNumeric.Location = new System.Drawing.Point(140, 165);
            this.checkBoxRequireNonAlphaNumeric.Name = "checkBoxRequireNonAlphaNumeric";
            this.checkBoxRequireNonAlphaNumeric.Size = new System.Drawing.Size(169, 19);
            this.checkBoxRequireNonAlphaNumeric.TabIndex = 9;
            this.checkBoxRequireNonAlphaNumeric.Text = "Require non alpha numeric";
            this.checkBoxRequireNonAlphaNumeric.UseVisualStyleBackColor = true;
            this.checkBoxRequireNonAlphaNumeric.CheckedChanged += new System.EventHandler(this.checkBoxRequireNonAlphaNumeric_CheckedChanged);
            // 
            // checkBoxRequireUpperCase
            // 
            this.checkBoxRequireUpperCase.AutoSize = true;
            this.checkBoxRequireUpperCase.Location = new System.Drawing.Point(140, 185);
            this.checkBoxRequireUpperCase.Name = "checkBoxRequireUpperCase";
            this.checkBoxRequireUpperCase.Size = new System.Drawing.Size(126, 19);
            this.checkBoxRequireUpperCase.TabIndex = 10;
            this.checkBoxRequireUpperCase.Text = "Require upper case";
            this.checkBoxRequireUpperCase.UseVisualStyleBackColor = true;
            this.checkBoxRequireUpperCase.CheckedChanged += new System.EventHandler(this.checkBoxRequireUpperCase_CheckedChanged);
            // 
            // pnlOptions
            // 
            this.pnlOptions.Controls.Add(this.lblGeneratedPasswordCopiedToClipboardMsg);
            this.pnlOptions.Controls.Add(this.btnCopyPasswordToClipboard);
            this.pnlOptions.Controls.Add(this.lblAllowedNonAlphaNumericSymbolsErrorMsg);
            this.pnlOptions.Controls.Add(this.btnResetAllowedNonAlphaNumericChars);
            this.pnlOptions.Controls.Add(this.lblAllowedNonAlphaNumericChars);
            this.pnlOptions.Controls.Add(this.txtAllowedNonAlphaNumericSymbols);
            this.pnlOptions.Controls.Add(this.lblRequiredUniqueCharsErrorMsg);
            this.pnlOptions.Controls.Add(this.lblRequiredLengthErrorMsg);
            this.pnlOptions.Controls.Add(this.lblMaxLengthErrorMsg);
            this.pnlOptions.Controls.Add(this.btnShowGeneratedPassword);
            this.pnlOptions.Controls.Add(this.btnGeneratePassword);
            this.pnlOptions.Controls.Add(this.lblMaxLength);
            this.pnlOptions.Controls.Add(this.checkBoxRequireUpperCase);
            this.pnlOptions.Controls.Add(this.nrUpDownMaxLength);
            this.pnlOptions.Controls.Add(this.checkBoxRequireNonAlphaNumeric);
            this.pnlOptions.Controls.Add(this.lblRequiredLength);
            this.pnlOptions.Controls.Add(this.checkBoxRequireLowerCase);
            this.pnlOptions.Controls.Add(this.nrUpDownRequiredLength);
            this.pnlOptions.Controls.Add(this.checkBoxRequireDigit);
            this.pnlOptions.Controls.Add(this.lblRequiredUniqueChars);
            this.pnlOptions.Controls.Add(this.nrUpDownRequiredUniqueChars);
            this.pnlOptions.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlOptions.Location = new System.Drawing.Point(0, 0);
            this.pnlOptions.Name = "pnlOptions";
            this.pnlOptions.Size = new System.Drawing.Size(955, 234);
            this.pnlOptions.TabIndex = 11;
            // 
            // lblGeneratedPasswordCopiedToClipboardMsg
            // 
            this.lblGeneratedPasswordCopiedToClipboardMsg.AutoSize = true;
            this.lblGeneratedPasswordCopiedToClipboardMsg.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblGeneratedPasswordCopiedToClipboardMsg.ForeColor = System.Drawing.Color.Green;
            this.lblGeneratedPasswordCopiedToClipboardMsg.Location = new System.Drawing.Point(238, 212);
            this.lblGeneratedPasswordCopiedToClipboardMsg.Name = "lblGeneratedPasswordCopiedToClipboardMsg";
            this.lblGeneratedPasswordCopiedToClipboardMsg.Size = new System.Drawing.Size(305, 15);
            this.lblGeneratedPasswordCopiedToClipboardMsg.TabIndex = 20;
            this.lblGeneratedPasswordCopiedToClipboardMsg.Text = "The generated password has been copied to clipboard";
            // 
            // btnCopyPasswordToClipboard
            // 
            this.btnCopyPasswordToClipboard.Location = new System.Drawing.Point(117, 208);
            this.btnCopyPasswordToClipboard.Name = "btnCopyPasswordToClipboard";
            this.btnCopyPasswordToClipboard.Size = new System.Drawing.Size(115, 23);
            this.btnCopyPasswordToClipboard.TabIndex = 19;
            this.btnCopyPasswordToClipboard.Text = "Copy To Clipboard";
            this.btnCopyPasswordToClipboard.UseVisualStyleBackColor = true;
            this.btnCopyPasswordToClipboard.Click += new System.EventHandler(this.btnCopyPasswordToClipboard_Click);
            // 
            // lblAllowedNonAlphaNumericSymbolsErrorMsg
            // 
            this.lblAllowedNonAlphaNumericSymbolsErrorMsg.AutoSize = true;
            this.lblAllowedNonAlphaNumericSymbolsErrorMsg.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblAllowedNonAlphaNumericSymbolsErrorMsg.ForeColor = System.Drawing.Color.OrangeRed;
            this.lblAllowedNonAlphaNumericSymbolsErrorMsg.Location = new System.Drawing.Point(208, 108);
            this.lblAllowedNonAlphaNumericSymbolsErrorMsg.Name = "lblAllowedNonAlphaNumericSymbolsErrorMsg";
            this.lblAllowedNonAlphaNumericSymbolsErrorMsg.Size = new System.Drawing.Size(505, 15);
            this.lblAllowedNonAlphaNumericSymbolsErrorMsg.TabIndex = 18;
            this.lblAllowedNonAlphaNumericSymbolsErrorMsg.Text = "The list of allowed non alpha numeric symbols must not contain duplicates or whit" +
    "e spaces";
            // 
            // btnResetAllowedNonAlphaNumericChars
            // 
            this.btnResetAllowedNonAlphaNumericChars.Location = new System.Drawing.Point(877, 83);
            this.btnResetAllowedNonAlphaNumericChars.Name = "btnResetAllowedNonAlphaNumericChars";
            this.btnResetAllowedNonAlphaNumericChars.Size = new System.Drawing.Size(75, 23);
            this.btnResetAllowedNonAlphaNumericChars.TabIndex = 17;
            this.btnResetAllowedNonAlphaNumericChars.Text = "Reset";
            this.btnResetAllowedNonAlphaNumericChars.UseVisualStyleBackColor = true;
            this.btnResetAllowedNonAlphaNumericChars.Click += new System.EventHandler(this.btnResetAllowedNonAlphaNumericChars_Click);
            // 
            // lblAllowedNonAlphaNumericChars
            // 
            this.lblAllowedNonAlphaNumericChars.AutoSize = true;
            this.lblAllowedNonAlphaNumericChars.Location = new System.Drawing.Point(10, 87);
            this.lblAllowedNonAlphaNumericChars.Name = "lblAllowedNonAlphaNumericChars";
            this.lblAllowedNonAlphaNumericChars.Size = new System.Drawing.Size(200, 15);
            this.lblAllowedNonAlphaNumericChars.TabIndex = 13;
            this.lblAllowedNonAlphaNumericChars.Text = "Allowed non alpha numeric symbols";
            // 
            // txtAllowedNonAlphaNumericSymbols
            // 
            this.txtAllowedNonAlphaNumericSymbols.Font = new System.Drawing.Font("Consolas", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtAllowedNonAlphaNumericSymbols.Location = new System.Drawing.Point(211, 83);
            this.txtAllowedNonAlphaNumericSymbols.Name = "txtAllowedNonAlphaNumericSymbols";
            this.txtAllowedNonAlphaNumericSymbols.Size = new System.Drawing.Size(664, 22);
            this.txtAllowedNonAlphaNumericSymbols.TabIndex = 16;
            this.txtAllowedNonAlphaNumericSymbols.Text = "!@#$%^&*()_-+=[{]};:<>|./?";
            this.txtAllowedNonAlphaNumericSymbols.TextChanged += new System.EventHandler(this.txtAllowedNonAlphaNumericSymbols_TextChanged);
            // 
            // lblRequiredUniqueCharsErrorMsg
            // 
            this.lblRequiredUniqueCharsErrorMsg.AutoSize = true;
            this.lblRequiredUniqueCharsErrorMsg.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblRequiredUniqueCharsErrorMsg.ForeColor = System.Drawing.Color.OrangeRed;
            this.lblRequiredUniqueCharsErrorMsg.Location = new System.Drawing.Point(267, 59);
            this.lblRequiredUniqueCharsErrorMsg.Name = "lblRequiredUniqueCharsErrorMsg";
            this.lblRequiredUniqueCharsErrorMsg.Size = new System.Drawing.Size(562, 15);
            this.lblRequiredUniqueCharsErrorMsg.TabIndex = 15;
            this.lblRequiredUniqueCharsErrorMsg.Text = "Required unique chars count must be between 0 and 87, according to the rest of th" +
    "e chosen options";
            // 
            // lblRequiredLengthErrorMsg
            // 
            this.lblRequiredLengthErrorMsg.AutoSize = true;
            this.lblRequiredLengthErrorMsg.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblRequiredLengthErrorMsg.ForeColor = System.Drawing.Color.OrangeRed;
            this.lblRequiredLengthErrorMsg.Location = new System.Drawing.Point(267, 33);
            this.lblRequiredLengthErrorMsg.Name = "lblRequiredLengthErrorMsg";
            this.lblRequiredLengthErrorMsg.Size = new System.Drawing.Size(310, 15);
            this.lblRequiredLengthErrorMsg.TabIndex = 14;
            this.lblRequiredLengthErrorMsg.Text = "Required password length must be between 4 and 128";
            // 
            // lblMaxLengthErrorMsg
            // 
            this.lblMaxLengthErrorMsg.AutoSize = true;
            this.lblMaxLengthErrorMsg.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblMaxLengthErrorMsg.ForeColor = System.Drawing.Color.OrangeRed;
            this.lblMaxLengthErrorMsg.Location = new System.Drawing.Point(267, 9);
            this.lblMaxLengthErrorMsg.Name = "lblMaxLengthErrorMsg";
            this.lblMaxLengthErrorMsg.Size = new System.Drawing.Size(283, 15);
            this.lblMaxLengthErrorMsg.TabIndex = 13;
            this.lblMaxLengthErrorMsg.Text = "Max password length must be between 4 and 128";
            // 
            // btnShowGeneratedPassword
            // 
            this.btnShowGeneratedPassword.Location = new System.Drawing.Point(72, 208);
            this.btnShowGeneratedPassword.Name = "btnShowGeneratedPassword";
            this.btnShowGeneratedPassword.Size = new System.Drawing.Size(44, 23);
            this.btnShowGeneratedPassword.TabIndex = 12;
            this.btnShowGeneratedPassword.Text = "Show";
            this.btnShowGeneratedPassword.UseVisualStyleBackColor = true;
            // 
            // btnGeneratePassword
            // 
            this.btnGeneratePassword.Location = new System.Drawing.Point(9, 208);
            this.btnGeneratePassword.Name = "btnGeneratePassword";
            this.btnGeneratePassword.Size = new System.Drawing.Size(62, 23);
            this.btnGeneratePassword.TabIndex = 11;
            this.btnGeneratePassword.Text = "Generate";
            this.btnGeneratePassword.UseVisualStyleBackColor = true;
            this.btnGeneratePassword.Click += new System.EventHandler(this.btnGeneratePassword_Click);
            // 
            // pnlGeneratedPassword
            // 
            this.pnlGeneratedPassword.Controls.Add(this.txtGeneratedPassword);
            this.pnlGeneratedPassword.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlGeneratedPassword.Location = new System.Drawing.Point(0, 234);
            this.pnlGeneratedPassword.Name = "pnlGeneratedPassword";
            this.pnlGeneratedPassword.Size = new System.Drawing.Size(955, 27);
            this.pnlGeneratedPassword.TabIndex = 12;
            // 
            // txtGeneratedPassword
            // 
            this.txtGeneratedPassword.Dock = System.Windows.Forms.DockStyle.Top;
            this.txtGeneratedPassword.Location = new System.Drawing.Point(0, 0);
            this.txtGeneratedPassword.Name = "txtGeneratedPassword";
            this.txtGeneratedPassword.ReadOnly = true;
            this.txtGeneratedPassword.Size = new System.Drawing.Size(955, 23);
            this.txtGeneratedPassword.TabIndex = 0;
            this.txtGeneratedPassword.UseSystemPasswordChar = true;
            // 
            // PasswordGeneratorForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(955, 450);
            this.Controls.Add(this.pnlGeneratedPassword);
            this.Controls.Add(this.pnlOptions);
            this.Name = "PasswordGeneratorForm";
            this.Text = "Password Generator";
            ((System.ComponentModel.ISupportInitialize)(this.nrUpDownMaxLength)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.nrUpDownRequiredLength)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.nrUpDownRequiredUniqueChars)).EndInit();
            this.pnlOptions.ResumeLayout(false);
            this.pnlOptions.PerformLayout();
            this.pnlGeneratedPassword.ResumeLayout(false);
            this.pnlGeneratedPassword.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Label lblMaxLength;
        private System.Windows.Forms.NumericUpDown nrUpDownMaxLength;
        private System.Windows.Forms.Label lblRequiredLength;
        private System.Windows.Forms.NumericUpDown nrUpDownRequiredLength;
        private System.Windows.Forms.Label lblRequiredUniqueChars;
        private System.Windows.Forms.NumericUpDown nrUpDownRequiredUniqueChars;
        private System.Windows.Forms.CheckBox checkBoxRequireDigit;
        private System.Windows.Forms.CheckBox checkBoxRequireLowerCase;
        private System.Windows.Forms.CheckBox checkBoxRequireNonAlphaNumeric;
        private System.Windows.Forms.CheckBox checkBoxRequireUpperCase;
        private System.Windows.Forms.Panel pnlOptions;
        private System.Windows.Forms.Button btnGeneratePassword;
        private System.Windows.Forms.Panel pnlGeneratedPassword;
        private System.Windows.Forms.TextBox txtGeneratedPassword;
        private System.Windows.Forms.Button btnShowGeneratedPassword;
        private System.Windows.Forms.Label lblMaxLengthErrorMsg;
        private System.Windows.Forms.Label lblRequiredLengthErrorMsg;
        private System.Windows.Forms.Label lblRequiredUniqueCharsErrorMsg;
        private System.Windows.Forms.TextBox txtAllowedNonAlphaNumericSymbols;
        private System.Windows.Forms.Label lblAllowedNonAlphaNumericChars;
        private System.Windows.Forms.Button btnResetAllowedNonAlphaNumericChars;
        private System.Windows.Forms.Label lblAllowedNonAlphaNumericSymbolsErrorMsg;
        private System.Windows.Forms.Button btnCopyPasswordToClipboard;
        private System.Windows.Forms.Label lblGeneratedPasswordCopiedToClipboardMsg;
    }
}