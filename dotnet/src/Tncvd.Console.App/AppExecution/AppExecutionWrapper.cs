using Tncvd.Console.App.AppExecution;
using Tncvd.Console.App.Components;
using Tncvd.Logging.AppExecution;

namespace Tncvd.Console.App
{
    public class AppExecutionWrapper : ConsoleAppExecutionWrapperBase<AppExecutionInfoRegistrar>
    {
        public void Run()
        {
            TestAppConfig test = new TestAppConfig();
            test.Run();

            TestLogger loggerTest = new TestLogger();
            loggerTest.Run();
        }
    }
}
