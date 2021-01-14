using Tncvd.Core.AppConfig.ExecutionInfo;
using Tncvd.Logging.Test.Console.App.Components;

namespace Tncvd.Logging.Test.Console.App
{
    class Program
    {
        static void Main(string[] args)
        {
            System.Console.WriteLine("Hello World!");

            AppExecutionInfoContainer.Instance.Register(typeof(Program).Assembly);

            new TestSafeReadLogFiles().Run();
        }
    }
}
