using Turmenic.Core.DataTypes;

namespace Turmenic.Core.AppConfig
{
    public class EnvConfigSrlz
    {
        public string ConfigRelDirPath { get; set; }
        public string DataRelDirPath { get; set; }
        public string LogsRelDirPath { get; set; }
        public string MetadataRelDirPath { get; set; }
        public string TempRelDirPath { get; set; }
    }

    public class EnvConfig : ReadonlyData<EnvConfigSrlz>
    {
        public EnvConfig(EnvConfigSrlz data) : base(data)
        {
        }

        public string ConfigRelDirPath => this.Data.ConfigRelDirPath;
        public string DataRelDirPath => this.Data.DataRelDirPath;
        public string LogsRelDirPath => this.Data.LogsRelDirPath;
        public string MetadataRelDirPath => this.Data.MetadataRelDirPath;
        public string TempRelDirPath => this.Data.TempRelDirPath;
    }

    public enum EnvDir
    {
        Base = 0,
        Config = 1,
        Data = 2,
        Logs = 3,
        Metadata = 4,
        Temp = 5
    }
}