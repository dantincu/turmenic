using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Turmerik.WinForms.__DESIGN__
{
    public partial class TdLargeWindowUC : UserControl
    {
        public TdLargeWindowUC()
        {
            this.InitializeComponent();

            this.toolStripButton.Click += ToolStripButton_Click;
        }

        private void ToolStripButton_Click(object sender, EventArgs e)
        {
            throw new NotImplementedException();
        }
    }
}
