using Tncvd.WinForms.Controls;

namespace Tncvd.WinForms.Forms
{
    public partial class TdWindowBase : TdFormBase
    {
        public TdWindowBase()
        {
            // this.InitializeComponent();
        }

        protected override void SetClientSize()
        {
            this.ClientSize = ConstantValues.Forms.DefaultWindowSize;
        }
    }
}
