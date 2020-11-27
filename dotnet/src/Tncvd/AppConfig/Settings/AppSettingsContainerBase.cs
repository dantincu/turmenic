using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tncvd.AppConfig.Config.Settings;
using Tncvd.Utility;

namespace Tncvd.AppConfig.Settings
{
    public abstract class AppSettingsContainerBase<TLoader> : AppConfigContainerBase<TncvdSettingsSectionGroup, TLoader> where TLoader : AppSettingsLoaderBase
    {
        private SettingElement[] _settings;

        public T GetValueOrDefault<T>(string name, bool rethrowError = true)
        {
            T retVal;

            string value = this.GetValue(name);
            if (string.IsNullOrWhiteSpace(value) == false)
            {
                retVal = DataTypesConverterHelper.Instance.TryConvertFromString<T>(value, rethrowError);
            }
            else
            {
                retVal = default;
            }

            return retVal;
        }

        public T GetValue<T>(string name, bool rethrowError = true)
        {
            T retVal;

            string value = this.GetValue(name);
            if (string.IsNullOrWhiteSpace(value) == false)
            {
                retVal = DataTypesConverterHelper.Instance.TryConvertFromString<T>(value, rethrowError);
            }
            else
            {
                retVal = default;
                throw new ArgumentException($"No settings value found for settings name {name} or the value is null or whitespace");
            }

            return retVal;
        }

        protected void LoadData()
        {
            if (this.SectionGroup != null && this.SectionGroup.SettingsSection != null)
            {
                this._settings = new SettingElement[this.SectionGroup.SettingsSection.DefaultSettings.Count];
                this.SectionGroup.SettingsSection.DefaultSettings.CopyTo(this._settings, 0);
            }
        }

        protected string GetValue(string name)
        {
            SettingElement element = this.GetElementByName(name);
            return element?.Value;
        }

        protected SettingElement GetElementByName(string name)
        {
            SettingElement retVal = this._settings?.SingleOrDefault(x => x.Name == name);
            return retVal;
        }
    }
}
