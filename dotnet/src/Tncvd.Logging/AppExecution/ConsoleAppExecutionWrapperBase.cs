using System;
using Tncvd.AppConfig.Execution;

namespace Tncvd.Logging.AppExecution
{
    public abstract class ConsoleAppExecutionWrapperBase<TAppExecutionInfoRegistrar> : IDisposable where TAppExecutionInfoRegistrar : AppExecutionInfoRegistrarBase<TAppExecutionInfoRegistrar>, new()
    {
        protected readonly FileLogger Logger;

        public ConsoleAppExecutionWrapperBase()
        {
            new TAppExecutionInfoRegistrar().Register();

            this.Logger = LoggerFactory.Instance.GetFileLogger(this.GetType());
            this.Logger.Information("Starting the console app execution");
        }

        public void Dispose()
        {
            LoggerFactory.Instance.CloseAndFlushGlobal();
        }
    }
}
