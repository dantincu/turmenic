using Turmerik.Core.AppConfig.ExecutionInfo;

namespace Turmerik.Logging.Test.Xunit
{
    public class AppStart
    {
        static AppStart()
        {
            AppExecutionInfoContainer.Instance.Register(typeof(AppStart).Assembly);
        }

        public static void Start()
        {
        }
    }
}
