using System;
using System.Collections.Generic;
using System.Text;
using Tncvd.Components;
using Tncvd.Reflection;

namespace Tncvd.Utility.DataTypeConversion
{
    public class DataTypesSafeParserHelper : InstanceContainer<DataTypesSafeParserHelper>
    {
        private readonly Dictionary<Type, Func<string, Tuple<bool, object>>> _parserMethods = new Dictionary<Type, Func<string, Tuple<bool, object>>>
        {
            {
                typeof(bool),
                value =>
                {
                    bool result;
                    bool success = bool.TryParse(value, out result);
                    if (success == false)
                    {
                        result = default;
                    }
                    return Tuple.Create<bool, object>(success, result);
                }
            },
            {
                typeof(byte),
                value =>
                {
                    byte result;
                    bool success = byte.TryParse(value, out result);
                    if (success == false)
                    {
                        result = default;
                    }
                    return Tuple.Create<bool, object>(success, result);
                }
            },
            {
                typeof(sbyte),
                value =>
                {
                    sbyte result;
                    bool success = sbyte.TryParse(value, out result);
                    if (success == false)
                    {
                        result = default;
                    }
                    return Tuple.Create<bool, object>(success, result);
                }
            },
            {
                typeof(short),
                value =>
                {
                    short result;
                    bool success = short.TryParse(value, out result);
                    if (success == false)
                    {
                        result = default;
                    }
                    return Tuple.Create<bool, object>(success, result);
                }
            },
            {
                typeof(ushort),
                value =>
                {
                    ushort result;
                    bool success = ushort.TryParse(value, out result);
                    if (success == false)
                    {
                        result = default;
                    }
                    return Tuple.Create<bool, object>(success, result);
                }
            },
            {
                typeof(int),
                value =>
                {
                    int result;
                    bool success = int.TryParse(value, out result);
                    if (success == false)
                    {
                        result = default;
                    }
                    return Tuple.Create<bool, object>(success, result);
                }
            },
            {
                typeof(uint),
                value =>
                {
                    uint result;
                    bool success = uint.TryParse(value, out result);
                    if (success == false)
                    {
                        result = default;
                    }
                    return Tuple.Create<bool, object>(success, result);
                }
            },
            {
                typeof(long),
                value =>
                {
                    long result;
                    bool success = long.TryParse(value, out result);
                    if (success == false)
                    {
                        result = default;
                    }
                    return Tuple.Create<bool, object>(success, result);
                }
            },
            {
                typeof(ulong),
                value =>
                {
                    ulong result;
                    bool success = ulong.TryParse(value, out result);
                    if (success == false)
                    {
                        result = default;
                    }
                    return Tuple.Create<bool, object>(success, result);
                }
            },
            {
                typeof(float),
                value =>
                {
                    float result;
                    bool success = float.TryParse(value, out result);
                    if (success == false)
                    {
                        result = default;
                    }
                    return Tuple.Create<bool, object>(success, result);
                }
            },
            {
                typeof(double),
                value =>
                {
                    double result;
                    bool success = double.TryParse(value, out result);
                    if (success == false)
                    {
                        result = default;
                    }
                    return Tuple.Create<bool, object>(success, result);
                }
            },
            {
                typeof(decimal),
                value =>
                {
                    decimal result;
                    bool success = decimal.TryParse(value, out result);
                    if (success == false)
                    {
                        result = default;
                    }
                    return Tuple.Create<bool, object>(success, result);
                }
            },
            {
                typeof(DateTime),
                value =>
                {
                    DateTime result;
                    bool success = DateTime.TryParse(value, out result);
                    if (success == false)
                    {
                        result = default;
                    }
                    return Tuple.Create<bool, object>(success, result);
                }
            }
        };

        public Func<string, Tuple<bool, T>> GetParserMethod<T>()
        {
            Func<string, Tuple<bool, object>> converter;

            if (this._parserMethods.TryGetValue(typeof(T), out converter) == false)
            {
                throw new ArgumentException($"No parser method available for parsing data type {typeof(T).GetFullTypeName()}");
            }

            return converter as Func<string, Tuple<bool, T>>;
        }

        public Tuple<bool, T> TryParseFromString<T>(string inputValue, Func<string, Tuple<bool, T>> parser = null)
        {
            Tuple<bool, T> retVal = default;

            if (string.IsNullOrWhiteSpace(inputValue) == false)
            {
                parser = parser ?? this.GetParserMethod<T>();
                retVal = parser(inputValue);
            }

            return retVal;
        }
    }
}
