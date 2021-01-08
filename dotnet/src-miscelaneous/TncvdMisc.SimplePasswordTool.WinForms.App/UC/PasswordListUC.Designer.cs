
namespace SimplePasswordTool.UC
{
    partial class PasswordListUC
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
            this.topPnlPasswordList = new System.Windows.Forms.Panel();
            this.btnSaveOrder = new System.Windows.Forms.Button();
            this.btnMoveListItemToTop = new System.Windows.Forms.Button();
            this.btnMoveListItemUp = new System.Windows.Forms.Button();
            this.lblPasswordList = new System.Windows.Forms.Label();
            this.pnlBtnPasswordListAction = new System.Windows.Forms.Panel();
            this.btnMoveListItemToBottom = new System.Windows.Forms.Button();
            this.btnMoveListItemDown = new System.Windows.Forms.Button();
            this.btnDeletePassword = new System.Windows.Forms.Button();
            this.btnAddNewPassword = new System.Windows.Forms.Button();
            this.listBoxPasswords = new System.Windows.Forms.ListBox();
            this.topPnlPasswordList.SuspendLayout();
            this.pnlBtnPasswordListAction.SuspendLayout();
            this.SuspendLayout();
            // 
            // topPnlPasswordList
            // 
            this.topPnlPasswordList.Controls.Add(this.btnSaveOrder);
            this.topPnlPasswordList.Controls.Add(this.btnMoveListItemToTop);
            this.topPnlPasswordList.Controls.Add(this.btnMoveListItemUp);
            this.topPnlPasswordList.Controls.Add(this.lblPasswordList);
            this.topPnlPasswordList.Dock = System.Windows.Forms.DockStyle.Top;
            this.topPnlPasswordList.Location = new System.Drawing.Point(0, 0);
            this.topPnlPasswordList.Name = "topPnlPasswordList";
            this.topPnlPasswordList.Padding = new System.Windows.Forms.Padding(5);
            this.topPnlPasswordList.Size = new System.Drawing.Size(309, 35);
            this.topPnlPasswordList.TabIndex = 2;
            // 
            // btnSaveOrder
            // 
            this.btnSaveOrder.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.btnSaveOrder.Dock = System.Windows.Forms.DockStyle.Right;
            this.btnSaveOrder.Enabled = false;
            this.btnSaveOrder.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnSaveOrder.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.btnSaveOrder.Location = new System.Drawing.Point(157, 5);
            this.btnSaveOrder.Name = "btnSaveOrder";
            this.btnSaveOrder.Size = new System.Drawing.Size(78, 25);
            this.btnSaveOrder.TabIndex = 9;
            this.btnSaveOrder.Text = "Save Order";
            this.btnSaveOrder.UseVisualStyleBackColor = false;
            this.btnSaveOrder.Click += new System.EventHandler(this.BtnSaveOrder_Click);
            // 
            // btnMoveListItemToTop
            // 
            this.btnMoveListItemToTop.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.btnMoveListItemToTop.Dock = System.Windows.Forms.DockStyle.Left;
            this.btnMoveListItemToTop.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnMoveListItemToTop.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.btnMoveListItemToTop.Location = new System.Drawing.Point(71, 5);
            this.btnMoveListItemToTop.Name = "btnMoveListItemToTop";
            this.btnMoveListItemToTop.Size = new System.Drawing.Size(86, 25);
            this.btnMoveListItemToTop.TabIndex = 8;
            this.btnMoveListItemToTop.Text = "Move To Top";
            this.btnMoveListItemToTop.UseVisualStyleBackColor = false;
            this.btnMoveListItemToTop.Click += new System.EventHandler(this.btnMoveListItemToTop_Click);
            // 
            // btnMoveListItemUp
            // 
            this.btnMoveListItemUp.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.btnMoveListItemUp.Dock = System.Windows.Forms.DockStyle.Right;
            this.btnMoveListItemUp.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnMoveListItemUp.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.btnMoveListItemUp.Location = new System.Drawing.Point(235, 5);
            this.btnMoveListItemUp.Name = "btnMoveListItemUp";
            this.btnMoveListItemUp.Size = new System.Drawing.Size(69, 25);
            this.btnMoveListItemUp.TabIndex = 7;
            this.btnMoveListItemUp.Text = "Move Up";
            this.btnMoveListItemUp.UseVisualStyleBackColor = false;
            this.btnMoveListItemUp.Click += new System.EventHandler(this.btnMoveListItemUp_Click);
            // 
            // lblPasswordList
            // 
            this.lblPasswordList.AutoSize = true;
            this.lblPasswordList.Dock = System.Windows.Forms.DockStyle.Left;
            this.lblPasswordList.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblPasswordList.Location = new System.Drawing.Point(5, 5);
            this.lblPasswordList.Name = "lblPasswordList";
            this.lblPasswordList.Padding = new System.Windows.Forms.Padding(0, 5, 2, 5);
            this.lblPasswordList.Size = new System.Drawing.Size(66, 25);
            this.lblPasswordList.TabIndex = 0;
            this.lblPasswordList.Text = "Passwords";
            // 
            // pnlBtnPasswordListAction
            // 
            this.pnlBtnPasswordListAction.Controls.Add(this.btnMoveListItemToBottom);
            this.pnlBtnPasswordListAction.Controls.Add(this.btnMoveListItemDown);
            this.pnlBtnPasswordListAction.Controls.Add(this.btnDeletePassword);
            this.pnlBtnPasswordListAction.Controls.Add(this.btnAddNewPassword);
            this.pnlBtnPasswordListAction.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.pnlBtnPasswordListAction.Location = new System.Drawing.Point(0, 649);
            this.pnlBtnPasswordListAction.Name = "pnlBtnPasswordListAction";
            this.pnlBtnPasswordListAction.Padding = new System.Windows.Forms.Padding(5);
            this.pnlBtnPasswordListAction.Size = new System.Drawing.Size(309, 35);
            this.pnlBtnPasswordListAction.TabIndex = 3;
            // 
            // btnMoveListItemToBottom
            // 
            this.btnMoveListItemToBottom.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.btnMoveListItemToBottom.Dock = System.Windows.Forms.DockStyle.Left;
            this.btnMoveListItemToBottom.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnMoveListItemToBottom.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.btnMoveListItemToBottom.Location = new System.Drawing.Point(46, 5);
            this.btnMoveListItemToBottom.Name = "btnMoveListItemToBottom";
            this.btnMoveListItemToBottom.Size = new System.Drawing.Size(111, 25);
            this.btnMoveListItemToBottom.TabIndex = 9;
            this.btnMoveListItemToBottom.Text = "Move To Bottom";
            this.btnMoveListItemToBottom.UseVisualStyleBackColor = false;
            this.btnMoveListItemToBottom.Click += new System.EventHandler(this.btnMoveListItemToBottom_Click);
            // 
            // btnMoveListItemDown
            // 
            this.btnMoveListItemDown.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.btnMoveListItemDown.Dock = System.Windows.Forms.DockStyle.Right;
            this.btnMoveListItemDown.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnMoveListItemDown.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.btnMoveListItemDown.Location = new System.Drawing.Point(165, 5);
            this.btnMoveListItemDown.Name = "btnMoveListItemDown";
            this.btnMoveListItemDown.Size = new System.Drawing.Size(85, 25);
            this.btnMoveListItemDown.TabIndex = 8;
            this.btnMoveListItemDown.Text = "Move Down";
            this.btnMoveListItemDown.UseVisualStyleBackColor = false;
            this.btnMoveListItemDown.Click += new System.EventHandler(this.btnMoveListItemDown_Click);
            // 
            // btnDeletePassword
            // 
            this.btnDeletePassword.BackColor = System.Drawing.Color.OrangeRed;
            this.btnDeletePassword.Dock = System.Windows.Forms.DockStyle.Right;
            this.btnDeletePassword.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnDeletePassword.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.btnDeletePassword.Location = new System.Drawing.Point(250, 5);
            this.btnDeletePassword.Name = "btnDeletePassword";
            this.btnDeletePassword.Size = new System.Drawing.Size(54, 25);
            this.btnDeletePassword.TabIndex = 6;
            this.btnDeletePassword.Text = "Delete";
            this.btnDeletePassword.UseVisualStyleBackColor = false;
            this.btnDeletePassword.Click += new System.EventHandler(this.btnDeletePassword_Click);
            // 
            // btnAddNewPassword
            // 
            this.btnAddNewPassword.BackColor = System.Drawing.SystemColors.HotTrack;
            this.btnAddNewPassword.Dock = System.Windows.Forms.DockStyle.Left;
            this.btnAddNewPassword.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnAddNewPassword.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.btnAddNewPassword.Location = new System.Drawing.Point(5, 5);
            this.btnAddNewPassword.Name = "btnAddNewPassword";
            this.btnAddNewPassword.Size = new System.Drawing.Size(41, 25);
            this.btnAddNewPassword.TabIndex = 5;
            this.btnAddNewPassword.Text = "Add";
            this.btnAddNewPassword.UseVisualStyleBackColor = false;
            this.btnAddNewPassword.Click += new System.EventHandler(this.btnAddNewPassword_Click);
            // 
            // listBoxPasswords
            // 
            this.listBoxPasswords.Dock = System.Windows.Forms.DockStyle.Fill;
            this.listBoxPasswords.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.listBoxPasswords.FormattingEnabled = true;
            this.listBoxPasswords.ItemHeight = 15;
            this.listBoxPasswords.Location = new System.Drawing.Point(0, 35);
            this.listBoxPasswords.Name = "listBoxPasswords";
            this.listBoxPasswords.Size = new System.Drawing.Size(309, 614);
            this.listBoxPasswords.TabIndex = 4;
            this.listBoxPasswords.SelectedIndexChanged += new System.EventHandler(this.ListBoxPasswords_SelectedIndexChanged);
            // 
            // PasswordListUC
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.listBoxPasswords);
            this.Controls.Add(this.pnlBtnPasswordListAction);
            this.Controls.Add(this.topPnlPasswordList);
            this.Name = "PasswordListUC";
            this.Size = new System.Drawing.Size(309, 684);
            this.topPnlPasswordList.ResumeLayout(false);
            this.topPnlPasswordList.PerformLayout();
            this.pnlBtnPasswordListAction.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel topPnlPasswordList;
        private System.Windows.Forms.Label lblPasswordList;
        private System.Windows.Forms.Panel pnlBtnPasswordListAction;
        private System.Windows.Forms.Button btnDeletePassword;
        private System.Windows.Forms.Button btnAddNewPassword;
        private System.Windows.Forms.Button btnMoveListItemUp;
        private System.Windows.Forms.Button btnMoveListItemDown;
        private System.Windows.Forms.Button btnMoveListItemToBottom;
        private System.Windows.Forms.Button btnMoveListItemToTop;
        private System.Windows.Forms.ListBox listBoxPasswords;
        private System.Windows.Forms.Button btnSaveOrder;
    }
}
