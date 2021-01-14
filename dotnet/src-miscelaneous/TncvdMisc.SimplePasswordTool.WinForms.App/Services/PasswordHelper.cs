using System.Security.Cryptography;
using System.Text;
using Tncvd.Core.Serialization;
using Tncvd.Core.Collection;

namespace SimplePasswordTool.Services
{
    public class PasswordHelper
    {
        private readonly SHA256 sha256 = SHA256.Create();

        public bool DoPasswordsMatch(string typedPasswordValue, byte[] actualPasswordHash)
        {
            byte[] computedHash = this.GenerateHash(typedPasswordValue);
            bool retVal = actualPasswordHash.IsEqualTo(computedHash);

            return retVal;
        }

        public string GenerateStringHash(string value)
        {
            byte[] hashValue = this.GenerateHash(value);

            string hashString = hashValue.ToHexCode();
            return hashString;
        }

        public byte[] GenerateHash(string value)
        {
            byte[] valueBytes = Encoding.UTF8.GetBytes(value);
            byte[] hashValue = this.sha256.ComputeHash(valueBytes);

            return hashValue;
        }

        public void Dispose()
        {
            this.sha256.Dispose();
        }
    }
}
