using System.Linq;

namespace Tncvd.Serialization
{
    public static class XmlHelperMethods
    {
        public static string GetXPathFromSegments(params string[] segments)
        {
            string xPath = segments.Aggregate((leftStr, rightStr) => $"{leftStr}{ConstantValues.Xml.XPATH_SEGMENTS_DELIMITER}{rightStr}");
            return xPath;
        }
    }
}
