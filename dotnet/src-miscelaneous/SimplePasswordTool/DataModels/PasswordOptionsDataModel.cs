using VelocityDb;

namespace SimplePasswordTool.DataModels
{
    public class PasswordOptionsDataModel : OptimizedPersistable
    {
        private int _maxLength;
        private int _requiredLength;
        private int _requiredUniqueChars;
        private bool _requireDigit;
        private bool _requireLowercase;
        private bool _requireNonAlphanumeric;
        private bool _requireUppercase;

        public int MaxLength
        {
            get
            {
                return this._maxLength;
            }

            set
            {
                this.Update();
                this._maxLength = value;
            }
        }

        public int RequiredLength
        {
            get
            {
                return this._requiredLength;
            }

            set
            {
                this.Update();
                this._requiredLength = value;
            }
        }

        public int RequiredUniqueChars
        {
            get
            {
                return this._requiredUniqueChars;
            }

            set
            {
                this.Update();
                this._requiredUniqueChars = value;
            }
        }

        public bool RequireDigit
        {
            get
            {
                return this._requireDigit;
            }

            set
            {
                this.Update();
                this._requireDigit = value;
            }
        }

        public bool RequireLowercase
        {
            get
            {
                return this._requireLowercase;
            }

            set
            {
                this.Update();
                this._requireLowercase = value;
            }
        }

        public bool RequireNonAlphanumeric
        {
            get
            {
                return this._requireNonAlphanumeric;
            }

            set
            {
                this.Update();
                this._requireNonAlphanumeric = value;
            }
        }

        public bool RequireUppercase
        {
            get
            {
                return this._requireUppercase;
            }

            set
            {
                this.Update();
                this._requireUppercase = value;
            }
        }
    }
}
