
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
            this.tabCtrl = new AppTabControl();
            this.mainTabPage = new AppTabPage();
            this.logsTabPage = new AppTabPage();
            this.logsTextBox = new AppRichTextBox();
            this.outputTabPage = new AppTabPage();
            this.outputTextBox = new AppRichTextBox();
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
            this.tabCtrl.Location = new System.Drawing.Point(0, 0);
            this.tabCtrl.Name = "tabCtrl";
            this.tabCtrl.SelectedIndex = 0;
            this.tabCtrl.TabIndex = 0;
            // 
            // mainTabPage
            // 
            this.mainTabPage.Location = new System.Drawing.Point(4, 24);
            this.mainTabPage.Name = "mainTabPage";
            this.mainTabPage.Padding = new System.Windows.Forms.Padding(3);
            this.mainTabPage.TabIndex = 0;
            this.mainTabPage.Text = "App";
            this.mainTabPage.UseVisualStyleBackColor = true;
            // 
            // logsTabPage
            // 
            this.logsTabPage.Controls.Add(this.logsTextBox);
            this.logsTabPage.Location = new System.Drawing.Point(4, 24);
            this.logsTabPage.Name = "logsTabPage";
            this.logsTabPage.Padding = new System.Windows.Forms.Padding(3);
            this.logsTabPage.TabIndex = 1;
            this.logsTabPage.Text = "Logs";
            this.logsTabPage.UseVisualStyleBackColor = true;
            // 
            // logsTextBox
            // 
            this.logsTextBox.Dock = System.Windows.Forms.DockStyle.Fill;
            this.logsTextBox.Location = new System.Drawing.Point(3, 3);
            this.logsTextBox.Name = "logsTextBox";
            this.logsTextBox.TabIndex = 0;
            this.logsTextBox.Text = "";
            // 
            // outputTabPage
            // 
            this.outputTabPage.Controls.Add(this.outputTextBox);
            this.outputTabPage.Location = new System.Drawing.Point(4, 24);
            this.outputTabPage.Name = "outputTabPage";
            this.outputTabPage.Padding = new System.Windows.Forms.Padding(3);
            this.outputTabPage.TabIndex = 2;
            this.outputTabPage.Text = "Output";
            this.outputTabPage.UseVisualStyleBackColor = true;
            // 
            // outputTextBox
            // 
            this.outputTextBox.Dock = System.Windows.Forms.DockStyle.Fill;
            this.outputTextBox.Location = new System.Drawing.Point(3, 3);
            this.outputTextBox.Name = "outputTextBox";
            this.outputTextBox.TabIndex = 1;
            this.outputTextBox.Text = "";
            // 
            // AppContainerWindowContentUC
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.tabCtrl);
            this.Name = "AppContainerWindowContentUC";
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
