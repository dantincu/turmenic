using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Tncvd.AppConfig.Config;

namespace Tncvd.Logging.LogFilesBackup
{
    public static class HelperMethods
    {
        public static Task MakeLogFileBackupCopy(string logFilePath, Action logFileCopySuccessCallback, bool overwrite = false)
        {
            string logFileFolderPath = AssureLogFileBackupFolder(logFilePath);
            string logFileBackupFilePath = FileSystem.HelperMethods.GetDefaultDestinationFilePath(logFilePath, logFileFolderPath);

            Task task = FileSystem.HelperMethods.CopyFileAsync(logFilePath, logFileBackupFilePath, logFileCopySuccessCallback, overwrite);
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
