using Serilog.Sinks.File;

namespace Tncvd.Logging.Serilog
{
    public class LoggerFileLifecycleHooks : FileLifecycleHooks
    {
        public override void OnFileDeleting(string path)
        {
            base.OnFileDeleting(path);
        }
    }
}
