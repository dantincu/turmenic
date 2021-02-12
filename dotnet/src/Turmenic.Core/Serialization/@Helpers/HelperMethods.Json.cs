using Newtonsoft.Json;
using System.IO;

namespace Turmenic.Core.Serialization
{
    public static partial class HelperMethods
    {
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
