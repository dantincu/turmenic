using System;
using Turmenic.Core.Reflection;

namespace Turmenic.Logging.Logger
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

        public SharedFileLogger GetSharedFileLogger(string loggerName)
        {
            SharedFileLogger fileLogger = new SharedFileLogger(loggerName);
            return fileLogger;
        }

        public SharedFileLogger GetSharedFileLogger(Type type)
        {
            SharedFileLogger fileLogger = GetSharedFileLogger(type.GetTypeFullName());
            return fileLogger;
        }

        public VerboseFileLogger GetVerboseFileLogger(string loggerName)
        {
            VerboseFileLogger fileLogger = new VerboseFileLogger(loggerName);
            return fileLogger;
        }

        public VerboseFileLogger GetVerboseFileLogger(Type type)
        {
            VerboseFileLogger fileLogger = GetVerboseFileLogger(type.GetTypeFullName());
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
