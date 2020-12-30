using Tncvd.WinForms.Controls;
using Tncvd.WinForms.Forms.AppWindow.Base;

namespace Tncvd.WinForms.Forms.AppContainerWindow
{
    public partial class AppContainerWindowContentUC : AppWindowContentUCBase
    {
        public AppContainerWindowContentUC()
        {
            this.InitializeComponent();
        }

        public AppTabControl TabCtrl => this.tabCtrl;
        public AppTabPage MainTabPage => this.mainTabPage;
        public AppTabPage LogsTabPage => this.logsTabPage;
        public AppTabPage OutputTabPage => this.outputTabPage;
        public AppRichTextBox LogsTextBox => this.logsTextBox;
        public AppRichTextBox OutputTextBox => this.outputTextBox;
    }
}
