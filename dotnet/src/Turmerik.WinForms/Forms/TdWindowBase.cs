using Turmerik.WinForms.Controls;

namespace Turmerik.WinForms.Forms
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
