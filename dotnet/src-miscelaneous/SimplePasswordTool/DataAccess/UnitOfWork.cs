using DataAccess;
using SimplePasswordTool.DataModels;
using System.Collections.Generic;
using System.Linq;

namespace SimplePasswordTool.DataAccess
{
    public class UnitOfWork : UnitOfWorkBase
    {
        protected const uint PASSWORD_DATA_DATABASE_NUMBER = 1;
        protected const uint PASSWORD_OPTIONS_DATABASE_NUMBER = 2;

        public UnitOfWork(DbSession dbSession) : base(dbSession)
        {
            this.PasswordDataRepository = new PasswordDataRepository(dbSession, PASSWORD_DATA_DATABASE_NUMBER);
            this.PasswordOptionsRepository = new PasswordOptionsRepository(dbSession, PASSWORD_OPTIONS_DATABASE_NUMBER);
        }

        protected PasswordDataRepository PasswordDataRepository { get; }

        protected PasswordOptionsRepository PasswordOptionsRepository { get; }

        public PasswordOptionsDataModel GetPasswordOptions()
        {
            return this.PasswordOptionsRepository.GetAll().SingleOrDefault();
        }

        public PasswordOptionsDataModel SavePasswordOptions(PasswordOptionsDataModel passwordOptionsDataModel)
        {
            return this.PasswordOptionsRepository.Save(passwordOptionsDataModel);
        }

        public void DeletePasswordOptions()
        {
            this.PasswordOptionsRepository.DeleteAll();
        }

        public List<PasswordDataModel> GetAllPasswords()
        {
            return this.PasswordDataRepository.GetAll();
        }

        public PasswordDataModel SavePassword(PasswordDataModel passwordDataModel)
        {
            return this.PasswordDataRepository.Save(passwordDataModel);
        }

        public IEnumerable<PasswordDataModel> SaveAllPasswords(IEnumerable<PasswordDataModel> passwordsColl)
        {
            return this.PasswordDataRepository.SaveAll(passwordsColl);
        }

        public void DeletePassword(ulong oid)
        {
            this.PasswordDataRepository.DeleteWithId(oid);
        }

        public void DeletePasswords(IEnumerable<ulong> oidColl)
        {
            this.PasswordDataRepository.DeleteAll(oidColl);
        }

        public override void Dispose()
        {
            base.Dispose();
            this.PasswordDataRepository.Dispose();
            this.PasswordOptionsRepository.Dispose();
        }
    }
}
