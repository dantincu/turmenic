using System;
using System.Collections.Generic;
using System.Text;
using Tncvd.Components;
using Tncvd.Reflection;

namespace Tncvd.Utility.DataTypeConversion
{
    public class DataTypesParserHelper : InstanceContainer<DataTypesParserHelper>
    {
        private readonly Dictionary<Type, Func<string, object>> _parserMethods = new Dictionary<Type, Func<string, object>>
        {
            {
                typeof(string),
                value => value
            },
            {
                typeof(bool),
                value => bool.Parse(value)
            },
            {
                typeof(byte),
                value => byte.Parse(value)
            },
            {
                typeof(sbyte),
                value => sbyte.Parse(value)
            },
            {
                typeof(short),
                value => short.Parse(value)
            },
            {
                typeof(ushort),
                value => ushort.Parse(value)
            },
            {
                typeof(int),
                value => int.Parse(value)
            },
            {
                typeof(uint),
                value => uint.Parse(value)
            },
            {
                typeof(long),
                value => long.Parse(value)
            },
            {
                typeof(ulong),
                value => ulong.Parse(value)
            },
            {
                typeof(float),
                value => float.Parse(value)
            },
            {
                typeof(double),
                value => double.Parse(value)
            },
            {
                typeof(decimal),
                value => decimal.Parse(value)
            },
            {
                typeof(DateTime),
                value => DateTime.Parse(value)
            }
        };

        public Func<string, T> GetParserMethod<T>()
        {
            Func<string, object> converter;

            if (this._parserMethods.TryGetValue(typeof(T), out converter) == false)
            {
                throw new ArgumentException($"No parser method available for parsing data type {typeof(T).GetFullTypeName()}");
            }

            return converter as Func<string, T>;
        }

        public T ParseFromString<T>(string inputValue, bool rethrowError = false, Func<string, T> parser = null)
        {
            T retVal = default;

            try
            {
                if (string.IsNullOrWhiteSpace(inputValue) == false)
                {
                    parser = parser ?? this.GetParserMethod<T>();
                    retVal = parser(inputValue);
                }
            }
            catch
            {
                if (rethrowError)
                {
                    throw;
                }
            }

            return retVal;
        }
    }
}
