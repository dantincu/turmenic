using Serilog.Sinks.File;
using Turmenic.Logging.LogFilesBackup;

namespace Turmenic.Logging.LifecycleHooks
{
    public class LoggerFileLifecycleHooks : FileLifecycleHooks
    {
        public override void OnFileDeleting(string path)
        {
            HelperMethods.MakeLogFileBackupCopy(
                path,
                () =>
                {
                    base.OnFileDeleting(path);
                });
        }
    }
}
