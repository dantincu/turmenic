using Tncvd.Core.DataTypes;

namespace Tncvd.Core.AppConfig
{
    public abstract class LibConfigContainerBase<TConfig, TData> : ConfigContainerBase<TConfig, TData> where TConfig : ReadonlyData<TData>
    {
        protected override string ConfigFileName => "lib.jsconfig.json";

        protected override string GetBasePath()
        {
            string basePath = EnvConfigContainer.Instance.GetEnvRelPath(EnvDir.Config, this.GetType().Assembly);
            return basePath;
        }
    }
}
