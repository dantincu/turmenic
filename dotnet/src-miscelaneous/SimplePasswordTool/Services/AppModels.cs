using System;

namespace SimplePasswordTool.Services
{
    public class PasswordOptions
    {
        public PasswordOptions(ulong id)
        {
            this.Id = id;
        }

        public ulong Id { get; }
        public int MaxLength { get; set; }
        public int RequiredLength { get; set; }
        public int RequiredUniqueChars { get; set; }
        public bool RequireDigit { get; set; }
        public bool RequireLowercase { get; set; }
        public bool RequireNonAlphanumeric { get; set; }
        public bool RequireUppercase { get; set; }
    }

    public class PasswordData
    {
        public PasswordData(ulong id, string passwordName, string passwordValue, string passwordHash)
        {
            this.Id = id;
            this.PasswordName = !string.IsNullOrWhiteSpace(passwordName) ? passwordName : throw new ArgumentNullException(nameof(passwordName));
            this.PasswordValue = !string.IsNullOrWhiteSpace(passwordValue) ? passwordValue : throw new ArgumentNullException(nameof(passwordValue));
            this.PasswordHash = !string.IsNullOrWhiteSpace(passwordHash) ? passwordHash : throw new ArgumentNullException(nameof(passwordHash));
        }

        public ulong Id { get; }

        public string PasswordName { get; set; }

        public string PasswordValue { get; private set; }

        public string PasswordHash { get; }

        public void DeleteValue()
        {
            this.PasswordValue = null;
        }
    }
}
