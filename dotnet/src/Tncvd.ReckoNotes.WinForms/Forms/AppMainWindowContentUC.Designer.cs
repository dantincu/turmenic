
namespace Tncvd.ReckoNotes.WinForms.Forms
{
    partial class AppMainWindowContentUC
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
            this.sidePanelContentControl = new Tncvd.WinForms.Controls.Explorer.SidePanelContentControl();
            this.SuspendLayout();
            // 
            // sidePanelContentControl
            // 
            this.sidePanelContentControl.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(244)))), ((int)(((byte)(232)))));
            this.sidePanelContentControl.Dock = System.Windows.Forms.DockStyle.Fill;
            this.sidePanelContentControl.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(96)))), ((int)(((byte)(96)))), ((int)(((byte)(96)))));
            this.sidePanelContentControl.Location = new System.Drawing.Point(0, 0);
            this.sidePanelContentControl.Name = "sidePanelContentControl";
            this.sidePanelContentControl.Size = new System.Drawing.Size(1841, 916);
            this.sidePanelContentControl.TabIndex = 0;
            // 
            // AppMainWindowFormContentUC
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.sidePanelContentControl);
            this.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(96)))), ((int)(((byte)(96)))), ((int)(((byte)(96)))));
            this.Name = "AppMainWindowFormContentUC";
            this.Size = new System.Drawing.Size(1841, 916);
            this.ResumeLayout(false);

        }

        #endregion

        private Tncvd.WinForms.Controls.Explorer.SidePanelContentControl sidePanelContentControl;
    }
}
