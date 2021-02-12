using System;
using System.Collections.Generic;
using Turmenic.Logging.Logger;

namespace Turmenic.Test.Console.App.Components
{
    public class TestLogger
    {
        public void Run()
        {
            using (SharedFileLogger logger = LoggerFactory.Instance.GetSharedFileLogger(GetType()))
            {
                this.RunCore(logger);
            }

            using (VerboseFileLogger logger = LoggerFactory.Instance.GetVerboseFileLogger(GetType()))
            {
                this.RunCore(logger);
            }
        }

        private void RunCore(FileLoggerBase logger)
        {
            logger.Verbose("Testing \n logger {0}, {1}", 16, new int[] { 1, 2, 3 });
            logger.Debug("Testing logger {0}, {1}", 16, new Dictionary<string, string> { { "x", "asdf" } });
            logger.Information("Testing logger {0}, {1}", 16, 32);
            logger.Warning("Testing logger {0}, {1}", 16, 32);
            logger.Error("Testing logger {0}, {1}", 16, 32);
            logger.Fatal("Testing logger {0}, {1}", 16, 32);

            logger.Error(new Exception("asdfasdf"), "Testing logger {0}, {1}", 16, 32);
            logger.Error(new Exception("asdfasdf"), "Testing logger {0}, {1}", 16, 32);
        }
    }
}
