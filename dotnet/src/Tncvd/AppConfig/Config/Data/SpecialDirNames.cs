using Tncvd.AppConfig.Config.Data.Base;
using Tncvd.AppConfig.Config.Settings;
using Tncvd.AppConfig.Utility.Readonly;

namespace Tncvd.AppConfig.Config.Data
{
    public class SpecialDirNames : SettingsDataBase
    {
        public SpecialDirNames(Settings.SettingElementCollection settingElementCollection) : base(settingElementCollection)
        {
        }

        public SettingElementReadonly People { get; protected set; }
        public SettingElementReadonly Shared { get; protected set; }
        public SettingElementReadonly Archive { get; protected set; }
        public SettingElementReadonly Content { get; protected set; }
        public SettingElementReadonly Files { get; protected set; }
        public SettingElementReadonly Images { get; protected set; }
        public SettingElementReadonly ImagesDocs { get; protected set; }
        public SettingElementReadonly WebFiles { get; protected set; }
        public SettingElementReadonly EDocs { get; protected set; }
        public SettingElementReadonly PhotoDocs { get; protected set; }
        public SettingElementReadonly PhotoImages { get; protected set; }
        public SettingElementReadonly InfoPhotoDocs { get; protected set; }
        public SettingElementReadonly InfoPhotoImages { get; protected set; }
        public SettingElementReadonly DocumentScanDocs { get; protected set; }
        public SettingElementReadonly DocumentScanImages { get; protected set; }
        public SettingElementReadonly DocumentPhotoDocs { get; protected set; }
        public SettingElementReadonly DocumentPhotoImages { get; protected set; }
        public SettingElementReadonly DocumentProcessedPhotoDocs { get; protected set; }
        public SettingElementReadonly DocumentProcessedPhotoImages { get; protected set; }
    }
}
