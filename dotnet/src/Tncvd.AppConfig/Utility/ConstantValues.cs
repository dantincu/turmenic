namespace Tncvd.AppConfig.Utility
{
    public static class ConstantValues
    {
        public static readonly string DefaultRootKeyPrefix = typeof(ConstantValues).Assembly.GetName().Name.Split('.')[0].FirstLetterToLower();
        public static readonly string DefaultSettingsSectionGroupName = DefaultRootKeyPrefix + "Settings";
    }
}
