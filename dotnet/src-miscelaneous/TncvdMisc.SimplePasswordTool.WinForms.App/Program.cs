using SimplePasswordTool.Forms;
using System;
using System.Windows.Forms;
using Tncvd.Core.AppConfig.ExecutionInfo;

namespace SimplePasswordTool
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

            AppExecutionInfoContainer.Instance.Register(typeof(Program).Assembly);
            Application.Run(new MainForm());
        }
    }
}
