using System;
using System.Collections.Generic;
using System.Linq;
using Logging;
using SimplePasswordTool.DataAccess;
using SimplePasswordTool.DataModels.Mapping;

namespace SimplePasswordTool.Services
{
    public partial class PasswordService : IDisposable
    {
        private readonly SimpleFileLogger _logger;
        private readonly UnitOfWork _unitOfWork;

        public PasswordService()
        {
            this._logger = new SimpleFileLogger(this.GetType());
            this._unitOfWork = new UnitOfWork(DataAccess.HelperMethods.GetDefaultDbSession());
        }

        public List<PasswordData> PasswordCollection { get; private set; }
        public PasswordOptions PasswordOptions { get; private set; }

        public void LoadData()
        {
            this.PasswordOptions = this._unitOfWork.GetPasswordOptions()?.ToAppModel() ?? this.GetDefaultOptions();
            this.PasswordCollection = this._unitOfWork.GetAllPasswords().Select(model => model.ToAppModel()).ToList();
        }

        public void SaveData()
        {
            this.PasswordOptions = this._unitOfWork.SavePasswordOptions(this.PasswordOptions.ToDataModel()).ToAppModel();
            this.PasswordCollection = this._unitOfWork.SaveAllPasswords(this.PasswordCollection.Select(model => model.ToDataModel())).Select(model => model.ToAppModel()).ToList();
        }

        public void Dispose()
        {
            this._unitOfWork.Dispose();
        }

        private PasswordOptions GetDefaultOptions()
        {
            return new PasswordOptions(0)
            {
                RequiredLength = 8,
                RequiredUniqueChars = 4,
                RequireDigit = true,
                RequireLowercase = true,
                RequireNonAlphanumeric = true,
                RequireUppercase = true
            };
        }
    }
}
