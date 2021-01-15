using System.Windows.Forms;
using Tncvd.Core.Reflection;
using Tncvd.WinForms.Forms;

namespace Tncvd.WinForms.Test.App
{
    public partial class MainWindow : TdLargeWindowBase
    {
        public MainWindow()
        {
            // this.InitializeComponent();
        }

        [AutoInit]
        protected MainWindowUC WindowUC { get; set; }

        protected override void InitForm()
        {
            base.InitForm();

            this.WindowUC = this.AddFormUC<MainWindowUC>();
            this.WindowState = FormWindowState.Maximized;
        }
    }
}
