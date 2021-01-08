using VelocityDb;

namespace SimplePasswordTool.DataModels
{
    public class PasswordDataModel : OptimizedPersistable
    {
        private int sortIndex;
        private string passwordName;
        private string passwordValue;
        private string passwordHash;

        public int SortIndex
        {
            get
            {
                return this.sortIndex;
            }

            set
            {
                this.Update();
                this.sortIndex = value;
            }
        }

        public string PasswordName
        {
            get
            {
                return this.passwordName;
            }

            set
            {
                this.Update();
                this.passwordName = value;
            }
        }

        public string PasswordValue
        {
            get
            {
                return this.passwordValue;
            }

            set
            {
                this.Update();
                this.passwordValue = value;
            }
        }

        public string PasswordHash
        {
            get
            {
                return this.passwordHash;
            }

            set
            {
                this.Update();
                this.passwordHash = value;
            }
        }
    }
}
