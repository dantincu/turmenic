using Turmenic.Core.DataTypes;

namespace Turmenic.Core.AppConfig
{
    public class RootEnvConfigSrlz
    {
        public string DotnetRelDirPath { get; set; }
        public string ContentRelDirPath { get; set; }
        public string NodejsRelDirPath { get; set; }
        public string PythonRelDirPath { get; set; }
        public string PowershellRelDirPath { get; set; }
        public string DotnetLgcRelDirPath { get; set; }
    }

    public class RootEnvConfig : ReadonlyData<RootEnvConfigSrlz>
    {
        public RootEnvConfig(RootEnvConfigSrlz data) : base(data)
        {
        }

        public string DotnetRelDirPath => this.Data.DotnetRelDirPath;
        public string ContentRelDirPath => this.Data.ContentRelDirPath;
        public string NodejsRelDirPath => this.Data.NodejsRelDirPath;
        public string PythonRelDirPath => this.Data.PythonRelDirPath;
        public string PowershellRelDirPath => this.Data.PowershellRelDirPath;
        public string DotnetLgcRelDirPath => this.Data.DotnetLgcRelDirPath;
    }

    public enum RootEnvDir
    {
        Base = 0,
        Dotnet = 1,
        Content = 2,
        Nodejs = 3,
        Python = 4,
        Powershell = 5,
        DotnetLgc = 6
    }
}
