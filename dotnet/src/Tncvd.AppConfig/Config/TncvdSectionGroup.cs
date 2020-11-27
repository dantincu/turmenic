﻿namespace Tncvd.AppConfig.Config
{
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Tncvd.AppConfig.Config.Env;

    public class TncvdSectionGroup : ConfigurationSectionGroup
    {
        private const string ENV_LOCATIONS_KEY = "envLocations";

        [ConfigurationProperty(ENV_LOCATIONS_KEY, IsRequired = false)]
        public EnvLocationsSection EnvSection
        {
            get { return (EnvLocationsSection)Sections[ENV_LOCATIONS_KEY]; }
        }
    }
}
