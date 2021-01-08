using Tncvd.Core.AppConfig.ExecutionInfo;
using Tncvd.Test.Console.App.Components;

namespace Tncvd.Test.Console.App
{
    class Program
    {
        static void Main(string[] args)
        {
            System.Console.WriteLine("Hello World!");

            AppExecutionInfoContainer.Instance.Register(typeof(Program).Assembly);

            new TestAppConfig().Run();
            new TestLogger().Run();
        }
    }
}
