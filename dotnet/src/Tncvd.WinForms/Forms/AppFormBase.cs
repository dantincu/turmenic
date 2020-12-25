using System.Windows.Forms;
using Tncvd.Reflection;
using Tncvd.WinForms.Logging;

namespace Tncvd.WinForms.Forms
{
    public class AppFormBase : Form
    {
        public AppFormBase()
        {
            Utility.HelperMethods.AddAppFormProperties(this);
        }

        protected AppTextBoxLogger Logger { get; set; }

        protected virtual void InitForm()
        {
            this.Logger = TextBoxLoggerFactory.Instance.GetAppTextBoxLogger(GetType().GetTypeFullName());
        }
    }
}
