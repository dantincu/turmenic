using Turmenic.Core.Collection;
using Turmenic.DataAccess.VelocityDb.UnitOfWork;
using SimplePasswordTool.DataModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SimplePasswordTool.DataAccess
{
    public class UnitOfWork : UnitOfWorkBase
    {
        protected const uint PASSWORD_DATA_DATABASE_NUMBER = 1;
        protected const uint PASSWORD_OPTIONS_DATABASE_NUMBER = 2;

        public UnitOfWork(DbSession dbSession) : base(dbSession)
        {
            this.PasswordDataRepository = new PasswordDataAsyncRepository(dbSession, PASSWORD_DATA_DATABASE_NUMBER);
            this.PasswordOptionsRepository = new PasswordOptionsAsyncRepository(dbSession, PASSWORD_OPTIONS_DATABASE_NUMBER);
        }

        protected PasswordDataAsyncRepository PasswordDataRepository { get; }

        protected PasswordOptionsAsyncRepository PasswordOptionsRepository { get; }

        public Task<PasswordOptionsDataModel> GetPasswordOptionsAsync()
        {
            return this.PasswordOptionsRepository.TryGetSingleAsync(true).ContinueWith(
                task => task.IsCompletedSuccessfully ? task.Result.Item1 : null);
        }

        public Task<PasswordOptionsDataModel> SavePasswordOptionsAsync(PasswordOptionsDataModel passwordOptionsDataModel)
        {
            return this.PasswordOptionsRepository.SaveOrUpdateSingleAsync(passwordOptionsDataModel, (sourceData, destData) =>
            {
                destData.AllowedNonAlphaNumericChars = sourceData.AllowedNonAlphaNumericChars;
                destData.MaxLength = sourceData.MaxLength;
                destData.RequiredLength = sourceData.RequiredLength;
                destData.RequiredUniqueChars = sourceData.RequiredUniqueChars;
                destData.RequireNonAlphanumeric = sourceData.RequireNonAlphanumeric;
                destData.RequireDigit = sourceData.RequireDigit;
                destData.RequireLowercase = sourceData.RequireLowercase;
                destData.RequireUppercase = sourceData.RequireUppercase;
            });
        }

        public Task DeletePasswordOptionsAsync()
        {
            return this.PasswordOptionsRepository.DeleteAllAsync();
        }

        public Task<List<PasswordDataModel>> GetAllPasswordsAsync()
        {
            return this.PasswordDataRepository.GetAllAsync((itemLeft, itemRight) => itemLeft.SortIndex.CompareTo(itemRight.SortIndex));
        }

        public Task<PasswordDataModel> SavePasswordAsync(PasswordDataModel passwordDataModel)
        {
            return this.PasswordDataRepository.SaveAsync(passwordDataModel);
        }

        public Task<IEnumerable<PasswordDataModel>> SaveAllPasswordsAsync(IEnumerable<PasswordDataModel> passwordsColl)
        {
            return this.PasswordDataRepository.SaveAllAsync(passwordsColl);
        }

        public Task DeletePasswordAsync(ulong oid)
        {
            return this.PasswordDataRepository.DeleteWithIdAsync(oid);
        }

        public Task DeletePasswordValueAsync(ulong oid)
        {
            return this.PasswordDataRepository.UpdatePropsForIdAsync(oid, item => item.PasswordValue = null);
        }

        public Task DeletePasswordsAsync(IEnumerable<ulong> oidColl)
        {
            return this.PasswordDataRepository.DeleteAllAsync(oidColl);
        }

        public Task UpdatePasswordCollectionOrderAsync(ulong[] oids)
        {
            return this.PasswordDataRepository.UpdateIndexesAsync(oids.KeysToDictionary((oid, idx) => idx));
        }

        public override void Dispose()
        {
            base.Dispose();
            this.PasswordDataRepository.Dispose();
            this.PasswordOptionsRepository.Dispose();
        }
    }
}
