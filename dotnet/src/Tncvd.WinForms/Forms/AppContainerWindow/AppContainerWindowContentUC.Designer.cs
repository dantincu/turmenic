
using Tncvd.WinForms.Controls;

namespace Tncvd.WinForms.Forms.AppContainerWindow
{
    partial class AppContainerWindowContentUC
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
            this.tabCtrl = new Tncvd.WinForms.Controls.AppTabControl();
            this.mainTabPage = new Tncvd.WinForms.Controls.AppTabPage();
            this.logsTabPage = new Tncvd.WinForms.Controls.AppTabPage();
            this.logsTextBox = new Tncvd.WinForms.Controls.AppRichTextBox();
            this.outputTabPage = new Tncvd.WinForms.Controls.AppTabPage();
            this.outputTextBox = new Tncvd.WinForms.Controls.AppRichTextBox();
            this.tabCtrl.SuspendLayout();
            this.logsTabPage.SuspendLayout();
            this.outputTabPage.SuspendLayout();
            this.SuspendLayout();
            // 
            // tabCtrl
            // 
            this.tabCtrl.Controls.Add(this.mainTabPage);
            this.tabCtrl.Controls.Add(this.logsTabPage);
            this.tabCtrl.Controls.Add(this.outputTabPage);
            this.tabCtrl.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tabCtrl.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(96)))), ((int)(((byte)(96)))), ((int)(((byte)(96)))));
            this.tabCtrl.Location = new System.Drawing.Point(0, 0);
            this.tabCtrl.Name = "tabCtrl";
            this.tabCtrl.SelectedIndex = 0;
            this.tabCtrl.Size = new System.Drawing.Size(1841, 917);
            this.tabCtrl.TabIndex = 0;
            // 
            // mainTabPage
            // 
            this.mainTabPage.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(244)))), ((int)(((byte)(232)))));
            this.mainTabPage.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(96)))), ((int)(((byte)(96)))), ((int)(((byte)(96)))));
            this.mainTabPage.Location = new System.Drawing.Point(4, 24);
            this.mainTabPage.Name = "mainTabPage";
            this.mainTabPage.Padding = new System.Windows.Forms.Padding(3);
            this.mainTabPage.Size = new System.Drawing.Size(1833, 889);
            this.mainTabPage.TabIndex = 0;
            this.mainTabPage.Text = "App";
            // 
            // logsTabPage
            // 
            this.logsTabPage.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(244)))), ((int)(((byte)(232)))));
            this.logsTabPage.Controls.Add(this.logsTextBox);
            this.logsTabPage.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(96)))), ((int)(((byte)(96)))), ((int)(((byte)(96)))));
            this.logsTabPage.Location = new System.Drawing.Point(4, 24);
            this.logsTabPage.Name = "logsTabPage";
            this.logsTabPage.Padding = new System.Windows.Forms.Padding(3);
            this.logsTabPage.Size = new System.Drawing.Size(1833, 889);
            this.logsTabPage.TabIndex = 1;
            this.logsTabPage.Text = "Logs";
            // 
            // logsTextBox
            // 
            this.logsTextBox.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(253)))), ((int)(((byte)(251)))));
            this.logsTextBox.Dock = System.Windows.Forms.DockStyle.Fill;
            this.logsTextBox.Font = new System.Drawing.Font("Consolas", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.logsTextBox.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(96)))), ((int)(((byte)(96)))), ((int)(((byte)(96)))));
            this.logsTextBox.Location = new System.Drawing.Point(3, 3);
            this.logsTextBox.Name = "logsTextBox";
            this.logsTextBox.Size = new System.Drawing.Size(1827, 883);
            this.logsTextBox.TabIndex = 0;
            this.logsTextBox.Text = "";
            // 
            // outputTabPage
            // 
            this.outputTabPage.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(244)))), ((int)(((byte)(232)))));
            this.outputTabPage.Controls.Add(this.outputTextBox);
            this.outputTabPage.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(96)))), ((int)(((byte)(96)))), ((int)(((byte)(96)))));
            this.outputTabPage.Location = new System.Drawing.Point(4, 24);
            this.outputTabPage.Name = "outputTabPage";
            this.outputTabPage.Padding = new System.Windows.Forms.Padding(3);
            this.outputTabPage.Size = new System.Drawing.Size(1833, 889);
            this.outputTabPage.TabIndex = 2;
            this.outputTabPage.Text = "Output";
            // 
            // outputTextBox
            // 
            this.outputTextBox.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(253)))), ((int)(((byte)(251)))));
            this.outputTextBox.Dock = System.Windows.Forms.DockStyle.Fill;
            this.outputTextBox.Font = new System.Drawing.Font("Consolas", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.outputTextBox.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(96)))), ((int)(((byte)(96)))), ((int)(((byte)(96)))));
            this.outputTextBox.Location = new System.Drawing.Point(3, 3);
            this.outputTextBox.Name = "outputTextBox";
            this.outputTextBox.Size = new System.Drawing.Size(1827, 883);
            this.outputTextBox.TabIndex = 1;
            this.outputTextBox.Text = "";
            // 
            // AppContainerWindowContentUC
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.tabCtrl);
            this.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(96)))), ((int)(((byte)(96)))), ((int)(((byte)(96)))));
            this.Name = "AppContainerWindowContentUC";
            this.Size = new System.Drawing.Size(1841, 917);
            this.tabCtrl.ResumeLayout(false);
            this.logsTabPage.ResumeLayout(false);
            this.outputTabPage.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private AppTabControl tabCtrl;
        private AppTabPage mainTabPage;
        private AppTabPage logsTabPage;
        private AppTabPage outputTabPage;
        private AppRichTextBox logsTextBox;
        private AppRichTextBox outputTextBox;
    }
}
