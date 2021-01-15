using System;
using System.Linq;

namespace Tncvd.Core.Reflection
{
    public static partial class HelperMethods
    {
        public static string GetTypeFullName(this Type type)
        {
            string retVal = null;

            if (type != null)
            {
                retVal = type.Name;

                if (type.Namespace != null)
                {
                    retVal = $"{type.Namespace}{ConstantValues.NAMESPACE_PARTS_DELIMITER}{type.Name}";
                }
            }

            return retVal;
        }

        public static bool IsPrimitive(this Type type)
        {
            bool retVal = false;

            if (type != null)
            {
                if (type.IsValueType)
                {
                    retVal = type.IsValueTypePrimitive();
                }
                else
                {
                    retVal = type == typeof(string);
                    retVal = retVal || type.IsNullablePrimitive();
                }
            }

            return retVal;
        }

        public static bool IsValueTypePrimitive(this Type type)
        {
            bool retVal = false;

            if (type != null)
            {
                retVal = ConstantValues.PrimitiveTypes.Contains(type);
            }

            return retVal;
        }

        public static bool IsNullablePrimitive(this Type type)
        {
            bool retVal = false;

            if (type != null)
            {
                retVal = type.IsNullableType();

                if (retVal == true)
                {
                    Type genericTypeParameter = type.GetGenericArguments().Single();
                    retVal = IsValueTypePrimitive(genericTypeParameter);
                }
            }

            return retVal;
        }

        public static bool IsNullableType(this Type type)
        {
            bool retVal = false;

            if (type != null)
            {
                retVal = type.IsGenericType && TypesHaveSameNameAndNs(type, typeof(int?));
            }
            
            return retVal;
        }

        public static bool TypesHaveSameNameAndNs(params Type[] types)
        {
            bool retVal = types.Select(type => type.GetTypeFullName()).Distinct().Count() == 1;
            return retVal;
        }
    }
}
