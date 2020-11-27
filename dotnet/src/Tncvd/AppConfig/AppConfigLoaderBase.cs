namespace Tncvd.AppConfig
{
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public abstract class AppConfigLoaderBase<T> where T : ConfigurationSectionGroup
    {
        public const string EXECUTABLE_FILE_EXTENSION_NAME = "exe";
        public const string LIBRARY_FILE_EXTENSION_NAME = "dll";
        public const string CONFIG_FILE_EXTENSION_NAME = "config";

        public T Load(string sectionGroupName = null)
        {
            string configFileName = this.GetConfigFileName();
            sectionGroupName = sectionGroupName ?? this.SectionGroupName;

            T group = ConfigurationManager.OpenMappedExeConfiguration(new ExeConfigurationFileMap
            {
                ExeConfigFilename = configFileName
            }, ConfigurationUserLevel.None).SectionGroups[sectionGroupName] as T;

            return group;
        }

        protected abstract string AssemblyName { get; }

        protected abstract bool AssemblyIsExecutable { get; }

        protected abstract string SectionGroupName { get; }

        private string GetConfigFileName()
        {
            string retVal = this.AssemblyName;

            if (this.AssemblyIsExecutable)
            {
                retVal = $"{retVal}.{EXECUTABLE_FILE_EXTENSION_NAME}";
            }
            else
            {
                retVal = $"{retVal}.{LIBRARY_FILE_EXTENSION_NAME}";
            }

            retVal = $"{retVal}.{CONFIG_FILE_EXTENSION_NAME}";

            return retVal;
        }
    }
}
