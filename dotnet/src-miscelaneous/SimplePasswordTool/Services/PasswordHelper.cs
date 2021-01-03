using IdentityModel;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace SimplePasswordTool.Services
{
    public class PasswordHelper
    {
        public const int MAX_PASSWORD_LENGTH = 128;
        public const int MIN_PASSWORD_LENGTH = 4;

        private readonly SHA256 _sha256 = SHA256.Create();
        private readonly CryptoRandom _rand = new CryptoRandom();

        private readonly ReadOnlyCollection<string> _randomChars = new ReadOnlyCollection<string>(new[] {
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ", // uppercase 
            "abcdefghijklmnopqrstuvwxyz", // lowercase
            "0123456789",                 // digits
            "!@#$%^&*()_-+=[{]};:<>|./?"  // non-alphanumeric
        });

        public PasswordHelper(PasswordOptions passwordOptions)
        {
            this.PasswordOptions = passwordOptions ?? throw new ArgumentNullException(nameof(passwordOptions));
        }

        public PasswordOptions PasswordOptions { get; }

        public bool DoPasswordsMatch(string typedPasswordValue, string actualPasswordHash)
        {
            string computedHash = this.GenerateHash(typedPasswordValue);
            return actualPasswordHash == computedHash;
        }

        public string GenerateHash(string value)
        {
            byte[] valueBytes = Encoding.UTF8.GetBytes(value);
            byte[] hashValue = this._sha256.ComputeHash(valueBytes);

            string hashString = this.EncodeBase16(hashValue);
            return hashString;
        }

        /// <summary>
        /// Generates a Random Password
        /// respecting the given strength requirements.
        /// </summary>
        /// <param name="opts">A valid PasswordOptions object
        /// containing the password strength requirements.</param>
        /// <returns>A random password</returns>
        public string GenerateRandomPassword(PasswordOptions opts = null)
        {
            opts = opts ?? this.PasswordOptions;
            List<char> chars = new List<char>();

            if (opts.RequireUppercase)
            {
                this.AddRandomChar(chars, 0);
            }

            if (opts.RequireLowercase)
            {
                this.AddRandomChar(chars, 1);
            }

            if (opts.RequireDigit)
            {
                this.AddRandomChar(chars, 2);
            }

            if (opts.RequireNonAlphanumeric)
            {
                this.AddRandomChar(chars, 3);
            }

            for (int i = chars.Count; i < opts.RequiredLength
                || chars.Distinct().Count() < opts.RequiredUniqueChars; i++)
            {
                this.AddRandomChar(chars);
            }

            if (chars.Count > opts.MaxLength)
            {
                this.RemoveDuplicates(chars, chars.Count - opts.MaxLength);
            }

            return new string(chars.ToArray());
        }

        public void Dispose()
        {
            this._sha256.Dispose();
        }

        private void RemoveDuplicates(List<char> chars, int charsToRemoveCount)
        {
            List<KeyValuePair<char, List<int>>> charDupPairList = this.GetCharDupPairList(chars);

            for (int i = 0; i < charsToRemoveCount; i++)
            {
                this.SortCharDupPairList(charDupPairList);
                this.RemoveRandomDuplicate(charDupPairList);
            }
        }

        private void RemoveRandomDuplicate(List<KeyValuePair<char, List<int>>> charDupPairList)
        {
            List<int> indexList = charDupPairList.First().Value;

            while (this.TryRemoveRandomDuplicate(indexList) == false)
            {
            }
        }

        private bool TryRemoveRandomDuplicate(List<int> indexList)
        {
            return this.RemoveIfExists(
                indexList,
                this.GetRandomIndex(indexList));
        }

        private bool RemoveIfExists(List<int> indexList, int index)
        {
            bool exists = indexList[index] >= 0;
            indexList[index] = -1;

            return exists;
        }

        private void SortCharDupPairList(List<KeyValuePair<char, List<int>>> charDupPairList)
        {
            charDupPairList.Sort((leftPair, rightPair) => rightPair.Value.Count.CompareTo(leftPair.Value.Count));
        }

        private List<KeyValuePair<char, List<int>>> GetCharDupPairList(List<char> chars)
        {
            Dictionary<char, List<int>> charDupDict = new Dictionary<char, List<int>>();

            for (int i = 0; i < chars.Count; i++)
            {
                this.AddCharToDupDict(charDupDict, chars, i);
            }

            return charDupDict.ToList();
        }

        private void AddCharToDupDict(Dictionary<char, List<int>> charDupDict, List<char> chars, int charIndex)
        {
            char chr = chars[charIndex];

            List<int> charDupList;

            if (charDupDict.TryGetValue(chr, out charDupList) == false)
            {
                charDupList = new List<int>();
                charDupDict.Add(chr, charDupList);
            }

            charDupList.Add(charIndex);
        }

        private void AddRandomChar(List<char> chars, int randomCharIndex)
        {
            string rcs = this._randomChars[randomCharIndex];
            chars.Insert(
                this.GetRandomIndex(chars),
                this.GetRandomChar(rcs));
        }

        private void AddRandomChar(List<char> chars)
        {
            this.AddRandomChar(chars, this.GetRandomIndex(this._randomChars));
        }

        private int GetRandomIndex<T>(IEnumerable<T> collection)
        {
            return this._rand.Next(0, collection.Count());
        }

        private char GetRandomChar(string value)
        {
            return value[this.GetRandomIndex(value)];
        }

        private T GetRandomValue<T>(IList<T> list)
        {
            return list[this.GetRandomIndex(list)];
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
