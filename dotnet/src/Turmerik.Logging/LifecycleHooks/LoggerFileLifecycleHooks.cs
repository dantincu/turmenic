using Serilog.Sinks.File;
using Turmerik.Logging.LogFilesBackup;

namespace Turmerik.Logging.LifecycleHooks
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
