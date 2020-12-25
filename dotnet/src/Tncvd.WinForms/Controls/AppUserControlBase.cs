using System.Windows.Forms;
using Tncvd.WinForms.Utility;

namespace Tncvd.WinForms.Controls
{
    public abstract class AppUserControlBase : UserControl
    {
        public AppUserControlBase()
        {
            HelperMethods.AddAppUserControlProperties(this);
        }
    }
}
