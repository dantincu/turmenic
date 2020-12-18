using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Tncvd.WinForms.UserControls.Utility;

namespace Tncvd.WinForms.UserControls
{
    public class AppCheckBox : CheckBox
    {
        public AppCheckBox()
        {
            HelperMethods.AddAppCheckBoxProperties(this);
        }
    }
}
