using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tncvd.AppConfig
{
    public abstract class AppConfigLoaderBase<T> where T : ConfigurationSectionGroup
    {
        public const string DEFAULT_SECTION_GROUP_NAME = "tncvd";

        // This property only needs to be defined here, in one place, because it will return the inheriting type's assembly at runtime
        protected string AssemblyName => this.GetType().Assembly.GetName().Name; 

        protected virtual string SectionGroupName => DEFAULT_SECTION_GROUP_NAME;

        public T Load(string sectionGroupName = null)
        {
            T retInstance;

            sectionGroupName = sectionGroupName ?? this.SectionGroupName;
            Configuration config = this.LoadConfiguration();

            retInstance = config?.SectionGroups[sectionGroupName] as T;
            return retInstance;
        }

        protected abstract Configuration LoadConfiguration();
    }
}
