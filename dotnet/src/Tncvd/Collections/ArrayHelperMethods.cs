using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Tncvd.Collections
{
    public static class ArrayHelperMethods
    {
        public static T[] ConcatArrays<T>(T[] firstArray, T[] secondArray)
        {
            T[] retArr = EnumerableHelperMethods.ConcatEnumerables(firstArray, secondArray).ToArray();
            return retArr;
        }

        public static T[] ConcatArrays<T>(params T[][] arrays)
        {
            T[] retArr = EnumerableHelperMethods.ConcatEnumerables(arrays).ToArray();
            return retArr;
        }

        public static TRet[] ConcatArrays<TRet, TParam>(Func<TParam, TRet> convertor, params TParam[][] arrays)
        {
            TRet[] retArr = EnumerableHelperMethods.ConcatEnumerables(convertor, arrays).ToArray();
            return retArr;
        }

        public static string[] ConcatArraysAsStrings<TParam>(params TParam[][] arrays)
        {
            string[] retArr = EnumerableHelperMethods.ConcatEnumerablesAsStrings(arrays).ToArray();
            return retArr;
        }
    }
}
