using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tncvd.Reflection;

namespace Tncvd.Logging
{
    public class LoggerFactory
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
            FileLogger fileLogger = this.GetFileLogger(type);

            return fileLogger;
        }

        public void CloseAndFlushGlobal()
        {
            global::Serilog.Log.CloseAndFlush();
        }
    }
}
