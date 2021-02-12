using Turmenic.WinForms.Controls;

namespace Turmenic.WinForms.Forms
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
