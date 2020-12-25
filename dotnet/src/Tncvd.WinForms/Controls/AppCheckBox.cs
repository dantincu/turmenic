using System.Windows.Forms;
using Tncvd.WinForms.Utility;

namespace Tncvd.WinForms.Controls
{
    public class AppCheckBox : CheckBox
    {
        public AppCheckBox()
        {
            HelperMethods.AddAppCheckBoxProperties(this);
        }
    }
}
