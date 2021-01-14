using Tncvd.Core.AppConfig.ExecutionInfo;

namespace Tncvd.Logging.Test.Xunit
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
