using System;
using System.Collections.Generic;
using System.IO;
using Tncvd.Core.AppConfig;
using Tncvd.Logging.Logger;

namespace Tncvd.Logging.Test.Console.App.Components
{
    public class TestSafeReadLogFiles
    {
        public void Run()
        {
            Queue<string> messagesQueue = new Queue<string>();

            this.RunFileLoggerTest(messagesQueue);
            this.RunBulkFileLoggerTest(messagesQueue);

            this.WriteAllMessagesQueueToDisk(messagesQueue.ToArray());
        }

        private void WriteAllMessagesQueueToDisk(string[] messagesArr)
        {
            string outputFolderPath = EnvConfigContainer.Instance.GetEnvRelPath(
                EnvDir.Logs,
                this.GetType(),
                "__OUTPUT__");

            Directory.CreateDirectory(outputFolderPath);

            for (int i = 0; i < messagesArr.Length; i++)
            {
                string outputFilePath = Path.Combine(outputFolderPath, $"out-{i}.txt");
                File.WriteAllText(outputFilePath, messagesArr[i]);
            }
        }

        private void RunFileLoggerTest(Queue<string> messagesQueue)
        {
            using SharedFileLogger fileLogger = LoggerFactory.Instance.GetSharedFileLogger(this.GetType());
            string fileName = HelperMethods.GetLoggerFileName();

            this.RunLoggerTest(fileLogger, messagesQueue, fileName);
        }

        private void RunBulkFileLoggerTest(Queue<string> messagesQueue)
        {
            using VerboseFileLogger bulkFileLogger = LoggerFactory.Instance.GetVerboseFileLogger(this.GetType());
            string fileName = HelperMethods.GetBulkLoggerFileName(bulkFileLogger.DateCreated);

            this.RunLoggerTest(bulkFileLogger, messagesQueue, fileName);
        }

        private void RunLoggerTest(LoggerBase logger, Queue<string> messagesQueue, string fileName)
        {
            for (int i = 0; i < 10; i++)
            {
                this.RunLoggerTestStep(logger, messagesQueue, fileName, i);
            }
        }

        private void RunLoggerTestStep(LoggerBase logger, Queue<string> messagesQueue, string fileName, int idx)
        {
            string loggerFilePath = this.GetLoggerFilePath(fileName);

            int value = idx * 10;

            for (int i = 0; i < 10; i++)
            {
                logger.Debug($"TEST{value++}");

                if (i == 5)
                {
                    this.EnqueueMessage(messagesQueue, loggerFilePath);
                }
            }
        }

        private string GetLoggerFilePath(string fileName)
        {
            fileName = this.GetLoggerFileName(fileName);

            string loggerFilePath = EnvConfigContainer.Instance.GetEnvRelPath(
                EnvDir.Logs,
                this.GetType(),
                fileName);

            return loggerFilePath;
        }

        private string GetLoggerFileName(string fileName)
        {
            string extension = Path.GetExtension(fileName);
            string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(fileName);

            string retFileName = string.Concat(
                fileNameWithoutExtension,
                DateTime.Now.ToString(ConstantValues.LOGGER_FILE_NAME_DATE_FORMAT),
                extension);

            return retFileName;
        }

        private void EnqueueMessage(Queue<string> messagesQueue, string loggerFilePath)
        {
            using FileStream fileStream = new FileStream(
                loggerFilePath,
                FileMode.Open,
                FileAccess.Read,
                FileShare.ReadWrite);

            using StreamReader streamReader = new StreamReader(fileStream);
            string message = streamReader.ReadToEnd();
            messagesQueue.Enqueue(message);
        }
    }
}
