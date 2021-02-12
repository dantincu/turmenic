using Turmenic.WinForms.Controls;

namespace Turmenic.WinForms.Forms
{
    public partial class TdWindowBase : TdFormBase
    {
        public TdWindowBase()
        {
            // this.InitializeComponent();
        }

        protected override void SetFormClientSize()
        {
            this.ClientSize = ConstantValues.Forms.DefaultWindowSize;
        }
    }
}
