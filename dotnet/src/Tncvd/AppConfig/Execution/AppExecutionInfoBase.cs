using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
using Tncvd.AppConfig.Env;

namespace Tncvd.AppConfig.Execution
{
    public abstract class AppExecutionInfoBase
    {
        private readonly AppExecutionInfoSerializable _info;

        public AppExecutionInfoBase()
        {
            this._info = this.GetInstance();
        }

        public Guid AppExecutionId => this._info.AppExecutionId;

        public DateTime AppExecutionStartTime => this._info.AppExecutionStartTime;

        public long AppExecutionStartTimeTicks => this._info.AppExecutionStartTimeTicks;

        public string AppExecutionStartAssemblyName => this._info.AppExecutionStartAssemblyName;

        public string TncvdEnvLocationPath => this._info.TncvdEnvLocationPath;

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

        protected virtual AppExecutionInfoSerializable GetInstance()
        {
            DateTime appExecutionStartTime = DateTime.Now;

            AppExecutionInfoSerializable appExecutionInfoSerializable = new AppExecutionInfoSerializable
            {
                AppExecutionId = Guid.NewGuid(),
                AppExecutionStartTime = appExecutionStartTime,
                AppExecutionStartTimeTicks = appExecutionStartTime.Ticks,
                AppExecutionStartAssemblyName = this.GetAppExecutionStartAssemblyName(),
                TncvdEnvLocationPath = AppEnvConfigContainer.Instance.EnvRootPath,
            };

            return appExecutionInfoSerializable;
        }
    }
}
