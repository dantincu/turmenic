using Tncvd.WinForms.Controls;

namespace Tncvd.WinForms.Forms
{
    public partial class TdLargeWindowBase : TdWindowBase
    {
        public TdLargeWindowBase()
        {
            // this.InitializeComponent();
        }

        protected override void SetFormClientSize()
        {
            this.ClientSize = ConstantValues.Forms.DefaultLargeWindowSize;
        }
    }
}
