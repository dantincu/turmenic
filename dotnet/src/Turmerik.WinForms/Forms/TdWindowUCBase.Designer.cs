
namespace Turmerik.WinForms.Forms
{
    partial class TdWindowUCBase
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
            this.statusStrip = new Turmerik.WinForms.Controls.TdStatusStrip();
            this.menuStrip = new Turmerik.WinForms.Controls.TdMenuStrip();
            this.SuspendLayout();
            // 
            // statusStrip
            // 
            this.statusStrip.Location = new System.Drawing.Point(0, 909);
            this.statusStrip.Name = "statusStrip";
            this.statusStrip.Size = new System.Drawing.Size(1263, 22);
            this.statusStrip.TabIndex = 0;
            this.statusStrip.Text = "tdStatusStrip1";
            // 
            // menuStrip
            // 
            this.menuStrip.Location = new System.Drawing.Point(0, 0);
            this.menuStrip.Name = "menuStrip";
            this.menuStrip.Size = new System.Drawing.Size(1263, 24);
            this.menuStrip.TabIndex = 1;
            this.menuStrip.Text = "tdMenuStrip1";
            // 
            // TdWindowUCBase
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.statusStrip);
            this.Controls.Add(this.menuStrip);
            this.Name = "TdWindowUCBase";
            this.Size = new System.Drawing.Size(1263, 931);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Controls.TdStatusStrip statusStrip;
        private Controls.TdMenuStrip menuStrip;
    }
}
