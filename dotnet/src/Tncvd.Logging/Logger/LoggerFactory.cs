using System;
using Tncvd.Core.Reflection;

namespace Tncvd.Logging.Logger
{
    public class LoggerFactory : IDisposable
    {
        private static LoggerFactory instance;

        private bool disposed;

        private LoggerFactory()
        {
            disposed = false;
        }

        public static LoggerFactory Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new LoggerFactory();
                }

                return instance;
            }
        }

        public FileLogger GetFileLogger(string loggerName)
        {
            FileLogger fileLogger = new FileLogger(loggerName);
            return fileLogger;
        }

        public FileLogger GetFileLogger(Type type)
        {
            FileLogger fileLogger = GetFileLogger(type.GetTypeFullName());
            return fileLogger;
        }

        public BulkFileLogger GetBulkFileLogger(string loggerName)
        {
            BulkFileLogger fileLogger = new BulkFileLogger(loggerName);
            return fileLogger;
        }

        public BulkFileLogger GetBulkFileLogger(Type type)
        {
            BulkFileLogger fileLogger = GetBulkFileLogger(type.GetTypeFullName());
            return fileLogger;
        }

        public void Dispose()
        {
            if (disposed == false)
            {
                this.DisposeCore();
                disposed = true;
            }
        }

        protected void DisposeCore()
        {
            Serilog.Log.CloseAndFlush();
        }
    }
}
