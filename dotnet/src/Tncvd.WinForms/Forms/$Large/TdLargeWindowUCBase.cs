using System.Windows.Forms;
using Tncvd.WinForms.Controls;

namespace Tncvd.WinForms.Forms
{
    public partial class TdLargeWindowUCBase : TdWindowUCBase
    {
        public TdLargeWindowUCBase()
        {
            // InitializeComponent();
        }

        protected TdStatusStrip StatusStrip { get; set; }
        private TdMenuStrip MenuStrip { get; set; }

        protected override void InitCompositeProperties()
        {
            base.InitCompositeProperties();
        }
    }
}
