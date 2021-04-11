using System;
using System.IO;
using System.Threading.Tasks;
using Turmerik.Core.AppConfig;

namespace Turmerik.Logging.LogFilesBackup
{
    public static class HelperMethods
    {
        public static Task MakeLogFileBackupCopy(string logFilePath, Action logFileCopySuccessCallback, bool overwrite = false)
        {
            string logFileFolderPath = AssureLogFileBackupFolder(logFilePath);
            string logFileBackupFilePath = Core.FileSystem.HelperMethods.GetDefaultDestinationFilePath(logFilePath, logFileFolderPath);

            Task task = Core.FileSystem.HelperMethods.CopyFileAsync(logFilePath, logFileBackupFilePath, logFileCopySuccessCallback, overwrite);
            return task;
        }

        public static string GetLogFileBackupFolder(string logFilePath)
        {
            string logFileFolderPath = Path.GetDirectoryName(logFilePath);
            logFileFolderPath = Path.Combine(logFileFolderPath, LibConfigContainer.Instance.Config.SpecialDirs.Names.Archive.Val);

            return logFileFolderPath;
        }

        public static string AssureLogFileBackupFolder(string logFilePath)
        {
            string logFileFolderPath = GetLogFileBackupFolder(logFilePath);
            Core.FileSystem.HelperMethods.AssureDirectory(logFileFolderPath);

            return logFileFolderPath;
        }
    }
}
