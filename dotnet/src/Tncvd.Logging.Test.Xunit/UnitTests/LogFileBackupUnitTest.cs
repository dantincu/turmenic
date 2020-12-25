using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Tncvd.AppConfig.Config;
using Tncvd.AppConfig.Env;
using Tncvd.Logging.Test.Xunit.AppExecution;
using Tncvd.Testing.UnitTests;
using Xunit;

namespace Tncvd.Logging.Test.Xunit.UnitTests
{
    public class LogFileBackupUnitTest : UnitTestBase
    {
        private const string TEST_FILE_NAME = "TEST.TEMP.txt";
        private const string SOURCE_FILE_SAMPLE_TEXT_CONTENT = "<TEST />";
        private const string DESTINATION_FILE_SAMPLE_TEXT_CONTENT = "<TEST></TEST>";

        private readonly string _sourceTestFilePath;
        private readonly string _destinationTestFilePath;

        public LogFileBackupUnitTest()
        {
            this._sourceTestFilePath = this.GetSourceTestFilePath();
            this._destinationTestFilePath = this.GetDestinationTestFilePath();
        }

        static LogFileBackupUnitTest()
        {
            new AppExecutionInfoRegistrar().Register();
        }

        [Fact]
        public void TestMakeLogFileBackup()
        {
            this.AssureSourceTestFile();
            this.AssureDestinationTestFileDeleted();

            bool success = false;
            this.AwaitTaskThenPerformAssertions(LogFilesBackup.HelperMethods.MakeLogFileBackupCopy(this._sourceTestFilePath, () =>
            {
                success = true;
            }), (task) =>
            {
                this.AssertDestinationFileHasCorrectContent();
            });
            Assert.True(success);
        }

        [Fact]
        public void TestMakeLogFileBackupOverwrite()
        {
            this.AssureSourceTestFile();
            this.AssureDestinationTestFile();

            bool success = false;
            this.AwaitTaskThenPerformAssertions(LogFilesBackup.HelperMethods.MakeLogFileBackupCopy(this._sourceTestFilePath, () =>
            {
                success = true;
            }, true), (task) =>
            {
                this.AssertDestinationFileHasCorrectContent();
            });
            Assert.True(success);
        }

        [Fact]
        public void TestFileCopyUNewThread()
        {
            this.AssureSourceTestFile();
            this.AssureDestinationTestFileDeleted();

            bool success = false;
            Thread thread = FileSystem.HelperMethods.CopyFileUNewThread(this._sourceTestFilePath, this._destinationTestFilePath, () =>
            {
                success = true;
            });
            thread.Join();
            this.AssertDestinationFileHasCorrectContent();
            Assert.True(success);
        }

        private string GetSourceTestFilePath()
        {
            string logsFilePath = AppEnvConfigContainer.Instance.GetEnvLogsPath(
                this.GetType(),
                TEST_FILE_NAME);

            return logsFilePath;
        }

        private string GetDestinationTestFilePath()
        {
            string destinationTestFilePath = AppEnvConfigContainer.Instance.GetEnvLogsPath(
                this.GetType(),
                AppConfigContainer.Instance.SpecialDirNames.Archive.Value,
                TEST_FILE_NAME);

            return destinationTestFilePath;
        }

        private void AssureSourceTestFile()
        {
            if (File.Exists(this._sourceTestFilePath) == false)
            {
                File.WriteAllText(this._sourceTestFilePath, SOURCE_FILE_SAMPLE_TEXT_CONTENT);
            }
        }

        private void AssureDestinationTestFile()
        {
            if (File.Exists(this._destinationTestFilePath))
            {
                File.Delete(this._destinationTestFilePath);
            }

            File.WriteAllText(this._destinationTestFilePath, DESTINATION_FILE_SAMPLE_TEXT_CONTENT);
        }

        private void AssureDestinationTestFileDeleted()
        {
            if (File.Exists(this._destinationTestFilePath))
            {
                File.Delete(this._destinationTestFilePath);
            }
        }

        private void AwaitTaskThenPerformAssertions(Task task, Action<Task> assertions)
        {
            task.Wait();
            assertions.Invoke(task);
        }

        private void AssertDestinationFileHasCorrectContent()
        {
            string destinationFileContent = File.ReadAllText(
                    this._destinationTestFilePath);

            Assert.True(File.Exists(
                this._destinationTestFilePath) && File.ReadAllText(
                    this._destinationTestFilePath) == SOURCE_FILE_SAMPLE_TEXT_CONTENT);
        }
    }
}
