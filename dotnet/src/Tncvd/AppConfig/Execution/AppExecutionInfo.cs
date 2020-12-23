using System;
using System.IO;
using System.Reflection;
using System.Xml.Serialization;
using Tncvd.Reflection;

namespace Tncvd.AppConfig.Execution
{
    public class AppExecutionInfo
    {
        private readonly AppExecutionInfoSerializable _data;

        public AppExecutionInfo(AppExecutionInfoSerializable data)
        {
            this._data = data;
        }

        public AppExecutionInfo(Assembly assembly, string tncvdEnvLocationPath)
        {
            this._data = this.GetDefaultData(assembly, tncvdEnvLocationPath);
        }

        public Guid AppExecutionId => this._data.AppExecutionId;

        public DateTime AppExecutionStartTime => this._data.AppExecutionStartTime;

        public long AppExecutionStartTimeTicks => this._data.AppExecutionStartTimeTicks;

        public string AppExecutionStartAssemblyName => this._data.AppExecutionStartAssemblyName;

        public string TncvdEnvLocationPath => this._data.TncvdEnvLocationPath;

        public void WriteInfoToFile(string outputDirPath, string outputFileName)
        {
            Directory.CreateDirectory(outputDirPath);
            string outputFilePath = Path.Combine(outputDirPath, outputFileName);

            XmlSerializer serializer = new XmlSerializer(typeof(AppExecutionInfoSerializable));
            using (StreamWriter sw = new StreamWriter(outputFilePath))
            {
                serializer.Serialize(sw, this._data);
            }
        }

        protected virtual AppExecutionInfoSerializable GetDefaultData(Assembly assembly, string tncvdEnvLocationPath)
        {
            DateTime appExecutionStartTime = DateTime.Now;

            AppExecutionInfoSerializable appExecutionInfoSerializable = new AppExecutionInfoSerializable
            {
                AppExecutionId = Guid.NewGuid(),
                AppExecutionStartTime = appExecutionStartTime,
                AppExecutionStartTimeTicks = appExecutionStartTime.Ticks,
                AppExecutionStartAssemblyName = assembly.GetAssemblyFullName(),
                TncvdEnvLocationPath = tncvdEnvLocationPath
            };

            return appExecutionInfoSerializable;
        }
    }
}
