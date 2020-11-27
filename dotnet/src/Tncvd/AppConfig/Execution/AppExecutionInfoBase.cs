using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Tncvd.AppConfig.Execution
{
    public abstract class AppExecutionInfoBase
    {
        private const string APP_SETTINGS_ENV_LOCATION_KEY = "tncvdEnvLocationName";

        private readonly AppExecutionInfoSerializable _info;

        public AppExecutionInfoBase(string tncvdEnvLocationName = null)
        {
            this._info = this.GetInstance(tncvdEnvLocationName);
        }

        public Guid AppExecutionId => this._info.AppExecutionId;

        public DateTime AppExecutionStartTime => this._info.AppExecutionStartTime;

        public long AppExecutionStartTimeTicks => this._info.AppExecutionStartTimeTicks;

        public string AppExecutionStartAssemblyName => this._info.AppExecutionStartAssemblyName;

        public string TncvdEnvLocationName => this._info.TncvdEnvLocationName;

        public void WriteInfoToFile(string outputDirPath, string outputFileName)
        {
            Directory.CreateDirectory(outputDirPath);
            string outputFilePath = Path.Combine(outputDirPath, outputFileName);

            XmlSerializer serializer = new XmlSerializer(typeof(AppExecutionInfoSerializable));
            using (StreamWriter sw = new StreamWriter(outputFilePath))
            {
                serializer.Serialize(sw, this._info);
            }
        }

        protected virtual string GetAppExecutionStartAssemblyName()
        {
            return this.GetType().Assembly.GetName().Name;
        }

        protected virtual AppExecutionInfoSerializable GetInstance(string tncvdEnvLocationName = null)
        {
            DateTime appExecutionStartTime = DateTime.Now;

            AppExecutionInfoSerializable appExecutionInfoSerializable = new AppExecutionInfoSerializable
            {
                AppExecutionId = Guid.NewGuid(),
                AppExecutionStartTime = appExecutionStartTime,
                AppExecutionStartTimeTicks = appExecutionStartTime.Ticks,
                AppExecutionStartAssemblyName = this.GetAppExecutionStartAssemblyName(),
                TncvdEnvLocationName = tncvdEnvLocationName ?? ConfigurationManager.AppSettings[APP_SETTINGS_ENV_LOCATION_KEY],
            };

            return appExecutionInfoSerializable;
        }
    }
}
