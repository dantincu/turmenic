
namespace SimplePasswordTool
{
    partial class CheckPasswordUC
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
            this.pnlShowPassword = new System.Windows.Forms.Panel();
            this.pnlTxtShowPassword = new System.Windows.Forms.Panel();
            this.txtActualPassword = new System.Windows.Forms.TextBox();
            this.pnlLblShowPassword = new System.Windows.Forms.Panel();
            this.btnDeletePasswordValue = new System.Windows.Forms.Button();
            this.lblDeletePasswordValue = new System.Windows.Forms.Label();
            this.btnShowActualPassword = new System.Windows.Forms.Button();
            this.lblShowPassword = new System.Windows.Forms.Label();
            this.pnlCheckPasswordMsg = new System.Windows.Forms.Panel();
            this.lblCorrectPasswordMsg = new System.Windows.Forms.Label();
            this.lblIncorrectPasswordMsg = new System.Windows.Forms.Label();
            this.pnlTypeCheckPassword = new System.Windows.Forms.Panel();
            this.txtTypedPassword = new System.Windows.Forms.TextBox();
            this.topPnlCheckPassword = new System.Windows.Forms.Panel();
            this.btnShowTypedPassword = new System.Windows.Forms.Button();
            this.lblTypePassword = new System.Windows.Forms.Label();
            this.btnCheckPassword = new System.Windows.Forms.Button();
            this.pnlShowPassword.SuspendLayout();
            this.pnlTxtShowPassword.SuspendLayout();
            this.pnlLblShowPassword.SuspendLayout();
            this.pnlCheckPasswordMsg.SuspendLayout();
            this.pnlTypeCheckPassword.SuspendLayout();
            this.topPnlCheckPassword.SuspendLayout();
            this.SuspendLayout();
            // 
            // pnlShowPassword
            // 
            this.pnlShowPassword.Controls.Add(this.pnlTxtShowPassword);
            this.pnlShowPassword.Controls.Add(this.pnlLblShowPassword);
            this.pnlShowPassword.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlShowPassword.Location = new System.Drawing.Point(0, 76);
            this.pnlShowPassword.Name = "pnlShowPassword";
            this.pnlShowPassword.Padding = new System.Windows.Forms.Padding(5, 1, 5, 5);
            this.pnlShowPassword.Size = new System.Drawing.Size(636, 56);
            this.pnlShowPassword.TabIndex = 7;
            // 
            // pnlTxtShowPassword
            // 
            this.pnlTxtShowPassword.Controls.Add(this.txtActualPassword);
            this.pnlTxtShowPassword.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlTxtShowPassword.Location = new System.Drawing.Point(5, 28);
            this.pnlTxtShowPassword.Name = "pnlTxtShowPassword";
            this.pnlTxtShowPassword.Size = new System.Drawing.Size(626, 24);
            this.pnlTxtShowPassword.TabIndex = 6;
            // 
            // txtActualPassword
            // 
            this.txtActualPassword.Dock = System.Windows.Forms.DockStyle.Top;
            this.txtActualPassword.Font = new System.Drawing.Font("Consolas", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtActualPassword.Location = new System.Drawing.Point(0, 0);
            this.txtActualPassword.MaxLength = 128;
            this.txtActualPassword.Name = "txtActualPassword";
            this.txtActualPassword.PasswordChar = '*';
            this.txtActualPassword.ReadOnly = true;
            this.txtActualPassword.Size = new System.Drawing.Size(626, 22);
            this.txtActualPassword.TabIndex = 4;
            // 
            // pnlLblShowPassword
            // 
            this.pnlLblShowPassword.Controls.Add(this.btnDeletePasswordValue);
            this.pnlLblShowPassword.Controls.Add(this.lblDeletePasswordValue);
            this.pnlLblShowPassword.Controls.Add(this.btnShowActualPassword);
            this.pnlLblShowPassword.Controls.Add(this.lblShowPassword);
            this.pnlLblShowPassword.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlLblShowPassword.Location = new System.Drawing.Point(5, 1);
            this.pnlLblShowPassword.Name = "pnlLblShowPassword";
            this.pnlLblShowPassword.Padding = new System.Windows.Forms.Padding(3);
            this.pnlLblShowPassword.Size = new System.Drawing.Size(626, 27);
            this.pnlLblShowPassword.TabIndex = 8;
            // 
            // btnDeletePasswordValue
            // 
            this.btnDeletePasswordValue.Location = new System.Drawing.Point(571, 2);
            this.btnDeletePasswordValue.Name = "btnDeletePasswordValue";
            this.btnDeletePasswordValue.Size = new System.Drawing.Size(50, 23);
            this.btnDeletePasswordValue.TabIndex = 8;
            this.btnDeletePasswordValue.Text = "Delete";
            this.btnDeletePasswordValue.UseVisualStyleBackColor = true;
            this.btnDeletePasswordValue.Click += new System.EventHandler(this.btnDeletePasswordValue_Click);
            // 
            // lblDeletePasswordValue
            // 
            this.lblDeletePasswordValue.AutoSize = true;
            this.lblDeletePasswordValue.Location = new System.Drawing.Point(254, 6);
            this.lblDeletePasswordValue.Name = "lblDeletePasswordValue";
            this.lblDeletePasswordValue.Size = new System.Drawing.Size(312, 15);
            this.lblDeletePasswordValue.TabIndex = 7;
            this.lblDeletePasswordValue.Text = "Delete the password (and keep only the hash for checkup)";
            // 
            // btnShowActualPassword
            // 
            this.btnShowActualPassword.Location = new System.Drawing.Point(190, 2);
            this.btnShowActualPassword.Name = "btnShowActualPassword";
            this.btnShowActualPassword.Size = new System.Drawing.Size(50, 23);
            this.btnShowActualPassword.TabIndex = 6;
            this.btnShowActualPassword.Text = "Show";
            this.btnShowActualPassword.UseVisualStyleBackColor = true;
            // 
            // lblShowPassword
            // 
            this.lblShowPassword.AutoSize = true;
            this.lblShowPassword.Dock = System.Windows.Forms.DockStyle.Top;
            this.lblShowPassword.Location = new System.Drawing.Point(3, 3);
            this.lblShowPassword.Name = "lblShowPassword";
            this.lblShowPassword.Padding = new System.Windows.Forms.Padding(0, 2, 0, 0);
            this.lblShowPassword.Size = new System.Drawing.Size(187, 17);
            this.lblShowPassword.TabIndex = 5;
            this.lblShowPassword.Text = "Press to show the actual password";
            // 
            // pnlCheckPasswordMsg
            // 
            this.pnlCheckPasswordMsg.Controls.Add(this.lblCorrectPasswordMsg);
            this.pnlCheckPasswordMsg.Controls.Add(this.lblIncorrectPasswordMsg);
            this.pnlCheckPasswordMsg.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlCheckPasswordMsg.Location = new System.Drawing.Point(0, 51);
            this.pnlCheckPasswordMsg.Name = "pnlCheckPasswordMsg";
            this.pnlCheckPasswordMsg.Padding = new System.Windows.Forms.Padding(5, 5, 5, 1);
            this.pnlCheckPasswordMsg.Size = new System.Drawing.Size(636, 25);
            this.pnlCheckPasswordMsg.TabIndex = 6;
            this.pnlCheckPasswordMsg.TabStop = true;
            // 
            // lblCorrectPasswordMsg
            // 
            this.lblCorrectPasswordMsg.AutoSize = true;
            this.lblCorrectPasswordMsg.Dock = System.Windows.Forms.DockStyle.Top;
            this.lblCorrectPasswordMsg.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblCorrectPasswordMsg.ForeColor = System.Drawing.Color.Green;
            this.lblCorrectPasswordMsg.Location = new System.Drawing.Point(5, 20);
            this.lblCorrectPasswordMsg.Name = "lblCorrectPasswordMsg";
            this.lblCorrectPasswordMsg.Size = new System.Drawing.Size(103, 15);
            this.lblCorrectPasswordMsg.TabIndex = 2;
            this.lblCorrectPasswordMsg.Text = "Password correct";
            // 
            // lblIncorrectPasswordMsg
            // 
            this.lblIncorrectPasswordMsg.AutoSize = true;
            this.lblIncorrectPasswordMsg.Dock = System.Windows.Forms.DockStyle.Top;
            this.lblIncorrectPasswordMsg.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblIncorrectPasswordMsg.ForeColor = System.Drawing.Color.OrangeRed;
            this.lblIncorrectPasswordMsg.Location = new System.Drawing.Point(5, 5);
            this.lblIncorrectPasswordMsg.Name = "lblIncorrectPasswordMsg";
            this.lblIncorrectPasswordMsg.Size = new System.Drawing.Size(113, 15);
            this.lblIncorrectPasswordMsg.TabIndex = 3;
            this.lblIncorrectPasswordMsg.Text = "Password incorrect";
            // 
            // pnlTypeCheckPassword
            // 
            this.pnlTypeCheckPassword.Controls.Add(this.txtTypedPassword);
            this.pnlTypeCheckPassword.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlTypeCheckPassword.Location = new System.Drawing.Point(0, 27);
            this.pnlTypeCheckPassword.Name = "pnlTypeCheckPassword";
            this.pnlTypeCheckPassword.Padding = new System.Windows.Forms.Padding(5, 1, 5, 1);
            this.pnlTypeCheckPassword.Size = new System.Drawing.Size(636, 24);
            this.pnlTypeCheckPassword.TabIndex = 3;
            // 
            // txtTypedPassword
            // 
            this.txtTypedPassword.Dock = System.Windows.Forms.DockStyle.Top;
            this.txtTypedPassword.Font = new System.Drawing.Font("Consolas", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtTypedPassword.Location = new System.Drawing.Point(5, 1);
            this.txtTypedPassword.MaxLength = 128;
            this.txtTypedPassword.Name = "txtTypedPassword";
            this.txtTypedPassword.PasswordChar = '*';
            this.txtTypedPassword.Size = new System.Drawing.Size(626, 22);
            this.txtTypedPassword.TabIndex = 2;
            this.txtTypedPassword.TextChanged += new System.EventHandler(this.txtTypedPassword_TextChanged);
            // 
            // topPnlCheckPassword
            // 
            this.topPnlCheckPassword.Controls.Add(this.btnShowTypedPassword);
            this.topPnlCheckPassword.Controls.Add(this.lblTypePassword);
            this.topPnlCheckPassword.Controls.Add(this.btnCheckPassword);
            this.topPnlCheckPassword.Dock = System.Windows.Forms.DockStyle.Top;
            this.topPnlCheckPassword.Location = new System.Drawing.Point(0, 0);
            this.topPnlCheckPassword.Name = "topPnlCheckPassword";
            this.topPnlCheckPassword.Padding = new System.Windows.Forms.Padding(5);
            this.topPnlCheckPassword.Size = new System.Drawing.Size(636, 27);
            this.topPnlCheckPassword.TabIndex = 1;
            // 
            // btnShowTypedPassword
            // 
            this.btnShowTypedPassword.Location = new System.Drawing.Point(389, 2);
            this.btnShowTypedPassword.Name = "btnShowTypedPassword";
            this.btnShowTypedPassword.Size = new System.Drawing.Size(50, 23);
            this.btnShowTypedPassword.TabIndex = 5;
            this.btnShowTypedPassword.Text = "Show";
            this.btnShowTypedPassword.UseVisualStyleBackColor = true;
            // 
            // lblTypePassword
            // 
            this.lblTypePassword.AutoSize = true;
            this.lblTypePassword.Dock = System.Windows.Forms.DockStyle.Top;
            this.lblTypePassword.Location = new System.Drawing.Point(5, 5);
            this.lblTypePassword.Name = "lblTypePassword";
            this.lblTypePassword.Size = new System.Drawing.Size(333, 15);
            this.lblTypePassword.TabIndex = 0;
            this.lblTypePassword.Text = "Type your password bellow to see if you remember it correctly";
            // 
            // btnCheckPassword
            // 
            this.btnCheckPassword.Location = new System.Drawing.Point(339, 2);
            this.btnCheckPassword.Name = "btnCheckPassword";
            this.btnCheckPassword.Size = new System.Drawing.Size(50, 23);
            this.btnCheckPassword.TabIndex = 4;
            this.btnCheckPassword.Text = "Check";
            this.btnCheckPassword.UseVisualStyleBackColor = true;
            this.btnCheckPassword.Click += new System.EventHandler(this.btnCheckPassword_Click);
            // 
            // CheckPasswordUC
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.pnlShowPassword);
            this.Controls.Add(this.pnlCheckPasswordMsg);
            this.Controls.Add(this.pnlTypeCheckPassword);
            this.Controls.Add(this.topPnlCheckPassword);
            this.Name = "CheckPasswordUC";
            this.Size = new System.Drawing.Size(636, 143);
            this.pnlShowPassword.ResumeLayout(false);
            this.pnlTxtShowPassword.ResumeLayout(false);
            this.pnlTxtShowPassword.PerformLayout();
            this.pnlLblShowPassword.ResumeLayout(false);
            this.pnlLblShowPassword.PerformLayout();
            this.pnlCheckPasswordMsg.ResumeLayout(false);
            this.pnlCheckPasswordMsg.PerformLayout();
            this.pnlTypeCheckPassword.ResumeLayout(false);
            this.pnlTypeCheckPassword.PerformLayout();
            this.topPnlCheckPassword.ResumeLayout(false);
            this.topPnlCheckPassword.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel pnlShowPassword;
        private System.Windows.Forms.Panel pnlTxtShowPassword;
        private System.Windows.Forms.TextBox txtActualPassword;
        private System.Windows.Forms.Panel pnlLblShowPassword;
        private System.Windows.Forms.Button btnDeletePasswordValue;
        private System.Windows.Forms.Label lblDeletePasswordValue;
        private System.Windows.Forms.Button btnShowActualPassword;
        private System.Windows.Forms.Label lblShowPassword;
        private System.Windows.Forms.Panel pnlCheckPasswordMsg;
        private System.Windows.Forms.Label lblCorrectPasswordMsg;
        private System.Windows.Forms.Label lblIncorrectPasswordMsg;
        private System.Windows.Forms.Panel pnlTypeCheckPassword;
        private System.Windows.Forms.TextBox txtTypedPassword;
        private System.Windows.Forms.Panel topPnlCheckPassword;
        private System.Windows.Forms.Button btnShowTypedPassword;
        private System.Windows.Forms.Label lblTypePassword;
        private System.Windows.Forms.Button btnCheckPassword;
    }
}
