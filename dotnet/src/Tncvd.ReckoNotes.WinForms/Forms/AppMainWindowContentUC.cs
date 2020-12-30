using Tncvd.WinForms.Forms.AppWindow.Base;
using Tncvd.WinForms.Web.Controls;

namespace Tncvd.ReckoNotes.WinForms.Forms
{
    public partial class AppMainWindowContentUC : AppWindowContentUCBase
    {
        public AppMainWindowContentUC()
        {
            this.InitializeComponent();
        }

        public AppWebView2 SideWebBrowser { get; protected set; }

        public AppWebView2 MainWebBrowser{ get; protected set; }

        protected override void AddControlProperties()
        {
            base.AddControlProperties();

            this.Dock = System.Windows.Forms.DockStyle.Fill;
        }

        protected override void AddControls()
        {
            base.AddControls();

            this.AddSidePanelWebViewControl();
            this.AddMainPanelWebViewControl();
        }

        private void AddSidePanelWebViewControl()
        {
            AppWebView2 control = new AppWebView2();
            control.Source = new System.Uri("https://google.com");
            this.SideWebBrowser = control;
            this.sidePanelContentControl.MainSplitContainer.Panel1.Controls.Add(control);
        }

        private void AddMainPanelWebViewControl()
        {
            AppWebView2 control = new AppWebView2();
            control.Source = new System.Uri("https://google.com");
            this.MainWebBrowser = control;
            this.sidePanelContentControl.MainSplitContainer.Panel2.Controls.Add(control);
        }
    }
}
