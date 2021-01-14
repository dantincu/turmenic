using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Tncvd.Core.AppConfig;
using Tncvd.Test.Attributes;
using Xunit;

namespace Tncvd.Logging.Test.Xunit.UnitTests
{
    [TestCaseOrderer("Tncvd.Test.Xunit.Components.Fk.PriorityOrderer", "Tncvd.Test.Xunit")]
    public class LogFileBackupUnitTest
    {
        private const string TEST_FILE_NAME = "TEST.TEMP.txt";
        private const string SOURCE_FILE_SAMPLE_TEXT_CONTENT = "<TEST />";
        private const string DESTINATION_FILE_SAMPLE_TEXT_CONTENT = "<TEST></TEST>";

        private readonly string _sourceTestFilePath;
        private readonly string _destinationTestFilePath;

        public LogFileBackupUnitTest()
        {
            AppStart.Start();
            this.AssureLoggerDir();
            this._sourceTestFilePath = this.GetSourceTestFilePath();
            this._destinationTestFilePath = this.GetDestinationTestFilePath();
        }

        [Fact]
        [TestPriority(1)]
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
        [TestPriority(2)]
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
        [TestPriority(3)]
        public void TestFileCopyUNewThread()
        {
            this.AssureSourceTestFile();
            this.AssureDestinationTestFileDeleted();

            bool success = false;
            Thread thread = Core.FileSystem.HelperMethods.CopyFileUNewThread(this._sourceTestFilePath, this._destinationTestFilePath, () =>
            {
                success = true;
            });
            thread.Join();
            this.AssertDestinationFileHasCorrectContent();
            Assert.True(success);
        }

        private string GetSourceTestFilePath()
        {
            string logsFilePath = EnvConfigContainer.Instance.GetEnvRelPath(
                EnvDir.Logs,
                this.GetType(),
                TEST_FILE_NAME);

            return logsFilePath;
        }

        private string GetDestinationTestFilePath()
        {
            string destinationTestFilePath = EnvConfigContainer.Instance.GetEnvRelPath(
                EnvDir.Logs,
                this.GetType(),
                LibConfigContainer.Instance.Config.SpecialDirs.Names.Archive.Val,
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

        private void AssureLoggerDir()
        {
            string dirPath = EnvConfigContainer.Instance.GetEnvRelPath(EnvDir.Logs, this.GetType());
            Directory.CreateDirectory(dirPath);
        }
    }
}
