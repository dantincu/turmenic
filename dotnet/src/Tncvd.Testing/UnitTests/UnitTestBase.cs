using Tncvd.AppConfig.Execution;
using Tncvd.Logging.AppExecution;

namespace Tncvd.Testing.UnitTests
{
    public abstract class UnitTestBase<TAppExecutionInfoRegistrar> : ConsoleAppExecutionWrapperBase<TAppExecutionInfoRegistrar> where TAppExecutionInfoRegistrar : AppExecutionInfoRegistrarBase<TAppExecutionInfoRegistrar>, new()
    {
    }
}
