using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tncvd.AppConfig.Config;
using Tncvd.AppConfig.Config.Env;

namespace Tncvd.Console.App
{
    internal class TestAppConfig
    {
        public void Run()
        {
            TncvdSectionGroup group = ConfigurationManager.OpenMappedExeConfiguration(new ExeConfigurationFileMap
            {
                ExeConfigFilename = "Tncvd.dll.config"
            }, ConfigurationUserLevel.None).SectionGroups["tncvd"] as TncvdSectionGroup;
            foreach (ConfigurationSection section in group.Sections)
            {
                System.Console.WriteLine("\n\n===========================================");
                System.Console.WriteLine(section.SectionInformation.Name.ToUpper());
                System.Console.WriteLine("===========================================");
                if (section.GetType() == typeof(EnvLocationsSection))
                {
                    EnvLocationsSection c = (EnvLocationsSection)section;
                    EnvLocationElementCollection coll = c.Locations;
                    foreach (EnvLocationElement item in coll)
                    {
                        System.Console.WriteLine("|{0}|{1}|", item.Name, item.Path);
                        System.Console.WriteLine("-------------------------------------------");
                    }
                }
            }
            System.Console.ReadLine();
        }
    }
}
