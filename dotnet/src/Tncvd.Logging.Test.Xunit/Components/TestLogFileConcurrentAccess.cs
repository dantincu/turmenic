using System.Threading.Tasks;
using Tncvd.Logging.Logger;

namespace Tncvd.Logging.Test.Xunit.Components
{
    public class TestLogFileConcurrentAccess
    {
        public void Run()
        {
            this.RunSharedFileLoggerTest();
            this.RunVerboseFileLoggerTest();
        }

        private void RunSharedFileLoggerTest()
        {
            using SharedFileLogger sharedFileLogger = LoggerFactory.Instance.GetSharedFileLogger(this.GetType());
            this.RunLoggerTest(sharedFileLogger);
        }

        private void RunVerboseFileLoggerTest()
        {
            using VerboseFileLogger sharedFileLogger = LoggerFactory.Instance.GetVerboseFileLogger(this.GetType());
            this.RunLoggerTest(sharedFileLogger);
        }

        private void RunLoggerTest(FileLoggerBase fileLogger)
        {
            Task[] taskArr = new Task[10];
            int idx = 0;

            for (int i = 0; i < 10; i++)
            {
                taskArr[i] = new Task(() =>
                {
                    int ix = idx++;
                    for (int j = 0; j < 100; j++)
                    {
                        fileLogger.Debug($"TEST[{ix},{j}]");
                    }
                });
            }

            foreach (Task task in taskArr)
            {
                task.Start();
            }

            Task.WaitAll(taskArr);
        }
    }
}
