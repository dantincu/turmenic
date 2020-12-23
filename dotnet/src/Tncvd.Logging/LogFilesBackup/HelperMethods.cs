using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Tncvd.AppConfig.Config;

namespace Tncvd.Logging.LogFilesBackup
{
    public static class HelperMethods
    {
        public static Task TryMakeLogFileBackupCopy(string logFilePath, Action logFileCopySuccessCallback, params Type[] excTypeToCatchArr)
        {
            Task task;

            try
            {
                task = MakeLogFileBackupCopy(logFilePath, logFileCopySuccessCallback);
            }
            catch (Exception ex)
            {
                if (excTypeToCatchArr.Any(exc => exc.IsAssignableFrom(ex.GetType())) == false)
                {
                    throw;
                }
                else
                {
                    task = Task.FromException(ex);
                }
            }

            return task;
        }

        public static Task TryMakeLogFileBackupCopy<TCaughtExceptionType>(string logFilePath, Action logFileCopySuccessCallback) where TCaughtExceptionType : Exception
        {
            Task task;

            try
            {
                task = MakeLogFileBackupCopy(logFilePath, logFileCopySuccessCallback);
            }
            catch (TCaughtExceptionType ex)
            {
                task = Task.FromException(ex);
            }

            return task;
        }

        public static Task MakeLogFileBackupCopy(string logFilePath, Action logFileCopySuccessCallback)
        {
            string logFileFolderPath = AssureLogFileBackupFolder(logFilePath);
            string logFileBackupFilePath = FileSystem.HelperMethods.GetDefaultDestinationFilePath(logFilePath, logFileFolderPath);

            Task task = FileSystem.HelperMethods.CopyFileAsync(logFilePath, logFileBackupFilePath, logFileCopySuccessCallback);
            return task;
        }

        public static string GetLogFileBackupFolder(string logFilePath)
        {
            string logFileFolderPath = Path.GetDirectoryName(logFilePath);
            logFileFolderPath = Path.Combine(logFileFolderPath, AppConfigContainer.Instance.SpecialDirNames.Archive.Value);

            return logFileFolderPath;
        }

        public static string AssureLogFileBackupFolder(string logFilePath)
        {
            string logFileFolderPath = GetLogFileBackupFolder(logFilePath);
            FileSystem.HelperMethods.AssureDirectory(logFileFolderPath);

            return logFileFolderPath;
        }
    }
}
