using System;
using Tncvd.Console.App.AppConfig;

namespace Tncvd.Console.App
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            AppExecutionInfo.Register();

            System.Console.WriteLine("Hello World!");
            TestAppConfig test = new TestAppConfig();
            test.Run();

            TestLogger loggerTest = new TestLogger();
            loggerTest.Run();
        }
    }
}
