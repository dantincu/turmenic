using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using Tncvd.AppConfig.Config.Settings.Simple;

namespace Tncvd.AppConfig.Utility
{
    public static class HelperMethods
    {
        #region Extensions
        public static TSectionGroup GetConfigurationSectionGroup<TSectionGroup>(this Configuration configuration, string sectionGroupName = null) where TSectionGroup : ConfigurationSectionGroup
        {
            sectionGroupName = sectionGroupName ?? ConstantValues.DefaultSettingsSectionGroupName;
            TSectionGroup sectionGroup = configuration.SectionGroups[sectionGroupName] as TSectionGroup;
            return sectionGroup;
        }

        #region Extensions.SimpleSettingElement

        public static IEnumerable<SimpleSettingElement> GetSettingElementsEnumerable(this SimpleSettingElementCollection collection)
        {
            if (collection != null)
            {
                foreach (SimpleSettingElement element in collection)
                {
                    yield return element;
                }
            }
        }

        public static SimpleSettingElement[] GetSettingElements(this SimpleSettingElementCollection collection)
        {
            IEnumerable<SimpleSettingElement> elements = collection.GetSettingElementsEnumerable();
            return elements.ToArray();
        }

        #endregion Extensions.SimpleSettingElement

        #region Extensions.SettingElement

        public static IEnumerable<Config.Settings.SettingElement> GetSettingElementsEnumerable(this Config.Settings.SettingElementCollection collection)
        {
            if (collection != null)
            {
                foreach (Config.Settings.SettingElement element in collection)
                {
                    yield return element;
                }
            }
        }

        public static Config.Settings.SettingElement[] GetSettingElements(this Config.Settings.SettingElementCollection collection)
        {
            IEnumerable<Config.Settings.SettingElement> elements = collection.GetSettingElementsEnumerable();
            return elements.ToArray();
        }

        #endregion Extensions.SettingElement

        #region Extensions.Text

        public static string FirstLetterToUpper(this string value)
        {
            char firstLetter = value[0];

            if (char.IsLetter(firstLetter) && char.IsLower(firstLetter))
            {
                firstLetter = char.ToUpper(firstLetter);
                value = value.Substring(1);
                value = $"{firstLetter}{value}";
            }

            return value;
        }

        public static string FirstLetterToLower(this string value)
        {
            char firstLetter = value[0];

            if (char.IsLetter(firstLetter) && char.IsUpper(firstLetter))
            {
                firstLetter = char.ToLower(firstLetter);
                value = value.Substring(1);
                value = $"{firstLetter}{value}";
            }

            return value;
        }

        #endregion Extensions.Text

        #endregion Extensions

        public static SimpleSettingElement[] GetSettingElementsOrNull(SimpleSettingElementCollection collection)
        {
            SimpleSettingElement[] retVal = null;

            if (collection != null)
            {
                retVal = collection.GetSettingElements();
            }

            return retVal;
        }
        
        public static Config.Settings.SettingElement[] GetSettingElementsOrNull(Config.Settings.SettingElementCollection collection)
        {
            Config.Settings.SettingElement[] retVal = null;

            if (collection != null)
            {
                retVal = collection.GetSettingElements();
            }

            return retVal;
        }
    }
}
