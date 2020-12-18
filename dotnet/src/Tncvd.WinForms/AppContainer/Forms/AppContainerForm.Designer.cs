
namespace Tncvd.WinForms.AppContainer.Forms
{
    partial class AppContainerForm
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
            this.formSplitPannel = new System.Windows.Forms.SplitContainer();
            this.formMenuStrip = new System.Windows.Forms.MenuStrip();
            this.FormTabControl = new System.Windows.Forms.TabControl();
            this.appManagerTabPage = new System.Windows.Forms.TabPage();
            this.appLogsTabPage = new System.Windows.Forms.TabPage();
            this.richTextBoxAppLogs = new System.Windows.Forms.RichTextBox();
            this.outputTabPage = new System.Windows.Forms.TabPage();
            this.richTextBoxOutput = new System.Windows.Forms.RichTextBox();
            ((System.ComponentModel.ISupportInitialize)(this.formSplitPannel)).BeginInit();
            this.formSplitPannel.Panel1.SuspendLayout();
            this.formSplitPannel.Panel2.SuspendLayout();
            this.formSplitPannel.SuspendLayout();
            this.FormTabControl.SuspendLayout();
            this.appLogsTabPage.SuspendLayout();
            this.outputTabPage.SuspendLayout();
            this.SuspendLayout();
            // 
            // formSplitPannel
            // 
            this.formSplitPannel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.formSplitPannel.Location = new System.Drawing.Point(0, 0);
            this.formSplitPannel.Name = "formSplitPannel";
            this.formSplitPannel.Orientation = System.Windows.Forms.Orientation.Horizontal;
            // 
            // formSplitPannel.Panel1
            // 
            this.formSplitPannel.Panel1.Controls.Add(this.formMenuStrip);
            // 
            // formSplitPannel.Panel2
            // 
            this.formSplitPannel.Panel2.Controls.Add(this.FormTabControl);
            this.formSplitPannel.Size = new System.Drawing.Size(1904, 1041);
            this.formSplitPannel.SplitterDistance = 25;
            this.formSplitPannel.TabIndex = 0;
            // 
            // formMenuStrip
            // 
            this.formMenuStrip.Dock = System.Windows.Forms.DockStyle.Fill;
            this.formMenuStrip.Location = new System.Drawing.Point(0, 0);
            this.formMenuStrip.Name = "formMenuStrip";
            this.formMenuStrip.Size = new System.Drawing.Size(1904, 25);
            this.formMenuStrip.TabIndex = 0;
            this.formMenuStrip.Text = "menuStrip1";
            // 
            // FormTabControl
            // 
            this.FormTabControl.Controls.Add(this.appManagerTabPage);
            this.FormTabControl.Controls.Add(this.appLogsTabPage);
            this.FormTabControl.Controls.Add(this.outputTabPage);
            this.FormTabControl.Dock = System.Windows.Forms.DockStyle.Fill;
            this.FormTabControl.Location = new System.Drawing.Point(0, 0);
            this.FormTabControl.Name = "FormTabControl";
            this.FormTabControl.SelectedIndex = 0;
            this.FormTabControl.Size = new System.Drawing.Size(1904, 1012);
            this.FormTabControl.TabIndex = 0;
            // 
            // appManagerTabPage
            // 
            this.appManagerTabPage.Location = new System.Drawing.Point(4, 24);
            this.appManagerTabPage.Name = "appManagerTabPage";
            this.appManagerTabPage.Padding = new System.Windows.Forms.Padding(3);
            this.appManagerTabPage.Size = new System.Drawing.Size(1896, 984);
            this.appManagerTabPage.TabIndex = 0;
            this.appManagerTabPage.Text = "App manager";
            this.appManagerTabPage.UseVisualStyleBackColor = true;
            // 
            // appLogsTabPage
            // 
            this.appLogsTabPage.Controls.Add(this.richTextBoxAppLogs);
            this.appLogsTabPage.Location = new System.Drawing.Point(4, 24);
            this.appLogsTabPage.Name = "appLogsTabPage";
            this.appLogsTabPage.Padding = new System.Windows.Forms.Padding(3);
            this.appLogsTabPage.Size = new System.Drawing.Size(1896, 984);
            this.appLogsTabPage.TabIndex = 1;
            this.appLogsTabPage.Text = "App logs";
            this.appLogsTabPage.UseVisualStyleBackColor = true;
            // 
            // richTextBoxAppLogs
            // 
            this.richTextBoxAppLogs.Dock = System.Windows.Forms.DockStyle.Fill;
            this.richTextBoxAppLogs.Font = new System.Drawing.Font("Consolas", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.richTextBoxAppLogs.Location = new System.Drawing.Point(3, 3);
            this.richTextBoxAppLogs.Name = "richTextBoxAppLogs";
            this.richTextBoxAppLogs.Size = new System.Drawing.Size(1890, 978);
            this.richTextBoxAppLogs.TabIndex = 0;
            this.richTextBoxAppLogs.Text = "";
            // 
            // outputTabPage
            // 
            this.outputTabPage.Controls.Add(this.richTextBoxOutput);
            this.outputTabPage.Location = new System.Drawing.Point(4, 24);
            this.outputTabPage.Name = "outputTabPage";
            this.outputTabPage.Size = new System.Drawing.Size(1896, 984);
            this.outputTabPage.TabIndex = 2;
            this.outputTabPage.Text = "Output";
            this.outputTabPage.UseVisualStyleBackColor = true;
            // 
            // richTextBoxOutput
            // 
            this.richTextBoxOutput.Dock = System.Windows.Forms.DockStyle.Fill;
            this.richTextBoxOutput.Font = new System.Drawing.Font("Consolas", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.richTextBoxOutput.Location = new System.Drawing.Point(0, 0);
            this.richTextBoxOutput.Name = "richTextBoxOutput";
            this.richTextBoxOutput.Size = new System.Drawing.Size(1896, 984);
            this.richTextBoxOutput.TabIndex = 1;
            this.richTextBoxOutput.Text = "";
            // 
            // AppContainerForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1904, 1041);
            this.Controls.Add(this.formSplitPannel);
            this.MainMenuStrip = this.formMenuStrip;
            this.Name = "AppContainerForm";
            this.Text = "App Container";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.Load += new System.EventHandler(this.AppContainerForm_Load);
            this.formSplitPannel.Panel1.ResumeLayout(false);
            this.formSplitPannel.Panel1.PerformLayout();
            this.formSplitPannel.Panel2.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.formSplitPannel)).EndInit();
            this.formSplitPannel.ResumeLayout(false);
            this.FormTabControl.ResumeLayout(false);
            this.appLogsTabPage.ResumeLayout(false);
            this.outputTabPage.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.SplitContainer formSplitPannel;
        private System.Windows.Forms.MenuStrip formMenuStrip;
        private System.Windows.Forms.TabControl FormTabControl;
        private System.Windows.Forms.TabPage appManagerTabPage;
        private System.Windows.Forms.TabPage appLogsTabPage;
        private System.Windows.Forms.RichTextBox richTextBoxAppLogs;
        private System.Windows.Forms.TabPage outputTabPage;
        private System.Windows.Forms.RichTextBox richTextBoxOutput;
    }
}