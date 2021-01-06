using Common.Reflection;
using System;
using System.IO;
using System.Reflection;

namespace Common
{
    public enum AppEnvFolderType
    {
        Root = 0,
        Config = 1,
        Content = 2,
        Data = 3,
        Logs = 4,
        Metadata = 5,
        Temp = 6
    }

    public class EnvLocatorSerializable
    {
        public string AppsSuiteFolderName { get; set; }
    }

    public class AppEnvConfigContainer
    {
        public const string ENV_LOCATOR_FILE_NAME = "env.locator.json";

        public const string APP_MISC_ENV_DEV_DIR_NAME = "__DEV__";
        public const string APP_MISC_ENV_TEST_DIR_NAME = "__TEST__";
        public const string APP_MISC_ENV_ENABLED_FILE_NAME = ".tncvd-env-enabled";

        public static readonly string EnvRootFolderName = HelperMethods.DeserializeJson<EnvLocatorSerializable>(ENV_LOCATOR_FILE_NAME).AppsSuiteFolderName;

        private readonly string envRootPathProdValue = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), EnvRootFolderName);

        private static AppEnvConfigContainer instance;

        private AppEnvConfigContainer()
        {
            this.IsDevEnv = this.IsDevEnvEnabled();
            this.IsTestEnv = this.IsTestEnvEnabled();

            this.EnvRootPath = this.GetEnvRootPath();
            this.CreateEnvDirs();
        }

        public static AppEnvConfigContainer Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new AppEnvConfigContainer();
                }

                return instance;
            }
        }

        public bool IsDevEnv { get; }
        public bool IsTestEnv { get; }
        public string EnvRootPath { get; }

        public string GetEnvPath(AppEnvFolderType envFolderType = AppEnvFolderType.Root, params string[] relativePathParts)
        {
            string relativePath = relativePathParts.Length > 0 ? Path.Combine(relativePathParts) : string.Empty;
            return Path.Combine(this.EnvRootPath, envFolderType.ToString(), relativePath);
        }

        public string GetEnvPath(Type type, AppEnvFolderType envFolderType = AppEnvFolderType.Root, params string[] relativePathParts)
        {
            string relativePath = relativePathParts.Length > 0 ? Path.Combine(relativePathParts) : string.Empty;
            return this.GetEnvPath(envFolderType, new string[] { type.GetTypeFullName(), relativePath });
        }

        public string GetEnvPath(Assembly assembly, AppEnvFolderType envFolderType = AppEnvFolderType.Root, params string[] relativePathParts)
        {
            string relativePath = relativePathParts.Length > 0 ? Path.Combine(relativePathParts) : string.Empty;
            return this.GetEnvPath(envFolderType, new string[] { assembly.GetAssemblyFullName(), relativePath });
        }

        private string GetEnvRootPath()
        {
            string retVal;

            if (this.IsDevEnv)
            {
                retVal = this.GetDevEnvRootPath();
            }
            else if (this.IsTestEnv)
            {
                retVal = this.GetTestEnvRootPath();
            }
            else
            {
                retVal = this.envRootPathProdValue;
            }

            return retVal;
        }

        private bool IsDevEnvEnabled()
        {
            return File.Exists(this.GetDevEnvEnabledFilePath());
        }

        private bool IsTestEnvEnabled()
        {
            return File.Exists(this.GetTestEnvEnabledFilePath());
        }

        private string GetDevEnvEnabledFilePath()
        {
            return Path.Combine(this.GetDevEnvRootPath(), APP_MISC_ENV_ENABLED_FILE_NAME);
        }

        private string GetTestEnvEnabledFilePath()
        {
            return Path.Combine(this.GetTestEnvRootPath(), APP_MISC_ENV_ENABLED_FILE_NAME);
        }

        private string GetDevEnvRootPath()
        {
            return Path.Combine(this.envRootPathProdValue, APP_MISC_ENV_DEV_DIR_NAME);
        }

        private string GetTestEnvRootPath()
        {
            return Path.Combine(this.envRootPathProdValue, APP_MISC_ENV_TEST_DIR_NAME);
        }

        private void CreateEnvDirs()
        {
            foreach (AppEnvFolderType enumValue in Enum.GetValues(typeof(AppEnvFolderType)))
            {
                Directory.CreateDirectory(this.GetEnvPath(enumValue));
            }
        }
    }
}
