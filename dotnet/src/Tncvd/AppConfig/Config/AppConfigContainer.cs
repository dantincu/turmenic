using System;
using System.Collections.Generic;
using System.Configuration;
using System.Text;
using Tncvd.AppConfig.Config.Data;
using Tncvd.AppConfig.Config.SpecialDirs;
using Tncvd.AppConfig.Utility;
using Tncvd.Components;

namespace Tncvd.AppConfig.Config
{
    public class AppConfigContainer : InstanceContainer<AppConfigContainer>
    {
        public AppConfigContainer()
        {
            Configuration configuration = this.LoadConfiguration();
            this.InitSpecialDirs(configuration);
        }

        public SpecialDirDelimiters SpecialDirDelimiters { get; private set; }
        public SpecialDirNames SpecialDirNames { get; private set; }

        private Configuration LoadConfiguration()
        {
            Configuration configuration = null;

            AppConfigFileLoader configFileLoader = new AppConfigFileLoader();
            configuration = configFileLoader.LoadConfiguration();

            return configuration;
        }

        private void InitSpecialDirs(Configuration configuration)
        {
            SettingsSectionGroup sectionGroup = configuration.GetConfigurationSectionGroup<SettingsSectionGroup>();
            SpecialDirsSection section = sectionGroup.SpecialDirsSection;

            this.SpecialDirDelimiters = new SpecialDirDelimiters(section.SpecialDirDelimiters);
            this.SpecialDirNames = new SpecialDirNames(section.SpecialDirNames);
        }
    }
}
