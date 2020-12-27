using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace Tncvd.Collections
{
    public static partial class HelperMethods
    {
        #region ConcatEnumerables

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

        #endregion ConcatEnumerables
    }
}
