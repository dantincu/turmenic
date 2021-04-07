using Turmerik.Core.AppConfig.ExecutionInfo;
using Turmerik.Logging.Test.Console.App.Components;

namespace Turmerik.Logging.Test.Console.App
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
