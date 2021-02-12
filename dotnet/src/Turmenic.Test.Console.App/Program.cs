using Turmenic.Core.AppConfig.ExecutionInfo;
using Turmenic.Test.Console.App.Components;

namespace Turmenic.Test.Console.App
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
