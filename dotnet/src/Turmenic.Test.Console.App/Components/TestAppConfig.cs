using Turmenic.Core.AppConfig;

namespace Turmenic.Test.Console.App.Components
{
    internal class TestAppConfig
    {
        public void Run()
        {
            System.Console.WriteLine($"Root env path: {EnvConfigContainer.Instance.BasePath}");
            System.Console.WriteLine($"Root env config path: {EnvConfigContainer.Instance.GetEnvRelPath(EnvDir.Config)}");
            System.Console.WriteLine($"Root env data path: {EnvConfigContainer.Instance.GetEnvRelPath(EnvDir.Data)}");
            System.Console.WriteLine($"Root env logs path: {EnvConfigContainer.Instance.GetEnvRelPath(EnvDir.Logs)}");
            System.Console.WriteLine($"Root env metadata path: {EnvConfigContainer.Instance.GetEnvRelPath(EnvDir.Metadata)}");
            System.Console.WriteLine($"Root env temp path: {EnvConfigContainer.Instance.GetEnvRelPath(EnvDir.Temp)}");

            System.Console.WriteLine($"Lib config path: {LibConfigContainer.Instance.BasePath}");
            System.Console.WriteLine($"Lib config path eDocs.Val: {LibConfigContainer.Instance.Config.SpecialDirs.Names.EDocs.Val}");
            System.Console.WriteLine($"Lib config path eDocs.AltVal: {LibConfigContainer.Instance.Config.SpecialDirs.Names.EDocs.AltVal}");
        }
    }
}
