
namespace SimplePasswordTool.UC
{
    partial class CreatePasswordUC
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

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.pnlBtnCreatePasswordAction = new System.Windows.Forms.Panel();
            this.btnCreatePasswordCancel = new System.Windows.Forms.Button();
            this.btnCreatePasswordSave = new System.Windows.Forms.Button();
            this.pnlCreatePasswordMsg = new System.Windows.Forms.Panel();
            this.lblPasswordsMatchMsg = new System.Windows.Forms.Label();
            this.lblCreatePasswordErrorMsg = new System.Windows.Forms.Label();
            this.pnlConfirmCreatePassword = new System.Windows.Forms.Panel();
            this.txtConfirmCreatePassword = new System.Windows.Forms.TextBox();
            this.pnlLblConfirmCreatePassword = new System.Windows.Forms.Panel();
            this.btnShowConfirmCreatePassword = new System.Windows.Forms.Button();
            this.lblConfirmCreatePassword = new System.Windows.Forms.Label();
            this.pnlTxtCreatePassword = new System.Windows.Forms.Panel();
            this.txtCreatePassword = new System.Windows.Forms.TextBox();
            this.pnlLblCreatePassword = new System.Windows.Forms.Panel();
            this.lblGenerateRandomPassword = new System.Windows.Forms.Label();
            this.btnGenerateRandomPassword = new System.Windows.Forms.Button();
            this.btnShowCreatePassword = new System.Windows.Forms.Button();
            this.lblCreatePassword = new System.Windows.Forms.Label();
            this.lblPasswordName = new System.Windows.Forms.Label();
            this.txtPasswordName = new System.Windows.Forms.TextBox();
            this.pnlPasswordName = new System.Windows.Forms.Panel();
            this.pnlBtnCreatePasswordAction.SuspendLayout();
            this.pnlCreatePasswordMsg.SuspendLayout();
            this.pnlConfirmCreatePassword.SuspendLayout();
            this.pnlLblConfirmCreatePassword.SuspendLayout();
            this.pnlTxtCreatePassword.SuspendLayout();
            this.pnlLblCreatePassword.SuspendLayout();
            this.pnlPasswordName.SuspendLayout();
            this.SuspendLayout();
            // 
            // pnlBtnCreatePasswordAction
            // 
            this.pnlBtnCreatePasswordAction.Controls.Add(this.btnCreatePasswordCancel);
            this.pnlBtnCreatePasswordAction.Controls.Add(this.btnCreatePasswordSave);
            this.pnlBtnCreatePasswordAction.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlBtnCreatePasswordAction.Location = new System.Drawing.Point(0, 156);
            this.pnlBtnCreatePasswordAction.Name = "pnlBtnCreatePasswordAction";
            this.pnlBtnCreatePasswordAction.Padding = new System.Windows.Forms.Padding(5, 0, 5, 0);
            this.pnlBtnCreatePasswordAction.Size = new System.Drawing.Size(636, 23);
            this.pnlBtnCreatePasswordAction.TabIndex = 9;
            // 
            // btnCreatePasswordCancel
            // 
            this.btnCreatePasswordCancel.Dock = System.Windows.Forms.DockStyle.Right;
            this.btnCreatePasswordCancel.Location = new System.Drawing.Point(577, 0);
            this.btnCreatePasswordCancel.Name = "btnCreatePasswordCancel";
            this.btnCreatePasswordCancel.Size = new System.Drawing.Size(54, 23);
            this.btnCreatePasswordCancel.TabIndex = 10;
            this.btnCreatePasswordCancel.Text = "Cancel";
            this.btnCreatePasswordCancel.UseVisualStyleBackColor = true;
            this.btnCreatePasswordCancel.Click += new System.EventHandler(this.BtnCreatePasswordCancel_Click);
            // 
            // btnCreatePasswordSave
            // 
            this.btnCreatePasswordSave.Dock = System.Windows.Forms.DockStyle.Left;
            this.btnCreatePasswordSave.Location = new System.Drawing.Point(5, 0);
            this.btnCreatePasswordSave.Name = "btnCreatePasswordSave";
            this.btnCreatePasswordSave.Size = new System.Drawing.Size(50, 23);
            this.btnCreatePasswordSave.TabIndex = 8;
            this.btnCreatePasswordSave.Text = "Save";
            this.btnCreatePasswordSave.UseVisualStyleBackColor = true;
            this.btnCreatePasswordSave.Click += new System.EventHandler(this.BtnCreatePasswordSave_Click);
            // 
            // pnlCreatePasswordMsg
            // 
            this.pnlCreatePasswordMsg.Controls.Add(this.lblPasswordsMatchMsg);
            this.pnlCreatePasswordMsg.Controls.Add(this.lblCreatePasswordErrorMsg);
            this.pnlCreatePasswordMsg.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlCreatePasswordMsg.Location = new System.Drawing.Point(0, 131);
            this.pnlCreatePasswordMsg.Name = "pnlCreatePasswordMsg";
            this.pnlCreatePasswordMsg.Padding = new System.Windows.Forms.Padding(5, 5, 5, 1);
            this.pnlCreatePasswordMsg.Size = new System.Drawing.Size(636, 25);
            this.pnlCreatePasswordMsg.TabIndex = 7;
            this.pnlCreatePasswordMsg.TabStop = true;
            // 
            // lblPasswordsMatchMsg
            // 
            this.lblPasswordsMatchMsg.AutoSize = true;
            this.lblPasswordsMatchMsg.Dock = System.Windows.Forms.DockStyle.Top;
            this.lblPasswordsMatchMsg.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblPasswordsMatchMsg.ForeColor = System.Drawing.Color.Green;
            this.lblPasswordsMatchMsg.Location = new System.Drawing.Point(5, 20);
            this.lblPasswordsMatchMsg.Name = "lblPasswordsMatchMsg";
            this.lblPasswordsMatchMsg.Size = new System.Drawing.Size(102, 15);
            this.lblPasswordsMatchMsg.TabIndex = 2;
            this.lblPasswordsMatchMsg.Text = "Passwords match";
            // 
            // lblCreatePasswordErrorMsg
            // 
            this.lblCreatePasswordErrorMsg.AutoSize = true;
            this.lblCreatePasswordErrorMsg.Dock = System.Windows.Forms.DockStyle.Top;
            this.lblCreatePasswordErrorMsg.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblCreatePasswordErrorMsg.ForeColor = System.Drawing.Color.OrangeRed;
            this.lblCreatePasswordErrorMsg.Location = new System.Drawing.Point(5, 5);
            this.lblCreatePasswordErrorMsg.Name = "lblCreatePasswordErrorMsg";
            this.lblCreatePasswordErrorMsg.Size = new System.Drawing.Size(134, 15);
            this.lblCreatePasswordErrorMsg.TabIndex = 3;
            this.lblCreatePasswordErrorMsg.Text = "Passwords don\'t match";
            // 
            // pnlConfirmCreatePassword
            // 
            this.pnlConfirmCreatePassword.Controls.Add(this.txtConfirmCreatePassword);
            this.pnlConfirmCreatePassword.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlConfirmCreatePassword.Location = new System.Drawing.Point(0, 106);
            this.pnlConfirmCreatePassword.Name = "pnlConfirmCreatePassword";
            this.pnlConfirmCreatePassword.Padding = new System.Windows.Forms.Padding(5, 1, 5, 1);
            this.pnlConfirmCreatePassword.Size = new System.Drawing.Size(636, 25);
            this.pnlConfirmCreatePassword.TabIndex = 6;
            // 
            // txtConfirmCreatePassword
            // 
            this.txtConfirmCreatePassword.Dock = System.Windows.Forms.DockStyle.Top;
            this.txtConfirmCreatePassword.Font = new System.Drawing.Font("Consolas", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtConfirmCreatePassword.Location = new System.Drawing.Point(5, 1);
            this.txtConfirmCreatePassword.MaxLength = 128;
            this.txtConfirmCreatePassword.Name = "txtConfirmCreatePassword";
            this.txtConfirmCreatePassword.Size = new System.Drawing.Size(626, 22);
            this.txtConfirmCreatePassword.TabIndex = 2;
            this.txtConfirmCreatePassword.TextChanged += new System.EventHandler(this.TxtConfirmCreatePassword_TextChanged);
            // 
            // pnlLblConfirmCreatePassword
            // 
            this.pnlLblConfirmCreatePassword.Controls.Add(this.btnShowConfirmCreatePassword);
            this.pnlLblConfirmCreatePassword.Controls.Add(this.lblConfirmCreatePassword);
            this.pnlLblConfirmCreatePassword.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlLblConfirmCreatePassword.Location = new System.Drawing.Point(0, 79);
            this.pnlLblConfirmCreatePassword.Name = "pnlLblConfirmCreatePassword";
            this.pnlLblConfirmCreatePassword.Padding = new System.Windows.Forms.Padding(5);
            this.pnlLblConfirmCreatePassword.Size = new System.Drawing.Size(636, 27);
            this.pnlLblConfirmCreatePassword.TabIndex = 5;
            // 
            // btnShowConfirmCreatePassword
            // 
            this.btnShowConfirmCreatePassword.Location = new System.Drawing.Point(150, 2);
            this.btnShowConfirmCreatePassword.Name = "btnShowConfirmCreatePassword";
            this.btnShowConfirmCreatePassword.Size = new System.Drawing.Size(50, 23);
            this.btnShowConfirmCreatePassword.TabIndex = 7;
            this.btnShowConfirmCreatePassword.Text = "Show";
            this.btnShowConfirmCreatePassword.UseVisualStyleBackColor = true;
            // 
            // lblConfirmCreatePassword
            // 
            this.lblConfirmCreatePassword.AutoSize = true;
            this.lblConfirmCreatePassword.Dock = System.Windows.Forms.DockStyle.Top;
            this.lblConfirmCreatePassword.Location = new System.Drawing.Point(5, 5);
            this.lblConfirmCreatePassword.Name = "lblConfirmCreatePassword";
            this.lblConfirmCreatePassword.Size = new System.Drawing.Size(131, 15);
            this.lblConfirmCreatePassword.TabIndex = 0;
            this.lblConfirmCreatePassword.Text = "Confirm your password";
            // 
            // pnlTxtCreatePassword
            // 
            this.pnlTxtCreatePassword.Controls.Add(this.txtCreatePassword);
            this.pnlTxtCreatePassword.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlTxtCreatePassword.Location = new System.Drawing.Point(0, 55);
            this.pnlTxtCreatePassword.Name = "pnlTxtCreatePassword";
            this.pnlTxtCreatePassword.Padding = new System.Windows.Forms.Padding(5, 1, 5, 1);
            this.pnlTxtCreatePassword.Size = new System.Drawing.Size(636, 24);
            this.pnlTxtCreatePassword.TabIndex = 4;
            // 
            // txtCreatePassword
            // 
            this.txtCreatePassword.Dock = System.Windows.Forms.DockStyle.Top;
            this.txtCreatePassword.Font = new System.Drawing.Font("Consolas", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtCreatePassword.Location = new System.Drawing.Point(5, 1);
            this.txtCreatePassword.MaxLength = 128;
            this.txtCreatePassword.Name = "txtCreatePassword";
            this.txtCreatePassword.Size = new System.Drawing.Size(626, 22);
            this.txtCreatePassword.TabIndex = 2;
            this.txtCreatePassword.TextChanged += new System.EventHandler(this.TxtCreatePassword_TextChanged);
            // 
            // pnlLblCreatePassword
            // 
            this.pnlLblCreatePassword.Controls.Add(this.lblGenerateRandomPassword);
            this.pnlLblCreatePassword.Controls.Add(this.btnGenerateRandomPassword);
            this.pnlLblCreatePassword.Controls.Add(this.btnShowCreatePassword);
            this.pnlLblCreatePassword.Controls.Add(this.lblCreatePassword);
            this.pnlLblCreatePassword.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlLblCreatePassword.Location = new System.Drawing.Point(0, 28);
            this.pnlLblCreatePassword.Name = "pnlLblCreatePassword";
            this.pnlLblCreatePassword.Padding = new System.Windows.Forms.Padding(5);
            this.pnlLblCreatePassword.Size = new System.Drawing.Size(636, 27);
            this.pnlLblCreatePassword.TabIndex = 2;
            // 
            // lblGenerateRandomPassword
            // 
            this.lblGenerateRandomPassword.AutoSize = true;
            this.lblGenerateRandomPassword.Location = new System.Drawing.Point(409, 6);
            this.lblGenerateRandomPassword.Name = "lblGenerateRandomPassword";
            this.lblGenerateRandomPassword.Size = new System.Drawing.Size(152, 15);
            this.lblGenerateRandomPassword.TabIndex = 10;
            this.lblGenerateRandomPassword.Text = "Generate random password";
            // 
            // btnGenerateRandomPassword
            // 
            this.btnGenerateRandomPassword.Location = new System.Drawing.Point(567, 2);
            this.btnGenerateRandomPassword.Name = "btnGenerateRandomPassword";
            this.btnGenerateRandomPassword.Size = new System.Drawing.Size(64, 23);
            this.btnGenerateRandomPassword.TabIndex = 8;
            this.btnGenerateRandomPassword.Text = "Generate";
            this.btnGenerateRandomPassword.UseVisualStyleBackColor = true;
            this.btnGenerateRandomPassword.Click += new System.EventHandler(this.BtnGenerateRandomPassword_Click);
            // 
            // btnShowCreatePassword
            // 
            this.btnShowCreatePassword.Location = new System.Drawing.Point(150, 2);
            this.btnShowCreatePassword.Name = "btnShowCreatePassword";
            this.btnShowCreatePassword.Size = new System.Drawing.Size(50, 23);
            this.btnShowCreatePassword.TabIndex = 7;
            this.btnShowCreatePassword.Text = "Show";
            this.btnShowCreatePassword.UseVisualStyleBackColor = true;
            // 
            // lblCreatePassword
            // 
            this.lblCreatePassword.AutoSize = true;
            this.lblCreatePassword.Dock = System.Windows.Forms.DockStyle.Top;
            this.lblCreatePassword.Location = new System.Drawing.Point(5, 5);
            this.lblCreatePassword.Name = "lblCreatePassword";
            this.lblCreatePassword.Size = new System.Drawing.Size(111, 15);
            this.lblCreatePassword.TabIndex = 0;
            this.lblCreatePassword.Text = "Type your password";
            // 
            // lblPasswordName
            // 
            this.lblPasswordName.AutoSize = true;
            this.lblPasswordName.Location = new System.Drawing.Point(5, 6);
            this.lblPasswordName.Name = "lblPasswordName";
            this.lblPasswordName.Size = new System.Drawing.Size(119, 15);
            this.lblPasswordName.TabIndex = 10;
            this.lblPasswordName.Text = "Name your password";
            // 
            // txtPasswordName
            // 
            this.txtPasswordName.Location = new System.Drawing.Point(130, 3);
            this.txtPasswordName.Name = "txtPasswordName";
            this.txtPasswordName.Size = new System.Drawing.Size(501, 23);
            this.txtPasswordName.TabIndex = 11;
            this.txtPasswordName.TextChanged += new System.EventHandler(this.TxtPasswordName_TextChanged);
            // 
            // pnlPasswordName
            // 
            this.pnlPasswordName.Controls.Add(this.lblPasswordName);
            this.pnlPasswordName.Controls.Add(this.txtPasswordName);
            this.pnlPasswordName.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlPasswordName.Location = new System.Drawing.Point(0, 0);
            this.pnlPasswordName.Name = "pnlPasswordName";
            this.pnlPasswordName.Size = new System.Drawing.Size(636, 28);
            this.pnlPasswordName.TabIndex = 1;
            // 
            // CreatePasswordUC
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.pnlBtnCreatePasswordAction);
            this.Controls.Add(this.pnlCreatePasswordMsg);
            this.Controls.Add(this.pnlConfirmCreatePassword);
            this.Controls.Add(this.pnlLblConfirmCreatePassword);
            this.Controls.Add(this.pnlTxtCreatePassword);
            this.Controls.Add(this.pnlLblCreatePassword);
            this.Controls.Add(this.pnlPasswordName);
            this.Name = "CreatePasswordUC";
            this.Size = new System.Drawing.Size(636, 181);
            this.pnlBtnCreatePasswordAction.ResumeLayout(false);
            this.pnlCreatePasswordMsg.ResumeLayout(false);
            this.pnlCreatePasswordMsg.PerformLayout();
            this.pnlConfirmCreatePassword.ResumeLayout(false);
            this.pnlConfirmCreatePassword.PerformLayout();
            this.pnlLblConfirmCreatePassword.ResumeLayout(false);
            this.pnlLblConfirmCreatePassword.PerformLayout();
            this.pnlTxtCreatePassword.ResumeLayout(false);
            this.pnlTxtCreatePassword.PerformLayout();
            this.pnlLblCreatePassword.ResumeLayout(false);
            this.pnlLblCreatePassword.PerformLayout();
            this.pnlPasswordName.ResumeLayout(false);
            this.pnlPasswordName.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel pnlBtnCreatePasswordAction;
        private System.Windows.Forms.Button btnCreatePasswordCancel;
        private System.Windows.Forms.Button btnCreatePasswordSave;
        private System.Windows.Forms.Panel pnlCreatePasswordMsg;
        private System.Windows.Forms.Label lblPasswordsMatchMsg;
        private System.Windows.Forms.Label lblCreatePasswordErrorMsg;
        private System.Windows.Forms.Panel pnlConfirmCreatePassword;
        private System.Windows.Forms.TextBox txtConfirmCreatePassword;
        private System.Windows.Forms.Panel pnlLblConfirmCreatePassword;
        private System.Windows.Forms.Button btnShowConfirmCreatePassword;
        private System.Windows.Forms.Label lblConfirmCreatePassword;
        private System.Windows.Forms.Panel pnlTxtCreatePassword;
        private System.Windows.Forms.TextBox txtCreatePassword;
        private System.Windows.Forms.Panel pnlLblCreatePassword;
        private System.Windows.Forms.Label lblGenerateRandomPassword;
        private System.Windows.Forms.Button btnGenerateRandomPassword;
        private System.Windows.Forms.Button btnShowCreatePassword;
        private System.Windows.Forms.Label lblCreatePassword;
        private System.Windows.Forms.Label lblPasswordName;
        private System.Windows.Forms.TextBox txtPasswordName;
        private System.Windows.Forms.Panel pnlPasswordName;
    }
}
