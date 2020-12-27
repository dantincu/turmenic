using System.Configuration;
using Tncvd.AppConfig.Config.Data;
using Tncvd.AppConfig.Config.SpecialDirs;
using Tncvd.AppConfig.Utility;

namespace Tncvd.AppConfig.Config
{
    public class AppConfigContainer : AppConfigContainerBase<AppConfigFileLoader>
    {
        private static AppConfigContainer _instance;

        private AppConfigContainer()
        {
        }

        public static AppConfigContainer Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new AppConfigContainer();
                }

                return _instance;
            }
        }

        public SpecialDirDelimiters SpecialDirDelimiters { get; private set; }
        public SpecialDirNames SpecialDirNames { get; private set; }

        protected override void InitContainerProperties(Configuration configuration)
        {
            SettingsSectionGroup sectionGroup = configuration.GetConfigurationSectionGroup<SettingsSectionGroup>();
            SpecialDirsSection section = sectionGroup.SpecialDirsSection;

            this.SpecialDirDelimiters = new SpecialDirDelimiters(section.SpecialDirDelimiters);
            this.SpecialDirNames = new SpecialDirNames(section.SpecialDirNames);
        }
    }
}
