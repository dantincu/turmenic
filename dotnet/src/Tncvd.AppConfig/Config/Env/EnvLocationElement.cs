using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tncvd.AppConfig.Config.Env
{
    public class EnvLocationElement : ConfigurationElement
    {
        public const string DEV_LOCATION_NAME = "dev";
        public const string DEBUG_LOCATION_NAME = "debug";
        public const string TEST_LOCATION_NAME = "test";
        public const string PROD_LOCATION_NAME = "prod";

        private const string NAME_KEY = "name";
        private const string PATH_KEY = "path";

        private const string DEFAULT_CONFIG_DIR_NAME = "config";
        private const string DEFAULT_LOGS_DIR_NAME = "logs";
        private const string DEFAULT_DATA_DIR_NAME = "data";
        private const string DEFAULT_CONTENT_DIR_NAME = "content";
        private const string DEFAULT_METADATA_DIR_NAME = "metadata";
        private const string DEFAULT_TEMP_DIR_NAME = "temp";

        private const string CONFIG_DIR_KEY = "_config";
        private const string LOGS_DIR_KEY = "logs";
        private const string DATA_DIR_KEY = "data";
        private const string CONTENT_DIR_KEY = "content";
        private const string METADATA_DIR_KEY = "metadata";
        private const string TEMP_DIR_KEY = "temp";

        [ConfigurationProperty(NAME_KEY, DefaultValue = DEV_LOCATION_NAME, IsKey = true, IsRequired = true)]
        public string Name
        {
            get
            {
                string retVal = (string)this[NAME_KEY];
                return retVal;
            }

            set
            {
                this[NAME_KEY] = value;
            }
        }

        [ConfigurationProperty(PATH_KEY, DefaultValue = "", IsKey = false, IsRequired = true)]
        public string Path
        {
            get
            {
                string retVal = (string)this[PATH_KEY];
                return retVal;
            }

            set
            {
                this[PATH_KEY] = value;
            }
        }

        [ConfigurationProperty(CONFIG_DIR_KEY, DefaultValue = DEFAULT_CONFIG_DIR_NAME, IsKey = false, IsRequired = false)]
        public string ConfigDir
        {
            get
            {
                string retVal = (string)this[CONFIG_DIR_KEY];
                return retVal;
            }

            set
            {
                this[CONFIG_DIR_KEY] = value;
            }
        }

        [ConfigurationProperty(LOGS_DIR_KEY, DefaultValue = DEFAULT_LOGS_DIR_NAME, IsKey = false, IsRequired = false)]
        public string LogsDir
        {
            get
            {
                string retVal = (string)this[LOGS_DIR_KEY];
                return retVal;
            }

            set
            {
                this[LOGS_DIR_KEY] = value;
            }
        }

        [ConfigurationProperty(DATA_DIR_KEY, DefaultValue = DEFAULT_DATA_DIR_NAME, IsKey = false, IsRequired = false)]
        public string DataDir
        {
            get
            {
                string retVal = (string)this[DATA_DIR_KEY];
                return retVal;
            }

            set
            {
                this[DATA_DIR_KEY] = value;
            }
        }

        [ConfigurationProperty(CONTENT_DIR_KEY, DefaultValue = DEFAULT_CONTENT_DIR_NAME, IsKey = false, IsRequired = false)]
        public string ContentDir
        {
            get
            {
                string retVal = (string)this[CONTENT_DIR_KEY];
                return retVal;
            }

            set
            {
                this[CONTENT_DIR_KEY] = value;
            }
        }

        [ConfigurationProperty(METADATA_DIR_KEY, DefaultValue = DEFAULT_METADATA_DIR_NAME, IsKey = false, IsRequired = false)]
        public string MetadataDir
        {
            get
            {
                string retVal = (string)this[METADATA_DIR_KEY];
                return retVal;
            }

            set
            {
                this[METADATA_DIR_KEY] = value;
            }
        }

        [ConfigurationProperty(TEMP_DIR_KEY, DefaultValue = DEFAULT_TEMP_DIR_NAME, IsKey = false, IsRequired = false)]
        public string TempDir
        {
            get
            {
                string retVal = (string)this[TEMP_DIR_KEY];
                return retVal;
            }

            set
            {
                this[TEMP_DIR_KEY] = value;
            }
        }
    }
}
