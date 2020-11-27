using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tncvd.AppConfig
{
    public abstract class AppEnvConfigContainerBase<T> where T : ConfigurationSectionGroup
    {
        private T _sectionGroup;

        public T SectionGroup
        {
            get
            {
                if (this._sectionGroup == null)
                {
                    this._sectionGroup = this.GetSectionGroup();
                }

                return this._sectionGroup;
            }
        }

        protected abstract T GetSectionGroup();
    }

    public class AppEnvConfigContainerBase<T, TLoader> : AppEnvConfigContainerBase<T> where T : ConfigurationSectionGroup where TLoader : AppConfigLoaderBase<T>
    {
        protected override T GetSectionGroup()
        {
            T group = null;
            TLoader loader = Activator.CreateInstance<TLoader>();

            group = loader.Load();
            return group;
        }
    }
}
