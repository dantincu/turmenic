
namespace Tncvd.WinForms.Logging.Forms
{
    partial class RichTextLogsForm
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
            if (disposing && (this.components != null))
            {
                this.components.Dispose();
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
            this.rchTxtLogs = new System.Windows.Forms.RichTextBox();
            this.SuspendLayout();
            // 
            // rchTxtLogs
            // 
            this.rchTxtLogs.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(253)))), ((int)(((byte)(251)))));
            this.rchTxtLogs.Dock = System.Windows.Forms.DockStyle.Fill;
            this.rchTxtLogs.Font = new System.Drawing.Font("Consolas", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.rchTxtLogs.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(96)))), ((int)(((byte)(96)))), ((int)(((byte)(96)))));
            this.rchTxtLogs.Location = new System.Drawing.Point(0, 0);
            this.rchTxtLogs.Name = "rchTxtLogs";
            this.rchTxtLogs.Size = new System.Drawing.Size(1804, 860);
            this.rchTxtLogs.TabIndex = 0;
            this.rchTxtLogs.Text = "";
            this.rchTxtLogs.WordWrap = false;
            // 
            // LogsForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1804, 860);
            this.Controls.Add(this.rchTxtLogs);
            this.Name = "LogsForm";
            this.Text = "LogsForm";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.RichTextBox rchTxtLogs;
    }
}