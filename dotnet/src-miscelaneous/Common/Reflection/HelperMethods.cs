using Newtonsoft.Json;
using System;
using System.IO;
using System.Reflection;

namespace Common.Reflection
{
    public static partial class HelperMethods
    {
        public static string GetTypeFullName(this Type type)
        {
            string retVal = type.Name;

            if (type.Namespace != null)
            {
                retVal = $"{type.Namespace}.{type.Name}";
            }

            return retVal;
        }

        public static string GetAssemblyFullName(this Assembly assembly)
        {
            return assembly.GetName().Name;
        }

        public static void SerializeJson(object value, string filePath)
        {
            JsonSerializer jsonSerializer = new JsonSerializer();

            using (StreamWriter streamWriter = new StreamWriter(filePath))
            {
                using (JsonWriter jsonWriter = new JsonTextWriter(streamWriter))
                {
                    jsonSerializer.Serialize(jsonWriter, value);
                }
            }
        }

        public static T DeserializeJson<T>(string filePath)
        {
            T retVal;

            JsonSerializer jsonSerializer = new JsonSerializer();

            using (StreamReader streamReader = new StreamReader(filePath))
            {
                using (JsonReader jsonReader = new JsonTextReader(streamReader))
                {
                    retVal = jsonSerializer.Deserialize<T>(jsonReader);
                }
            }

            return retVal;
        }
    }
}
