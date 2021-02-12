using Turmenic.Core.AppConfig.ExecutionInfo;

namespace Turmenic.Logging.Test.Xunit
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
