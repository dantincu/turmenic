using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            string loggerName = type.FullName;
            FileLogger fileLogger = this.GetFileLogger(loggerName);

            return fileLogger;
        }

        public void CloseAndFlushGlobal()
        {
            Serilog.Log.CloseAndFlush();
        }
    }
}
