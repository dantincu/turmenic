using Tncvd.AppConfig.Config.Data.Base;
using Tncvd.AppConfig.Utility.Readonly;

namespace Tncvd.AppConfig.Config.Data
{
    public class SpecialDirDelimiters : SettingsDataBase
    {
        public SpecialDirDelimiters(Settings.SettingElementCollection settingElementCollection) : base(settingElementCollection)
        {
        }

        public SettingElementReadonly L1DirNameStartDelimiter { get; protected set; }
        public SettingElementReadonly L1DirNameEndDelimiter { get; protected set; }
        public SettingElementReadonly L1DirNameSegmentsDelimiter { get; protected set; }
        public SettingElementReadonly L2DirNameStartDelimiter { get; protected set; }
        public SettingElementReadonly L2DirNameEndDelimiter { get; protected set; }
    }
}
