
namespace SimplePasswordTool
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
            this.passwordListUC = new SimplePasswordTool.PasswordListUC();
            this.createPasswordUC = new SimplePasswordTool.CreatePasswordUC();
            this.checkPasswordUC = new SimplePasswordTool.CheckPasswordUC();
            ((System.ComponentModel.ISupportInitialize)(this.mainSplitContainer)).BeginInit();
            this.mainSplitContainer.Panel1.SuspendLayout();
            this.mainSplitContainer.Panel2.SuspendLayout();
            this.mainSplitContainer.SuspendLayout();
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
            this.mainSplitContainer.Panel2.Controls.Add(this.createPasswordUC);
            this.mainSplitContainer.Panel2.Controls.Add(this.checkPasswordUC);
            this.mainSplitContainer.Panel2.Padding = new System.Windows.Forms.Padding(5);
            this.mainSplitContainer.Size = new System.Drawing.Size(1505, 790);
            this.mainSplitContainer.SplitterDistance = 301;
            this.mainSplitContainer.TabIndex = 0;
            // 
            // passwordListUC
            // 
            this.passwordListUC.Dock = System.Windows.Forms.DockStyle.Fill;
            this.passwordListUC.Location = new System.Drawing.Point(0, 0);
            this.passwordListUC.Name = "passwordListUC";
            this.passwordListUC.Size = new System.Drawing.Size(301, 790);
            this.passwordListUC.TabIndex = 0;
            // 
            // createPasswordUC
            // 
            this.createPasswordUC.Dock = System.Windows.Forms.DockStyle.Top;
            this.createPasswordUC.Location = new System.Drawing.Point(5, 148);
            this.createPasswordUC.Name = "createPasswordUC";
            this.createPasswordUC.Size = new System.Drawing.Size(1190, 157);
            this.createPasswordUC.TabIndex = 1;
            // 
            // checkPasswordUC
            // 
            this.checkPasswordUC.Dock = System.Windows.Forms.DockStyle.Top;
            this.checkPasswordUC.Location = new System.Drawing.Point(5, 5);
            this.checkPasswordUC.Name = "checkPasswordUC";
            this.checkPasswordUC.Padding = new System.Windows.Forms.Padding(5);
            this.checkPasswordUC.Size = new System.Drawing.Size(1190, 143);
            this.checkPasswordUC.TabIndex = 0;
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.AutoScroll = true;
            this.ClientSize = new System.Drawing.Size(1505, 790);
            this.Controls.Add(this.mainSplitContainer);
            this.Name = "MainForm";
            this.Text = "Simple Password Tool";
            this.Load += new System.EventHandler(this.MainForm_Load);
            this.mainSplitContainer.Panel1.ResumeLayout(false);
            this.mainSplitContainer.Panel2.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.mainSplitContainer)).EndInit();
            this.mainSplitContainer.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.SplitContainer mainSplitContainer;
        private PasswordListUC passwordListUC;
        private CheckPasswordUC checkPasswordUC;
        private CreatePasswordUC createPasswordUC;
    }
}

