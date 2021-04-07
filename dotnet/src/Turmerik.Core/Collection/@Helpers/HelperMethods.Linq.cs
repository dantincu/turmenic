using System;
using System.Collections.Generic;
using System.Linq;

namespace Turmerik.Core.Collection
{
    public static partial class HelperMethods
    {
        #region General

        public static IEnumerable<KeyValuePair<int, T>> WithIndex<T>(this IEnumerable<T> enumerable)
        {
            int index = 0;

            IEnumerator<T> enumerator = enumerable.GetEnumerator();

            while (enumerator.MoveNext())
            {
                yield return new KeyValuePair<int, T>(index++, enumerator.Current);
            }
        }

        public static Tuple<bool, TValue> TryGetValue<TKey, TValue>(Dictionary<TKey, TValue> dictionary, TKey key)
        {
            TValue value;
            bool success = dictionary.TryGetValue(key, out value);

            return new Tuple<bool, TValue>(success, value);
        }

        public static void ForEach<T>(this IEnumerable<T> enumerable, Action<T, int> actionPredicate)
        {
            int i = 0;
            IEnumerator<T> enumerator = enumerable.GetEnumerator();

            while (enumerator.MoveNext())
            {
                actionPredicate.Invoke(enumerator.Current, i);
                i++;
            }
        }

        public static IEnumerable<TRetVal> ConvertTo<TVal, TRetVal>(this IEnumerable<TVal> enumerable, Func<TVal, int, TRetVal> assignerPredicate)
        {
            int i = 0;

            IEnumerator<TVal> enumerator = enumerable.GetEnumerator();

            while (enumerator.MoveNext())
            {
                TRetVal retVal = assignerPredicate(enumerator.Current, i);
                i++;

                yield return retVal;
            }
        }

        public static Dictionary<TKey, TValue> ToDictionary<TKey, TValue>(this IEnumerable<KeyValuePair<TKey, TValue>> pairsEnumerable)
        {
            return pairsEnumerable.ToDictionary(pair => pair.Key, pair => pair.Value);
        }

        #endregion General

        #region KeysToDictionary

        public static Dictionary<TKey, TValue> KeysToDictionary<TKey, TValue>(this IEnumerable<TKey> enumerable, Func<TKey, int, TValue> assignerPredicate)
        {
            return enumerable.ConvertTo((key, idx) => new KeyValuePair<TKey, TValue>(key, assignerPredicate(key, idx))).ToDictionary();
        }

        public static Dictionary<TKey, TValue> ValuesToDictionary<TKey, TValue>(this IEnumerable<TValue> enumerable, Func<TValue, int, TKey> assignerPredicate)
        {
            return enumerable.ConvertTo((value, idx) => new KeyValuePair<TKey, TValue>(assignerPredicate(value, idx), value)).ToDictionary();
        }

        #endregion KeysToDictionary

        #region GetReplacedWhere

        public static IEnumerable<T> GetReplacedWhere<T>(this IEnumerable<T> enumerable, Func<T, int, bool> selectorPredicate, Func<T, int, T> assignerPredicate)
        {
            int i = 0;

            IEnumerator<T> enumerator = enumerable.GetEnumerator();

            while (enumerator.MoveNext())
            {
                T el = enumerator.Current;

                if (selectorPredicate(el, i))
                {
                    el = assignerPredicate(el, i);
                }

                i++;
                yield return el;
            }
        }

        public static IEnumerable<T> GetReplacedWhere<T>(this IEnumerable<T> enumerable, Func<T, bool> selectorPredicate, Func<T, T> assignerPredicate)
        {
            IEnumerator<T> enumerator = enumerable.GetEnumerator();

            while (enumerator.MoveNext())
            {
                T el = enumerator.Current;

                if (selectorPredicate(el))
                {
                    el = assignerPredicate(el);
                }

                yield return el;
            }
        }

        #endregion GetReplacedWhere

        #region ReplaceWhere

        public static IList<T> ReplaceWhere<T>(this IList<T> list, Func<T, int, bool> selectorPredicate, Func<T, int, T> assignerPredicate, out int replacedCount)
        {
            replacedCount = 0;

            for (int i = 0; i < list.Count; i++)
            {
                T el = list[i];
                if (selectorPredicate(el, i))
                {
                    list[i] = assignerPredicate(el, i);
                    replacedCount++;
                }
            }

            return list;
        }

        public static int ReplaceWhere<T>(this IList<T> list, Func<T, int, bool> selectorPredicate, Func<T, int, T> assignerPredicate)
        {
            int replacedCount;

            list.ReplaceWhere(selectorPredicate, assignerPredicate, out replacedCount);
            return replacedCount;
        }

        public static IList<T> ReplaceWhere<T>(this IList<T> list, Func<T, bool> selectorPredicate, Func<T, T> assignerPredicate, out int replacedCount)
        {
            replacedCount = 0;

            for (int i = 0; i < list.Count; i++)
            {
                T el = list[i];
                if (selectorPredicate(el))
                {
                    list[i] = assignerPredicate(el);
                    replacedCount++;
                }
            }

            return list;
        }

        public static int ReplaceWhere<T>(this IList<T> list, Func<T, bool> selectorPredicate, Func<T, T> assignerPredicate)
        {
            int replacedCount;

            list.ReplaceWhere(selectorPredicate, assignerPredicate, out replacedCount);
            return replacedCount;
        }

        #endregion ReplaceWhere

        #region DeleteWhere

        public static IList<T> DeleteWhere<T>(this IList<T> list, Func<T, bool> selectorPredicate, out int deletedCount)
        {
            deletedCount = 0;
            int i = 0;

            while (i < list.Count)
            {
                if (selectorPredicate(list[i]))
                {
                    list.RemoveAt(i);
                    deletedCount++;
                }
                else
                {
                    i++;
                }
            }

            return list;
        }

        public static int DeleteWhere<T>(this IList<T> list, Func<T, int, bool> selectorPredicate)
        {
            int deletedCount;

            list.DeleteWhere(selectorPredicate, out deletedCount);
            return deletedCount;
        }

        public static IList<T> DeleteWhere<T>(this IList<T> list, Func<T, int, bool> selectorPredicate, out int deletedCount)
        {
            deletedCount = 0;
            int i = 0;

            while (i < list.Count)
            {
                if (selectorPredicate(list[i], i))
                {
                    list.RemoveAt(i);
                    deletedCount++;
                }
                else
                {
                    i++;
                }
            }

            return list;
        }

        public static int DeleteWhere<T>(this IList<T> list, Func<T, bool> selectorPredicate)
        {
            int deletedCount;

            list.DeleteWhere(selectorPredicate, out deletedCount);
            return deletedCount;
        }

        #endregion DeleteWhere

        #region ListItemOrder

        public static void SwapItems<T>(this IList<T> list, int idx1, int idx2)
        {
            if (idx1 != idx2)
            {
                T aux = list[idx1];
                list[idx1] = list[idx2];
                list[idx2] = aux;
            }
        }

        public static void MoveItem<T>(this IList<T> list, int idxSrc, int idxDest)
        {
            if (idxSrc != idxDest)
            {
                T item = list[idxSrc];
                list.RemoveAt(idxSrc);

                if (idxSrc < idxDest)
                {
                    list.Insert(idxDest, item);
                }
                else
                {
                    list.Insert(idxDest, item);
                }
            }
        }

        #endregion ListItemOrder
    }
}
