using System;
using System.IO;
using Tncvd.Core.Components;
using Sz_Js_HpMt = Tncvd.Core.Serialization.JsonHelperMethods;

namespace Tncvd.Core.AppConfig
{
    public abstract class ConfigContainerBase<TConfig, TData> where TConfig : ReadonlyData<TData>
    {
        protected ConfigContainerBase()
        {
            this.BasePath = this.GetBasePath();
            this.Config = this.GetConfig();
        }

        public TConfig Config { get; }

        public string BasePath { get; }

        protected abstract string ConfigFileName { get; }

        protected abstract string GetBasePath();

        private string GetConfigFilePath()
        {
            string configFilePath = Path.Combine(this.BasePath, this.ConfigFileName);
            return configFilePath;
        }

        private TConfig GetConfig()
        {
            string configFilePath = this.GetConfigFilePath();

            TData configSrlz = Sz_Js_HpMt.DeserializeJson<TData>(configFilePath);
            TConfig config = Activator.CreateInstance(typeof(TConfig), configSrlz) as TConfig;

            return config;
        }
    }
}
