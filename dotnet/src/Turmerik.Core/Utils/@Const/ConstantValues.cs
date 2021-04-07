using Turmerik.Core.Reflection;
using Turmerik.Core.Text;

namespace Turmerik.Core.Utils
{
    public static partial class ConstantValues
    {
        public const string DEFAULT_TIMESTAMP_FORMAT = "yyyy-MM-dd_HH-mm-sszz.fffffff";

        public static readonly string RootNamespacePascalCase = typeof(ConstantValues).Assembly.GetAssemblyFullName().Split(
            Reflection.ConstantValues.NAMESPACE_PARTS_DELIMITER)[0];

        public static readonly string RootNamespaceCamelCase = RootNamespacePascalCase.FirstLetterToLower();
    }
}
