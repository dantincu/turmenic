using System.Collections.Generic;
using VelocityDb;

namespace SimplePasswordTool.DataModels
{
    public class PasswordOptionsDataModel : OptimizedPersistable
    {
        private int maxLength;
        private int requiredLength;
        private int requiredUniqueChars;
        private bool requireDigit;
        private bool requireLowercase;
        private bool requireNonAlphanumeric;
        private bool requireUppercase;
        private string allowedNonAlphaNumericChars;

        public int MaxLength
        {
            get
            {
                return this.maxLength;
            }

            set
            {
                this.Update();
                this.maxLength = value;
            }
        }

        public int RequiredLength
        {
            get
            {
                return this.requiredLength;
            }

            set
            {
                this.Update();
                this.requiredLength = value;
            }
        }

        public int RequiredUniqueChars
        {
            get
            {
                return this.requiredUniqueChars;
            }

            set
            {
                this.Update();
                this.requiredUniqueChars = value;
            }
        }

        public bool RequireDigit
        {
            get
            {
                return this.requireDigit;
            }

            set
            {
                this.Update();
                this.requireDigit = value;
            }
        }

        public bool RequireLowercase
        {
            get
            {
                return this.requireLowercase;
            }

            set
            {
                this.Update();
                this.requireLowercase = value;
            }
        }

        public bool RequireNonAlphanumeric
        {
            get
            {
                return this.requireNonAlphanumeric;
            }

            set
            {
                this.Update();
                this.requireNonAlphanumeric = value;
            }
        }

        public bool RequireUppercase
        {
            get
            {
                return this.requireUppercase;
            }

            set
            {
                this.Update();
                this.requireUppercase = value;
            }
        }

        public string AllowedNonAlphaNumericChars
        {
            get
            {
                return this.allowedNonAlphaNumericChars;
            }

            set
            {
                this.Update();
                this.allowedNonAlphaNumericChars = value;
            }
        }
    }
}
