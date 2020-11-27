using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Tncvd.AppConfig.Execution
{
    public abstract class AppExecutionInfoBase
    {
        private const string APP_SETTINGS_ENV_LOCATION_KEY = "tncvdEnvLocationName";

        public AppExecutionInfoBase(string tncvdEnvLocationName = null)
        {
            this.AppExecutionId = Guid.NewGuid();
            this.AppExecutionStartTime = DateTime.Now;
            this.AppExecutionStartAssemblyName = this.GetAppExecutionStartAssemblyName();

            this.TncvdEnvLocationName = tncvdEnvLocationName ?? ConfigurationManager.AppSettings[APP_SETTINGS_ENV_LOCATION_KEY];
        }

        public Guid AppExecutionId { get; }

        public DateTime AppExecutionStartTime { get; }

        public string AppExecutionStartAssemblyName { get; }

        public string TncvdEnvLocationName { get; }

        protected virtual string GetAppExecutionStartAssemblyName()
        {
            return this.GetType().Assembly.GetName().Name;
        }
    }
}
