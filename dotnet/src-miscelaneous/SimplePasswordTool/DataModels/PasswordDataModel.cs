using VelocityDb;

namespace SimplePasswordTool.DataModels
{
    public class PasswordDataModel : OptimizedPersistable
    {
        private string _passwordName;
        private string _passwordValue;
        private string _passwordHash;

        public string PasswordName
        {
            get
            {
                return this._passwordName;
            }

            set
            {
                this.Update();
                this._passwordName = value;
            }
        }

        public string PasswordValue
        {
            get
            {
                return this._passwordValue;
            }

            set
            {
                this.Update();
                this._passwordName = value;
            }
        }

        public string PasswordHash
        {
            get
            {
                return this._passwordHash;
            }

            set
            {
                this.Update();
                this._passwordHash = value;
            }
        }
    }
}
