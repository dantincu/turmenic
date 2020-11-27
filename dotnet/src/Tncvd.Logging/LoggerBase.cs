﻿using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tncvd.Logging
{
    public abstract class LoggerBase : IDisposable
    {
        public LoggerBase(string loggerName)
        {
            this.LoggerName = loggerName;
            this.Logger = this.GetLoggerInstance(loggerName);
        }

        protected Serilog.Core.Logger Logger { get; }

        protected string LoggerName { get; }

        protected abstract Serilog.Core.Logger GetLoggerInstance(string loggerName);

        public void Verbose(string messageTemplate, params object[] propertyValues)
        {
            this.Logger.Verbose(messageTemplate, propertyValues);
        }

        public void Debug(string messageTemplate, params object[] propertyValues)
        {
            this.Logger.Debug(messageTemplate, propertyValues);
        }

        public void Information(string messageTemplate, params object[] propertyValues)
        {
            this.Logger.Information(messageTemplate, propertyValues);
        }

        public void Warning(string messageTemplate, params object[] propertyValues)
        {
            this.Logger.Warning(messageTemplate, propertyValues);
        }

        public void Error(string messageTemplate, params object[] propertyValues)
        {
            this.Logger.Error(messageTemplate, propertyValues);
        }

        public void Fatal(string messageTemplate, params object[] propertyValues)
        {
            this.Logger.Fatal(messageTemplate, propertyValues);
        }

        public void Verbose(Exception ex, string messageTemplate, params object[] propertyValues)
        {
            this.Logger.Verbose(ex, messageTemplate, propertyValues);
        }

        public void Debug(Exception ex, string messageTemplate, params object[] propertyValues)
        {
            this.Logger.Debug(ex, messageTemplate, propertyValues);
        }

        public void Information(Exception ex, string messageTemplate, params object[] propertyValues)
        {
            this.Logger.Information(ex, messageTemplate, propertyValues);
        }

        public void Warning(Exception ex, string messageTemplate, params object[] propertyValues)
        {
            this.Logger.Warning(ex, messageTemplate, propertyValues);
        }

        public void Error(Exception ex, string messageTemplate, params object[] propertyValues)
        {
            this.Logger.Error(ex, messageTemplate, propertyValues);
        }

        public void Fatal(Exception ex, string messageTemplate, params object[] propertyValues)
        {
            this.Logger.Fatal(ex, messageTemplate, propertyValues);
        }

        public void Dispose()
        {
            this.Logger.Dispose();
        }
    }
}
