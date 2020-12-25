using Tncvd.Reflection;
using Tncvd.Text;

namespace Tncvd.ReckoNotes.Utility
{
    public static partial class ConstantValues
    {
        public static readonly string NamespaceProductPartPascalCase = RootNamespacePascalCase.SubstractRootPartFromNamespace(Tncvd.Utility.ConstantValues.RootNamespacePascalCase);
        public static readonly string NamespaceProductPartCamelCase = NamespaceProductPartPascalCase.FirstLetterToLower();

        public static readonly string RootNamespacePascalCase = typeof(ConstantValues).Assembly.GetAssemblyFullName();
        public static readonly string RootNamespaceCamelCase = RootNamespaceCamelCase.FirstLetterToLower();
    }
}
