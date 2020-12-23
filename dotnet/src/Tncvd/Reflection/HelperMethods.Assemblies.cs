using System.Reflection;

namespace Tncvd.Reflection
{
    public static partial class HelperMethods
    {
        #region Extensions

        public static string GetAssemblyFullName(this Assembly assembly)
        {
            return assembly.GetName().Name;
        }

        #endregion Extensions
    }
}
