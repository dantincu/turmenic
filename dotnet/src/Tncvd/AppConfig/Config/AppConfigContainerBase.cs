using System.Configuration;
using Tncvd.Components;

namespace Tncvd.AppConfig.Config
{
    public abstract class AppConfigContainerBase<TAppConfigContainer, TAppConfigFileLoader> : InstanceContainer<TAppConfigContainer> where TAppConfigContainer : new() where TAppConfigFileLoader : AssemblyConfigFileLoaderBase, new()
    {
        public AppConfigContainerBase()
        {
            Configuration configuration = this.LoadConfiguration();
            this.InitContainerProperties(configuration);
        }

        protected abstract void InitContainerProperties(Configuration configuration);

        private Configuration LoadConfiguration()
        {
            Configuration configuration = null;

            TAppConfigFileLoader configFileLoader = new TAppConfigFileLoader();
            configuration = configFileLoader.LoadConfiguration();

            return configuration;
        }
    }
}
