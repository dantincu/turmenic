using Tncvd.Reflection;
using Tncvd.Text;

namespace Tncvd.Utility
{
    public static partial class ConstantValues
    {
        public static readonly string RootNamespacePascalCase = typeof(ConstantValues).Assembly.GetAssemblyFullName();
        public static readonly string RootNamespaceCamelCase = RootNamespacePascalCase.FirstLetterToLower();
    }
}
