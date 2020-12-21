using Tncvd.AppConfig.Config.Data.Base;
using Tncvd.AppConfig.Config.Settings.Simple;
using Tncvd.AppConfig.Utility.Readonly.Simple;

namespace Tncvd.AppConfig.Env.Data
{
    public class EnvDirNames : SettingsDataBase
    {
        public EnvDirNames(SimpleSettingElementCollection settingElementCollection) : base(settingElementCollection)
        {
        }

        public SimpleSettingElementReadonly Config { get; protected set; }
        public SimpleSettingElementReadonly Content { get; protected set; }
        public SimpleSettingElementReadonly Data { get; protected set; }
        public SimpleSettingElementReadonly Logs { get; protected set; }
        public SimpleSettingElementReadonly Metadata { get; protected set; }
        public SimpleSettingElementReadonly Temp { get; protected set; }
    }
}
