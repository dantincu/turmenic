using System.Linq;

namespace Tncvd.Core.Text
{
    public static partial class HelperMethods
    {
        #region Extensions

        public static string[] TrimAll(this string[] strArr, bool removeEmptyEntries = false)
        {
            for (int i = 0; i < strArr.Length; i++)
            {
                strArr[i] = strArr[i]?.Trim();
            }

            if (removeEmptyEntries)
            {
                strArr = strArr.Where(str => string.IsNullOrEmpty(str) == false).ToArray();
            }

            return strArr;
        }

        #endregion Extensions
    }
}
