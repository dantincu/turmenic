namespace Turmenic.Core.Text
{
    public static partial class HelperMethods
    {
        #region Extensions

        public static string FirstLetterToUpper(this string value)
        {
            char firstLetter = value[0];

            if (char.IsLetter(firstLetter) && char.IsLower(firstLetter))
            {
                firstLetter = char.ToUpper(firstLetter);
                value = value.Substring(1);
                value = $"{firstLetter}{value}";
            }

            return value;
        }

        public static string FirstLetterToLower(this string value)
        {
            char firstLetter = value[0];

            if (char.IsLetter(firstLetter) && char.IsUpper(firstLetter))
            {
                firstLetter = char.ToLower(firstLetter);
                value = value.Substring(1);
                value = $"{firstLetter}{value}";
            }

            return value;
        }

        public static string GetNamespaceStrippedOfAlias(this string @namespace)
        {
            string namespaceAliasDelimiter = Reflection.ConstantValues.NAMESPACE_ALIAS_DELIMITER;
            int indexOf = @namespace.IndexOf(namespaceAliasDelimiter);

            if (indexOf > 0)
            {
                @namespace = @namespace.Substring(indexOf + namespaceAliasDelimiter.Length);
            }

            return @namespace;
        }

        public static string SubstractRootPartFromNamespace(this string fullNamespace, string rootNamespace, bool stripAlias = true)
        {
            fullNamespace = fullNamespace.GetNamespaceStrippedOfAlias();
            rootNamespace = rootNamespace.GetNamespaceStrippedOfAlias();

            string @namespace = fullNamespace.StartsWith(rootNamespace) ? fullNamespace.Substring(rootNamespace.Length) : fullNamespace;
            return @namespace;
        }

        #endregion Extensions
    }
}
