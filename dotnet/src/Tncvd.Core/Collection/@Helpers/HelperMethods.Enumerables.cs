using System;
using System.Collections;
using System.Collections.Generic;

namespace Tncvd.Core.Collection
{
    public static partial class HelperMethods
    {
        #region IsEqualTo

        public static bool IsEqualToValue<T>(T value, T comparand, bool equalIfBothNull = true)
        {
            bool retVal = false;

            if (value == null && comparand == null && equalIfBothNull)
            {
                retVal = true;
            }
            else if (value != null && comparand != null)
            {
                retVal = value.Equals(comparand);
            }

            return retVal;
        }

        public static bool IsEqualTo<T>(this IEnumerable<T> enumerable, IEnumerable<T> comparandEnumerable)
        {
            bool retVal = true;

            IEnumerator<T> enumerator = enumerable.GetEnumerator();
            IEnumerator<T> comparandEnumerator = comparandEnumerable.GetEnumerator();

            while (retVal && enumerator.MoveNext())
            {
                if (comparandEnumerator.MoveNext())
                {
                    retVal = retVal && (IsEqualToValue(enumerator.Current, comparandEnumerator.Current));
                }
                else
                {
                    retVal = false;
                }
            }

            if (retVal == true && comparandEnumerator.MoveNext())
            {
                retVal = false;
            }

            return retVal;
        }

        #endregion IsEqualTo

        #region Concat

        public static IEnumerable<T> ConcatEnumerables<T>(params IEnumerable<T>[] enumerablesArr)
        {
            foreach (IEnumerable<T> enumerable in enumerablesArr)
            {
                foreach (T item in enumerable)
                {
                    yield return item;
                }
            }
        }

        public static IEnumerable<TRet> ConcatEnumerables<TRet, TParam>(Func<TParam, TRet> convertor, params IEnumerable<TParam>[] enumerablesArr)
        {
            foreach (IEnumerable<TParam> enumerable in enumerablesArr)
            {
                foreach (TParam item in enumerable)
                {
                    yield return convertor(item);
                }
            }
        }

        public static IEnumerable<string> ConcatEnumerablesAsStrings<T>(params IEnumerable<T>[] enumerablesArr)
        {
            IEnumerable<string> retEnumerable = ConcatEnumerables(item => item.ToString(), enumerablesArr);
            return retEnumerable;
        }

        public static IEnumerable ConcatEnumerables(params IEnumerable[] enumerablesArr)
        {
            foreach (IEnumerable enumerable in enumerablesArr)
            {
                foreach (object item in enumerable)
                {
                    yield return item;
                }
            }
        }

        public static IEnumerable<TRet> ConcatEnumerables<TRet>(Func<object, TRet> convertor, params IEnumerable[] enumerablesArr)
        {
            foreach (IEnumerable enumerable in enumerablesArr)
            {
                foreach (object item in enumerable)
                {
                    yield return convertor(item);
                }
            }
        }

        public static IEnumerable<string> ConcatEnumerablesAsStrings(params IEnumerable[] enumerablesArr)
        {
            IEnumerable<string> retEnumerable = ConcatEnumerables(item => item.ToString(), enumerablesArr);
            return retEnumerable;
        }

        #endregion Concat
    }
}
