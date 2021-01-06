using System;
using System.Collections.Generic;

namespace SimplePasswordTool.Services
{
    public partial class PasswordService
    {
        private Action<PasswordOptions> passwordOptionsLoaded;
        private Action<PasswordOptions> passwordOptionsSaved;
        private Action<List<PasswordData>> passwordCollectionLoaded;
        private Action<PasswordData> passwordSaved;
        private Action passwordCollectionOrderSaved;
        private Action<PasswordData> passwordDeleted;
        private Action<PasswordData> passwordValueDeleted;

        private Action<AggregateException> passwordOptionsLoadError;
        private Action<AggregateException> passwordOptionsSaveError;
        private Action<AggregateException> passwordCollectionLoadError;
        private Action<AggregateException> passwordSaveError;
        private Action<AggregateException> passwordCollectionOrderSaveError;
        private Action<AggregateException> passwordDeleteError;
        private Action<AggregateException> passwordValueDeleteError;

        public event Action<PasswordOptions> PasswordOptionsLoaded
        {
            add
            {
                this.passwordOptionsLoaded += value;
            }

            remove
            {
                this.passwordOptionsLoaded -= value;
            }
        }

        public event Action<PasswordOptions> PasswordOptionsSaved
        {
            add
            {
                this.passwordOptionsSaved += value;
            }

            remove
            {
                this.passwordOptionsSaved -= value;
            }
        }

        public event Action<List<PasswordData>> PasswordCollectionLoaded
        {
            add
            {
                this.passwordCollectionLoaded += value;
            }

            remove
            {
                this.passwordCollectionLoaded -= value;
            }
        }

        public event Action<PasswordData> PasswordSaved
        {
            add
            {
                this.passwordSaved += value;
            }

            remove
            {
                this.passwordSaved -= value;
            }
        }

        public event Action PasswordCollectionOrderSaved
        {
            add
            {
                this.passwordCollectionOrderSaved += value;
            }

            remove
            {
                this.passwordCollectionOrderSaved -= value;
            }
        }

        public event Action<PasswordData> PasswordDeleted
        {
            add
            {
                this.passwordDeleted += value;
            }

            remove
            {
                this.passwordDeleted -= value;
            }
        }

        public event Action<PasswordData> PasswordValueDeleted
        {
            add
            {
                this.passwordValueDeleted += value;
            }

            remove
            {
                this.passwordValueDeleted -= value;
            }
        }

        public event Action<AggregateException> PasswordOptionsLoadError
        {
            add
            {
                this.passwordOptionsLoadError += value;
            }

            remove
            {
                this.passwordOptionsLoadError -= value;
            }
        }

        public event Action<AggregateException> PasswordOptionsSaveError
        {
            add
            {
                this.passwordOptionsSaveError += value;
            }

            remove
            {
                this.passwordOptionsSaveError -= value;
            }
        }

        public event Action<AggregateException> PasswordCollectionLoadError
        {
            add
            {
                this.passwordCollectionLoadError += value;
            }

            remove
            {
                this.passwordCollectionLoadError -= value;
            }
        }

        public event Action<AggregateException> PasswordSaveError
        {
            add
            {
                this.passwordSaveError += value;
            }

            remove
            {
                this.passwordSaveError -= value;
            }
        }

        public event Action<AggregateException> PasswordCollectionOrderSaveError
        {
            add
            {
                this.passwordCollectionOrderSaveError += value;
            }

            remove
            {
                this.passwordCollectionOrderSaveError -= value;
            }
        }

        public event Action<AggregateException> PasswordDeleteError
        {
            add
            {
                this.passwordDeleteError += value;
            }

            remove
            {
                this.passwordDeleteError -= value;
            }
        }

        public event Action<AggregateException> PasswordValueDeleteError
        {
            add
            {
                this.passwordValueDeleteError += value;
            }

            remove
            {
                this.passwordValueDeleteError -= value;
            }
        }
    }
}
