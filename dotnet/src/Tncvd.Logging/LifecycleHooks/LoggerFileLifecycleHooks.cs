﻿using Serilog.Sinks.File;
using Tncvd.Logging.LogFilesBackup;

namespace Tncvd.Logging.LifecycleHooks
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
