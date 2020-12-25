using System;
using Tncvd.Reflection;

namespace Tncvd.Logging
{
    public class LoggerFactory : IDisposable
    {
        private static LoggerFactory _instance;

        private LoggerFactory()
        {
        }

        public static LoggerFactory Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new LoggerFactory();
                }

                return _instance;
            }
        }

        public FileLogger GetFileLogger(string loggerName)
        {
            FileLogger fileLogger = new FileLogger(loggerName);
            return fileLogger;
        }

        public FileLogger GetFileLogger(Type type)
        {
            FileLogger fileLogger = this.GetFileLogger(type.GetTypeFullName());

            return fileLogger;
        }

        public void Dispose()
        {
            global::Serilog.Log.CloseAndFlush();
        }
    }
}
