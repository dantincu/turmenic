using System.Windows.Forms;
using Tncvd.WinForms.Utility;

namespace Tncvd.WinForms.Controls
{
    public class AppButton : Button
    {
        public AppButton()
        {
            HelperMethods.AddAppButtonProperties(this);
        }
    }
}
