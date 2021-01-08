using IdentityModel;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace SimplePasswordTool.Services
{
    public class PasswordGenerator
    {
        public static readonly ReadOnlyCollection<string> BasicRandomChars = new ReadOnlyCollection<string>(new string[] {
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ", // uppercase 
            "abcdefghijklmnopqrstuvwxyz", // lowercase
            "0123456789",
        });

        public static readonly int BasicRandomCharsCount = BasicRandomChars.Select(arr => arr?.Length ?? 0).Sum();

        private readonly CryptoRandom rand = new CryptoRandom();

        private readonly List<string> randomChars = new List<string>() {
            BasicRandomChars[0], // uppercase 
            BasicRandomChars[1], // lowercase
            BasicRandomChars[2], // digits
        };

        public PasswordGenerator(PasswordOptions passwordOptions)
        {
            this.PasswordOptions = passwordOptions ?? throw new ArgumentNullException(nameof(passwordOptions));

            if (string.IsNullOrWhiteSpace(passwordOptions.AllowedNonAlphaNumericChars) == false)
            {
                this.randomChars.Add(passwordOptions.AllowedNonAlphaNumericChars);
            }
        }

        protected PasswordOptions PasswordOptions { get; }

        /// <summary>
        /// Generates a Random Password
        /// respecting the given strength requirements.
        /// </summary>
        /// <param name="opts">A valid PasswordOptions object
        /// containing the password strength requirements.</param>
        /// <returns>A random password</returns>
        public string GenerateRandomPassword()
        {
            List<char> chars = new List<char>();
            List<char>[] availableUniqueChars = this.randomChars.Where(
                str => string.IsNullOrWhiteSpace(str) == false).Select(str => str.ToList()).ToArray();

            this.AddRequiredCharTypes(chars, availableUniqueChars);
            this.AddRequiredUniqueChars(chars, availableUniqueChars);
            this.AddRequiredLengthChars(chars, availableUniqueChars);
            this.AddRandomCountChars(chars, availableUniqueChars);

            return new string(chars.ToArray());
        }

        private void AddRequiredCharTypes(List<char> chars, List<char>[] availableUniqueChars)
        {
            if (this.PasswordOptions.RequireUppercase)
            {
                this.AddRandomChar(chars, 0, availableUniqueChars, true);
            }

            if (this.PasswordOptions.RequireLowercase)
            {
                this.AddRandomChar(chars, 1, availableUniqueChars, true);
            }

            if (this.PasswordOptions.RequireDigit)
            {
                this.AddRandomChar(chars, 2, availableUniqueChars, true);
            }

            if (this.PasswordOptions.RequireNonAlphanumeric && this.randomChars.Count == 4)
            {
                this.AddRandomChar(chars, 3, availableUniqueChars, true);
            }
        }

        private void AddRequiredUniqueChars(List<char> chars, List<char>[] availableUniqueChars)
        {
            int length = chars.Count;
            int uniqueCharsCount = chars.Distinct().Count();

            while (uniqueCharsCount < this.PasswordOptions.RequiredUniqueChars)
            {
                this.AddRandomChar(chars, availableUniqueChars, true);
                uniqueCharsCount++;
            }
        }

        private void AddRequiredLengthChars(List<char> chars, List<char>[] availableUniqueChars)
        {
            int length = chars.Count;

            while (length < this.PasswordOptions.RequiredLength)
            {
                this.AddRandomChar(chars, availableUniqueChars, false);
                length++;
            }
        }

        private void AddRandomCountChars(List<char> chars, List<char>[] availableUniqueChars)
        {
            int maxAdditionalChars = this.PasswordOptions.MaxLength - chars.Count;

            if (maxAdditionalChars > 0)
            {
                int randomCount = this.rand.Next(0, maxAdditionalChars);

                for (int i = 0; i < randomCount; i++)
                {
                    this.AddRandomChar(chars, availableUniqueChars, false);
                }
            }
        }

        private void AddRandomChar(List<char> chars, List<char> availableUniqueChars, bool substractAddedFromAvailable)
        {
            char rc = this.GetRandomChar(availableUniqueChars);

            if (substractAddedFromAvailable)
            {
                availableUniqueChars.Remove(rc);
            }

            chars.Insert(
                this.GetRandomIndex(chars),
                rc);
        }

        private void AddRandomChar(List<char> chars, int randomCharIndex, List<char>[] availableUniqueChars, bool substractAddedFromAvailable)
        {
            this.AddRandomChar(chars, availableUniqueChars[randomCharIndex], substractAddedFromAvailable);
        }

        private void AddRandomChar(List<char> chars, List<char>[] availableUniqueChars, bool substractAddedFromAvailable)
        {
            this.AddRandomChar(chars, this.GetRandomIndex(this.randomChars), availableUniqueChars, substractAddedFromAvailable);
        }

        private int GetRandomIndex<T>(IEnumerable<T> collection)
        {
            return this.rand.Next(0, collection.Count());
        }

        private char GetRandomChar(List<char> value)
        {
            return value[this.GetRandomIndex(value)];
        }

        private T GetRandomValue<T>(IList<T> list)
        {
            return list[this.GetRandomIndex(list)];
        }

        #region RemoveDupplicates

        /*
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
        }*/

        #endregion RemoveDupplicates

    }
}
