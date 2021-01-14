using System;
using System.Collections.ObjectModel;

namespace Tncvd.Core.Reflection
{
    public static partial class ConstantValues
    {
        public const string NAMESPACE_ALIAS_DELIMITER = "::";

        public const char NAMESPACE_PARTS_DELIMITER = '.';

        /*
         * Generic type's FullName property returns values like the following:
         * System.Nullable`1[[System.Int32, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]
         * System.Tuple`2[[System.Int32, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e],[System.String, System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]
         * 
         * While generic type's Name property returns values like the following:
         * Nullable`1
         * Tuple`2
         * 
         * Assembly's FullName property returns values like the following:
         * System.Private.CoreLib, Version=5.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e
         * 
         * while Assembly's GetName().Name property returns values like the following:
         * System.Private.CoreLib
         */

        public const char GENERIC_TYPE_NAME_PARAMS_DELIMITER = '`';

        public const char GENERIC_TYPE_NAME_PARAMS_LIST_START_DELIMITER = '[';
        public const char GENERIC_TYPE_NAME_PARAMS_LIST_END_DELIMITER = ']';

        public const char GENERIC_TYPE_NAME_PARAM_NAME_START_DELIMITER = '[';
        public const char GENERIC_TYPE_NAME_PARAM_NAME_END_DELIMITER = ']';

        public const char GENERIC_TYPE_NAME_PARAM_NAME_PARTS_DELIMITER = ',';

        public static readonly ReadOnlyCollection<Type> PrimitiveTypes = new ReadOnlyCollection<Type>(new Type[] {
            typeof(char),
            typeof(byte),
            typeof(sbyte),
            typeof(short),
            typeof(ushort),
            typeof(int),
            typeof(uint),
            typeof(long),
            typeof(ulong),
            typeof(float),
            typeof(double),
            typeof(decimal),
            typeof(DateTime)
        });
    }
}
