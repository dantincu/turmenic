using System;
using System.IO;
using System.Reflection;
using Tncvd.Core.Reflection;

namespace Tncvd.Core.AppConfig.ExecutionInfo
{
    public class AppExecutionInfoContainer
    {
        private static AppExecutionInfoContainer instance;

        private AppExecutionInfoContainer()
        {
        }

        public static AppExecutionInfoContainer Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new AppExecutionInfoContainer();
                }

                return instance;
            }
        }

        public AppExecutionInfo Info { get; private set; }

        public void Register(Assembly appStartAssembly)
        {
            this.AssureNotRegistered();

            AppExecutionInfo info = this.GetAppExecutionInfo(appStartAssembly);
            this.Info = info;

            this.WriteAppExecutionInfo(info);
        }

        private void WriteAppExecutionInfo(AppExecutionInfo info)
        {
            string filePath = this.GetAppExecutionInfoOutputFilePath(info);
            Serialization.HelperMethods.SerializeJson(info, filePath);
        }

        private string GetAppExecutionInfoOutputFilePath(AppExecutionInfo info)
        {
            string dirPath = this.AssureAppExecutionInfoOutputDirPath(info);
            string fileName = this.GetAppExecutionInfoOutputFileName(info);

            string filePath = Path.Combine(dirPath, fileName);
            return filePath;
        }

        private string AssureAppExecutionInfoOutputDirPath(AppExecutionInfo info)
        {
            string dirPath = EnvConfigContainer.Instance.GetEnvRelPath(EnvDir.Metadata, info.AppExecutionStartAssemblyName);

            Directory.CreateDirectory(dirPath);
            return dirPath;
        }

        private string GetAppExecutionInfoOutputFileName(AppExecutionInfo info)
        {
            string fileName = $"app-info-{info.AppExecutionStartTimeTicks}-{info.AppExecutionId}.json";
            return fileName;
        }

        private AppExecutionInfo GetAppExecutionInfo(Assembly appStartAssembly)
        {
            DateTime dateTime = DateTime.Now;

            AppExecutionInfoSrlz data = new AppExecutionInfoSrlz
            {
                AppExecutionId = Guid.NewGuid(),
                AppExecutionStartAssemblyName = appStartAssembly.GetAssemblyFullName(),
                AppExecutionStartTime = dateTime,
                AppExecutionStartTimeTicks = dateTime.Ticks
            };

            AppExecutionInfo info = new AppExecutionInfo(data);
            return info;
        }

        private void AssureNotRegistered()
        {
            if (this.Info != null)
            {
                throw new InvalidOperationException("The app execution info cannot be registered twice");
            }
        }
    }
}
