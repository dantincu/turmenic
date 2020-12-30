using Microsoft.Web.WebView2.WinForms;

namespace Tncvd.WinForms.Web.Controls
{
    public class AppWebView2 : WebView2
    {
        public AppWebView2()
        {
            Utility.HelperMethods.AddAppWebView2ControlProperties(this);
        }
    }
}
