using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tncvd.AppConfig.Config.Env
{
    public class EnvLocationsSection : ConfigurationSection
    {
        private const string LOCATIONS_KEY = "locations";

        [ConfigurationProperty(LOCATIONS_KEY, IsDefaultCollection = true)]
        public EnvLocationElementCollection Locations
        {
            get
            {
                EnvLocationElementCollection retInstance = null;
                if (this[LOCATIONS_KEY] != null)
                {
                    retInstance = (EnvLocationElementCollection)this[LOCATIONS_KEY];
                }
                return retInstance;
            }

            set
            {
                this[LOCATIONS_KEY] = value;
            }
        }
    }
}
