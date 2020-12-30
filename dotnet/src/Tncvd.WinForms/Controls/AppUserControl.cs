using System.Windows.Forms;
using Tncvd.WinForms.Utility;

namespace Tncvd.WinForms.Controls
{
    public class AppUserControl : UserControl
    {
        public AppUserControl()
        {
        }

        protected override void OnCreateControl()
        {
            base.OnCreateControl();
            this.AddControls();
            this.AddControlProperties();
        }

        protected virtual void AddControlProperties()
        {
            HelperMethods.AddAppUserControlProperties(this);
        }

        protected virtual void AddControls()
        {
        }
    }
}
