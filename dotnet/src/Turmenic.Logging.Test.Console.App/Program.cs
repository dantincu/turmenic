using Turmenic.Core.AppConfig.ExecutionInfo;
using Turmenic.Logging.Test.Console.App.Components;

namespace Turmenic.Logging.Test.Console.App
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
