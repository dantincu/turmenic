using System;
using System.Linq;

namespace Turmerik.Core.Collection
{
    public static partial class HelperMethods
    {
        #region ConvertTo

        public static TRetVal[] ConvertTo<TVal, TRetVal>(this TVal[] array, Func<TVal, int, TRetVal> assignerPredicate)
        {
            TRetVal[] retArr = new TRetVal[array.Length];

            for (int i = 0; i < array.Length; i++)
            {
                retArr[i] = assignerPredicate(array[i], i);
            }

            return retArr;
        }

        public static TRetVal[] ConvertTo<TVal, TRetVal>(this TVal[] array, Func<TVal, TRetVal> assignerPredicate)
        {
            TRetVal[] retArr = new TRetVal[array.Length];

            for (int i = 0; i < array.Length; i++)
            {
                retArr[i] = assignerPredicate(array[i]);
            }

            return retArr;
        }

        #endregion ConvertTo

        #region Slice

        public static T[] Slice<T>(this T[] array, int idxStart, int length)
        {
            T[] retArr = new T[length];
            int idxEnd = idxStart + length;

            for (int i = idxStart; i < idxEnd; i++)
            {
                retArr[i] = array[i];
            }

            return retArr;
        }

        public static T[] Slice<T>(this T[] array, int idxStart)
        {
            T[] retArr = array.Slice(idxStart, array.Length - idxStart);

            return retArr;
        }

        #endregion Slice

        #region ConcatArrays

        public static T[] AppendItems<T>(this T[] array, params T[] appended)
        {
            T[] retArr = new T[array.Length + appended.Length];

            array.CopyTo(retArr, 0);
            appended.CopyTo(retArr, array.Length);

            return retArr;
        }

        public static T[] ConcatArrays<T>(params T[][] arrays)
        {
            T[] retArr = new T[arrays.Select(arr => arr.Length).Sum()];
            int idx = 0;

            foreach (T[] arr in arrays)
            {
                arr.CopyTo(retArr, idx);
                idx += arr.Length;
            }

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
