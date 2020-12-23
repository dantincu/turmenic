﻿using Serilog.Sinks.File;
using System;
using System.IO;
using Tncvd.Logging.LogFilesBackup;

namespace Tncvd.Logging.Serilog
{
    public class LoggerFileLifecycleHooks : FileLifecycleHooks
    {
        public override void OnFileDeleting(string path)
        {
            HelperMethods.TryMakeLogFileBackupCopy<IOException>(
                path,
                () =>
                {
                    base.OnFileDeleting(path);
                });
        }
    }
}