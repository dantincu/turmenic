using System;
using System.Windows.Forms;
using Tncvd.ReckoNotes.WinForms.App.AppExecution;

namespace Tncvd.ReckoNotes.WinForms.App
{
    static class Program
    {
        /// <summary>
        ///  The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.SetHighDpiMode(HighDpiMode.SystemAware);
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            new AppLauncher().Launch();
        }
    }
}
