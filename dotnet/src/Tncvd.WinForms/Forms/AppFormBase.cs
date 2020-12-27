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

        protected AppTextBoxLogger TextBoxLogger { get; set; }

        protected virtual bool InitLoggerManually => false;

        protected virtual void InitLogger()
        {
            this.TextBoxLogger = TextBoxLoggerFactory.Instance.GetAppTextBoxLogger(GetType().GetTypeFullName());
        }

        protected virtual void InitForm()
        {
            if (this.InitLoggerManually == false)
            {
                this.InitLogger();
            }
        }
    }
}
