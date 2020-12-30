using Microsoft.Web.WebView2.WinForms;

namespace Tncvd.WinForms.Web.Utility
{
    public static partial class HelperMethods
    {
        public static void AddWebView2ControlProperties(WebView2 webView2)
        {
            WinForms.Utility.HelperMethods.AddBasicControlProperties(webView2);
            webView2.BackColor = ConstantValues.DefaultWebBrowserBackgroundColor;
            webView2.Dock = System.Windows.Forms.DockStyle.Fill;
        }
    }
}
