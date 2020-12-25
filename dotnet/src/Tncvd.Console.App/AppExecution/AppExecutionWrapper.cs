using Tncvd.Console.App.AppExecution;
using Tncvd.Console.App.Components;

namespace Tncvd.Console.App
{
    public class AppExecutionWrapper
    {
        public AppExecutionWrapper()
        {
            new AppExecutionInfoRegistrar().Register();
        }

        public void Run()
        {
            TestAppConfig test = new TestAppConfig();
            test.Run();

            TestLogger loggerTest = new TestLogger();
            loggerTest.Run();
        }
    }
}
