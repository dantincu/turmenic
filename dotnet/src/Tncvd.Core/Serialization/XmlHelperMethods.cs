using System;
using System.IO;
using System.Linq;
using System.Xml.Serialization;

namespace Tncvd.Core.Serialization
{
    public static partial class XmlHelperMethods
    {
        public static string GetXPathFromSegments(params string[] segments)
        {
            string xPath = segments.Aggregate((leftStr, rightStr) => $"{leftStr}{ConstantValues.Xml.XPATH_SEGMENTS_DELIMITER}{rightStr}");
            return xPath;
        }

        public static string GetSerializedXml(Type type, object value)
        {
            StringWriter sw = new StringWriter();

            XmlSerializer xmlSerializer = new XmlSerializer(type);
            xmlSerializer.Serialize(sw, value);

            return sw.ToString();
        }

        public static string GetSerializedXml(object value)
        {
            StringWriter sw = new StringWriter();

            XmlSerializer xmlSerializer = new XmlSerializer(value.GetType());
            xmlSerializer.Serialize(sw, value);

            return sw.ToString();
        }

        public static string ObjectToStringOrXml(object value)
        {
            string retVal = value.ToString();
            if (retVal.GetType().ToString() == retVal)
            {
                retVal = GetSerializedXml(value);
            }

            return retVal;
        }
    }
}
