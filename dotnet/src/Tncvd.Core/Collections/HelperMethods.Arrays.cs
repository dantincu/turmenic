using System;
using System.Linq;

namespace Tncvd.Core.Collections
{
    public static partial class HelperMethods
    {
        #region ConcatArrays

        public static T[] ConcatArrays<T>(T[] firstArray, T[] secondArray)
        {
            T[] retArr = ConcatEnumerables(firstArray, secondArray).ToArray();
            return retArr;
        }

        public static T[] ConcatArrays<T>(params T[][] arrays)
        {
            T[] retArr = ConcatEnumerables(arrays).ToArray();
            return retArr;
        }

        public static TRet[] ConcatArrays<TRet, TParam>(Func<TParam, TRet> convertor, params TParam[][] arrays)
        {
            TRet[] retArr = ConcatEnumerables(convertor, arrays).ToArray();
            return retArr;
        }

        public static string[] ConcatArraysAsStrings<TParam>(params TParam[][] arrays)
        {
            string[] retArr = ConcatEnumerablesAsStrings(arrays).ToArray();
            return retArr;
        }

        #endregion ConcatArrays
    }
}
