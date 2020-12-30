
namespace Tncvd.WinForms.Controls.Explorer
{
    partial class SidePanelContentControl
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
            this.mainSplitContainer = new Tncvd.WinForms.Controls.AppSplitContainer();
            this.sidePanelToolBar = new Tncvd.WinForms.Controls.AppPanel();
            this.btnShowSidePanelToolBox = new Tncvd.WinForms.Controls.AppButton();
            this.btnHideSidePanelToolBox = new Tncvd.WinForms.Controls.AppButton();
            ((System.ComponentModel.ISupportInitialize)(this.mainSplitContainer)).BeginInit();
            this.mainSplitContainer.SuspendLayout();
            this.sidePanelToolBar.SuspendLayout();
            this.SuspendLayout();
            // 
            // mainSplitContainer
            // 
            this.mainSplitContainer.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(244)))), ((int)(((byte)(232)))));
            this.mainSplitContainer.Dock = System.Windows.Forms.DockStyle.Fill;
            this.mainSplitContainer.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(96)))), ((int)(((byte)(96)))), ((int)(((byte)(96)))));
            this.mainSplitContainer.Location = new System.Drawing.Point(0, 0);
            this.mainSplitContainer.Name = "mainSplitContainer";
            // 
            // mainSplitContainer.Panel1
            // 
            this.mainSplitContainer.Panel1.AutoScroll = true;
            // 
            // mainSplitContainer.Panel2
            // 
            this.mainSplitContainer.Panel2.AutoScroll = true;
            this.mainSplitContainer.Panel2.Padding = new System.Windows.Forms.Padding(0, 0, 3, 0);
            this.mainSplitContainer.Size = new System.Drawing.Size(1187, 745);
            this.mainSplitContainer.SplitterDistance = 393;
            this.mainSplitContainer.SplitterWidth = 3;
            this.mainSplitContainer.TabIndex = 0;
            // 
            // sidePanelToolBar
            // 
            this.sidePanelToolBar.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(244)))), ((int)(((byte)(232)))));
            this.sidePanelToolBar.Controls.Add(this.btnShowSidePanelToolBox);
            this.sidePanelToolBar.Controls.Add(this.btnHideSidePanelToolBox);
            this.sidePanelToolBar.Dock = System.Windows.Forms.DockStyle.Left;
            this.sidePanelToolBar.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(96)))), ((int)(((byte)(96)))), ((int)(((byte)(96)))));
            this.sidePanelToolBar.Location = new System.Drawing.Point(0, 0);
            this.sidePanelToolBar.Name = "sidePanelToolBar";
            this.sidePanelToolBar.Padding = new System.Windows.Forms.Padding(0, 3, 0, 0);
            this.sidePanelToolBar.Size = new System.Drawing.Size(25, 745);
            this.sidePanelToolBar.TabIndex = 1;
            // 
            // btnShowSidePanelToolBox
            // 
            this.btnShowSidePanelToolBox.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.btnShowSidePanelToolBox.Dock = System.Windows.Forms.DockStyle.Top;
            this.btnShowSidePanelToolBox.Font = new System.Drawing.Font("Arial", 10F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnShowSidePanelToolBox.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(96)))), ((int)(((byte)(96)))), ((int)(((byte)(96)))));
            this.btnShowSidePanelToolBox.Location = new System.Drawing.Point(0, 28);
            this.btnShowSidePanelToolBox.Name = "btnShowSidePanelToolBox";
            this.btnShowSidePanelToolBox.Padding = new System.Windows.Forms.Padding(1, 1, 0, 0);
            this.btnShowSidePanelToolBox.Size = new System.Drawing.Size(25, 25);
            this.btnShowSidePanelToolBox.TabIndex = 1;
            this.btnShowSidePanelToolBox.Text = "V";
            this.btnShowSidePanelToolBox.UseVisualStyleBackColor = true;
            this.btnShowSidePanelToolBox.Click += new System.EventHandler(this.btnShowSidePanelToolBox_Click);
            // 
            // btnHideSidePanelToolBox
            // 
            this.btnHideSidePanelToolBox.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.btnHideSidePanelToolBox.Dock = System.Windows.Forms.DockStyle.Top;
            this.btnHideSidePanelToolBox.Font = new System.Drawing.Font("Bauhaus 93", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnHideSidePanelToolBox.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(96)))), ((int)(((byte)(96)))), ((int)(((byte)(96)))));
            this.btnHideSidePanelToolBox.Location = new System.Drawing.Point(0, 3);
            this.btnHideSidePanelToolBox.Name = "btnHideSidePanelToolBox";
            this.btnHideSidePanelToolBox.Padding = new System.Windows.Forms.Padding(4, 0, 0, 0);
            this.btnHideSidePanelToolBox.Size = new System.Drawing.Size(25, 25);
            this.btnHideSidePanelToolBox.TabIndex = 0;
            this.btnHideSidePanelToolBox.Text = ">";
            this.btnHideSidePanelToolBox.UseVisualStyleBackColor = true;
            this.btnHideSidePanelToolBox.Click += new System.EventHandler(this.btnHideSidePanelToolBox_Click);
            // 
            // SidePanelContentControl
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.sidePanelToolBar);
            this.Controls.Add(this.mainSplitContainer);
            this.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(96)))), ((int)(((byte)(96)))), ((int)(((byte)(96)))));
            this.Name = "SidePanelContentControl";
            this.Size = new System.Drawing.Size(1187, 745);
            this.Load += new System.EventHandler(this.SidePanelContentControl_Load);
            ((System.ComponentModel.ISupportInitialize)(this.mainSplitContainer)).EndInit();
            this.mainSplitContainer.ResumeLayout(false);
            this.sidePanelToolBar.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private AppSplitContainer mainSplitContainer;
        private AppPanel sidePanelToolBar;
        private AppButton btnShowSidePanelToolBox;
        private AppButton btnHideSidePanelToolBox;
    }
}
