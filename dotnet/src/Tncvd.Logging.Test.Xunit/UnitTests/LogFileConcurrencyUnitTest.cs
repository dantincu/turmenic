using Tncvd.Logging.Test.Xunit.Components;
using Xunit;

namespace Tncvd.Logging.Test.Xunit.UnitTests
{
    public class LogFileConcurrencyUnitTest
    {
        public LogFileConcurrencyUnitTest()
        {
            AppStart.Start();
        }

        [Fact]
        public void TestSafeReadLogFiles()
        {
            new TestSafeReadLogFiles().Run();
        }

        [Fact]
        public void TestLogFileConcurrentAccess()
        {
            new TestLogFileConcurrentAccess().Run();
        }
    }
}
