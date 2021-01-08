
using SimplePasswordTool.UC;

namespace SimplePasswordTool.Forms
{
    partial class MainForm
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
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
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.mainSplitContainer = new System.Windows.Forms.SplitContainer();
            this.passwordListUC = new PasswordListUC();
            this.createPasswordUC = new CreatePasswordUC();
            this.checkPasswordUC = new CheckPasswordUC();
            this.mainMenuStrip = new System.Windows.Forms.MenuStrip();
            this.mainStatusStrip = new System.Windows.Forms.StatusStrip();
            this.pnlMainStatusStrip = new System.Windows.Forms.Panel();
            this.pnlMainSplitContainer = new System.Windows.Forms.Panel();
            this.pnlMainDefault = new System.Windows.Forms.Panel();
            ((System.ComponentModel.ISupportInitialize)(this.mainSplitContainer)).BeginInit();
            this.mainSplitContainer.Panel1.SuspendLayout();
            this.mainSplitContainer.Panel2.SuspendLayout();
            this.mainSplitContainer.SuspendLayout();
            this.pnlMainStatusStrip.SuspendLayout();
            this.pnlMainSplitContainer.SuspendLayout();
            this.SuspendLayout();
            // 
            // mainSplitContainer
            // 
            this.mainSplitContainer.Dock = System.Windows.Forms.DockStyle.Fill;
            this.mainSplitContainer.Location = new System.Drawing.Point(0, 0);
            this.mainSplitContainer.Name = "mainSplitContainer";
            // 
            // mainSplitContainer.Panel1
            // 
            this.mainSplitContainer.Panel1.Controls.Add(this.passwordListUC);
            // 
            // mainSplitContainer.Panel2
            // 
            this.mainSplitContainer.Panel2.Controls.Add(this.pnlMainDefault);
            this.mainSplitContainer.Panel2.Controls.Add(this.createPasswordUC);
            this.mainSplitContainer.Panel2.Controls.Add(this.checkPasswordUC);
            this.mainSplitContainer.Panel2.Padding = new System.Windows.Forms.Padding(5);
            this.mainSplitContainer.Size = new System.Drawing.Size(1505, 742);
            this.mainSplitContainer.SplitterDistance = 360;
            this.mainSplitContainer.TabIndex = 0;
            // 
            // passwordListUC
            // 
            this.passwordListUC.Dock = System.Windows.Forms.DockStyle.Fill;
            this.passwordListUC.Location = new System.Drawing.Point(0, 0);
            this.passwordListUC.Name = "passwordListUC";
            this.passwordListUC.Size = new System.Drawing.Size(360, 742);
            this.passwordListUC.TabIndex = 0;
            // 
            // createPasswordUC
            // 
            this.createPasswordUC.Dock = System.Windows.Forms.DockStyle.Top;
            this.createPasswordUC.Location = new System.Drawing.Point(5, 148);
            this.createPasswordUC.Name = "createPasswordUC";
            this.createPasswordUC.Size = new System.Drawing.Size(1131, 181);
            this.createPasswordUC.TabIndex = 1;
            // 
            // checkPasswordUC
            // 
            this.checkPasswordUC.Dock = System.Windows.Forms.DockStyle.Top;
            this.checkPasswordUC.Location = new System.Drawing.Point(5, 5);
            this.checkPasswordUC.Name = "checkPasswordUC";
            this.checkPasswordUC.Size = new System.Drawing.Size(1131, 143);
            this.checkPasswordUC.TabIndex = 0;
            // 
            // mainMenuStrip
            // 
            this.mainMenuStrip.Location = new System.Drawing.Point(0, 0);
            this.mainMenuStrip.Name = "mainMenuStrip";
            this.mainMenuStrip.Padding = new System.Windows.Forms.Padding(0);
            this.mainMenuStrip.Size = new System.Drawing.Size(1505, 24);
            this.mainMenuStrip.TabIndex = 1;
            this.mainMenuStrip.Text = "Main menu";
            // 
            // mainStatusStrip
            // 
            this.mainStatusStrip.Location = new System.Drawing.Point(0, 2);
            this.mainStatusStrip.Name = "mainStatusStrip";
            this.mainStatusStrip.Size = new System.Drawing.Size(1505, 22);
            this.mainStatusStrip.TabIndex = 2;
            this.mainStatusStrip.Text = "statusStrip1";
            // 
            // pnlMainStatusStrip
            // 
            this.pnlMainStatusStrip.Controls.Add(this.mainStatusStrip);
            this.pnlMainStatusStrip.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.pnlMainStatusStrip.Location = new System.Drawing.Point(0, 766);
            this.pnlMainStatusStrip.Name = "pnlMainStatusStrip";
            this.pnlMainStatusStrip.Size = new System.Drawing.Size(1505, 24);
            this.pnlMainStatusStrip.TabIndex = 3;
            // 
            // pnlMainSplitContainer
            // 
            this.pnlMainSplitContainer.Controls.Add(this.mainSplitContainer);
            this.pnlMainSplitContainer.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnlMainSplitContainer.Location = new System.Drawing.Point(0, 24);
            this.pnlMainSplitContainer.Name = "pnlMainSplitContainer";
            this.pnlMainSplitContainer.Size = new System.Drawing.Size(1505, 742);
            this.pnlMainSplitContainer.TabIndex = 4;
            // 
            // pnlMainDefault
            // 
            this.pnlMainDefault.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnlMainDefault.Location = new System.Drawing.Point(5, 329);
            this.pnlMainDefault.Name = "pnlMainDefault";
            this.pnlMainDefault.Size = new System.Drawing.Size(1131, 408);
            this.pnlMainDefault.TabIndex = 2;
            this.pnlMainDefault.Click += new System.EventHandler(this.pnlMainDefault_Click);
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.AutoScroll = true;
            this.ClientSize = new System.Drawing.Size(1505, 790);
            this.Controls.Add(this.pnlMainSplitContainer);
            this.Controls.Add(this.pnlMainStatusStrip);
            this.Controls.Add(this.mainMenuStrip);
            this.Name = "MainForm";
            this.Text = "Simple Password Tool";
            this.Load += new System.EventHandler(this.MainForm_Load);
            this.mainSplitContainer.Panel1.ResumeLayout(false);
            this.mainSplitContainer.Panel2.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.mainSplitContainer)).EndInit();
            this.mainSplitContainer.ResumeLayout(false);
            this.pnlMainStatusStrip.ResumeLayout(false);
            this.pnlMainStatusStrip.PerformLayout();
            this.pnlMainSplitContainer.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.SplitContainer mainSplitContainer;
        private System.Windows.Forms.MenuStrip mainMenuStrip;
        private System.Windows.Forms.StatusStrip mainStatusStrip;
        private PasswordListUC passwordListUC;
        private System.Windows.Forms.Panel pnlMainStatusStrip;
        private System.Windows.Forms.Panel pnlMainSplitContainer;
        private CheckPasswordUC checkPasswordUC;
        private CreatePasswordUC createPasswordUC;
        private System.Windows.Forms.Panel pnlMainDefault;
    }
}

