using System.Security.Cryptography;
using System.Text;

namespace SimplePasswordTool.Services
{
    public class PasswordHelper
    {
        private readonly SHA256 sha256 = SHA256.Create();

        public bool DoPasswordsMatch(string typedPasswordValue, string actualPasswordHash)
        {
            string computedHash = this.GenerateHash(typedPasswordValue);
            return actualPasswordHash == computedHash;
        }

        public string GenerateHash(string value)
        {
            byte[] valueBytes = Encoding.UTF8.GetBytes(value);
            byte[] hashValue = this.sha256.ComputeHash(valueBytes);

            string hashString = this.EncodeBase16(hashValue);
            return hashString;
        }

        public void Dispose()
        {
            this.sha256.Dispose();
        }

        private string EncodeBase16(byte[] byteArr)
        {
            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < byteArr.Length; i++)
            {
                sb.AppendFormat("{0:x}", byteArr[i]);
            }

            return sb.ToString();
        }
    }
}
