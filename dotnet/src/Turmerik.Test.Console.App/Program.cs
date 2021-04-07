using Turmerik.Core.AppConfig.ExecutionInfo;
using Turmerik.Test.Console.App.Components;

namespace Turmerik.Test.Console.App
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
