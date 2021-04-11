using Turmerik.WinForms.Controls;

namespace Turmerik.WinForms.Forms
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
