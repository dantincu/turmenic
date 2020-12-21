using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tncvd.Components;
using Tncvd.Reflection;

namespace Tncvd.Utility.DataTypeConversion
{
    public class DataTypesConverterHelper : InstanceContainer<DataTypesConverterHelper>
    {
        private readonly Dictionary<Type, Func<string, object>> _converterMethods = new Dictionary<Type, Func<string, object>>
        {
            {
                typeof(string),
                value => value
            },
            {
                typeof(bool),
                value => Convert.ToBoolean(value)
            },
            {
                typeof(byte),
                value => Convert.ToByte(value)
            },
            {
                typeof(sbyte),
                value => Convert.ToSByte(value)
            },
            {
                typeof(short),
                value => Convert.ToInt16(value)
            },
            {
                typeof(ushort),
                value => Convert.ToUInt16(value)
            },
            {
                typeof(int),
                value => Convert.ToInt32(value)
            },
            {
                typeof(uint),
                value => Convert.ToUInt32(value)
            },
            {
                typeof(long),
                value => Convert.ToInt64(value)
            },
            {
                typeof(ulong),
                value => Convert.ToUInt64(value)
            },
            {
                typeof(float),
                value => Convert.ToSingle(value)
            },
            {
                typeof(double),
                value => Convert.ToDouble(value)
            },
            {
                typeof(decimal),
                value => Convert.ToDecimal(value)
            },
            {
                typeof(DateTime),
                value => Convert.ToDateTime(value)
            }
        };

        public Func<string, T> GetConverterMethod<T>()
        {
            Func<string, object> converter;

            if (this._converterMethods.TryGetValue(typeof(T), out converter) == false)
            {
                throw new ArgumentException($"No converter method available for converting to data type {typeof(T).GetFullTypeName()}");
            }

            return converter as Func<string, T>;
        }

        public T ConvertFromString<T>(string inputValue, bool rethrowError = false, Func<string, T> converter = null)
        {
            T retVal = default;

            try
            {
                if (string.IsNullOrWhiteSpace(inputValue) == false)
                {
                    converter = converter ?? this.GetConverterMethod<T>();
                    retVal = converter(inputValue);
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
