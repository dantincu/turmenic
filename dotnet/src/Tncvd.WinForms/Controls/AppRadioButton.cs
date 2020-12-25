using System.Windows.Forms;
using Tncvd.WinForms.Utility;

namespace Tncvd.WinForms.Controls
{
    public class AppRadioButton : RadioButton
    {
        public AppRadioButton()
        {
            HelperMethods.AddAppRadioButtonProperties(this);
        }
    }
}
