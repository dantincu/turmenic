using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Xml.Serialization;

namespace Tncvd.Utility
{
    public static class SerializationHelperMethods
    {
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
