using Tncvd.Core.Async;
using Tncvd.Logging.Logger;
using SimplePasswordTool.DataAccess;
using SimplePasswordTool.DataModels;
using SimplePasswordTool.DataModels.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimplePasswordTool.Services
{
    public partial class PasswordService : IDisposable
    {
        public const int MIN_PASSWORD_LENGTH = 4;
        public const int MAX_PASSWORD_LENGTH = 128;
        public const string DEFAULT_ALLOWED_NON_ALPHA_NUMERIC_CHARS = "!@#$%^&*()_-+=[{]};:<>|./?";

        private readonly FileLogger logger;
        private readonly UnitOfWork unitOfWork;

        public PasswordService()
        {
            this.logger = new FileLogger(this.GetType());
            this.unitOfWork = new UnitOfWork(DataAccess.Utils.HelperMethods.GetDefaultDbSession());
        }

        public List<PasswordData> PasswordCollection { get; private set; }
        public PasswordOptions PasswordOptions { get; private set; }

        public Task LoadData()
        {
            return Task.WhenAll(
                this.LoadPasswordCollectionAsync().ContinueWith(
                    task => this.LoadPasswordOptionsAsync()));
        }

        public Task SavePasswordOptions()
        {
            return Task.WhenAll(
                this.SavePasswordOptionsAsync());
        }

        public Task SavePassword(PasswordData appModel)
        {
            return Task.WhenAll(this.SavePasswordAsync(appModel.ToDataModel()));
        }

        public Task UpdatePasswordCollectionOrder()
        {
            return Task.WhenAll(this.UpdatePasswordCollectionOrderAsync(this.GetPasswordDataIds()));
        }

        public Task DeletePassword(PasswordData appModel)
        {
            return Task.WhenAll(this.DeletePasswordAsync(appModel));
        }

        public Task DeletePasswordValue(PasswordData appModel)
        {
            return Task.WhenAll(this.DeletePasswordValueAsync(appModel));
        }

        public void Dispose()
        {
            this.unitOfWork.Dispose();
        }

        #region LoadPasswordOptionsAsync

        private Task<PasswordOptionsDataModel> LoadPasswordOptionsAsync()
        {
            return this.unitOfWork.GetPasswordOptionsAsync().RegisterCallbacks(
                this.PasswordOptionsLoadQuerySuccessHandler,
                this.PasswordOptionsLoadedErrorHandler);
        }

        private void PasswordOptionsLoadQuerySuccessHandler(Task<PasswordOptionsDataModel> task, PasswordOptionsDataModel dataModel)
        {
            if (dataModel == null)
            {
                this.unitOfWork.SavePasswordOptionsAsync(
                    this.GetDefaultOptionsDataModel()).RegisterCallbacks(
                    this.PasswordOptionsLoadedSuccessHandler,
                    this.PasswordOptionsLoadedErrorHandler);
            }
            else
            {
                this.PasswordOptionsLoadedSuccessHandler(task, dataModel);
            }
        }

        private void PasswordOptionsLoadedSuccessHandler(Task<PasswordOptionsDataModel> task, PasswordOptionsDataModel dataModel)
        {
            PasswordOptions appModel = dataModel.ToAppModel();
            this.PasswordOptions = appModel;
            this.passwordOptionsLoaded.Invoke(appModel);
        }

        private void PasswordOptionsLoadedErrorHandler(Task<PasswordOptionsDataModel> task, AggregateException ex)
        {
            this.passwordCollectionLoadError.Invoke(ex);
        }

        private PasswordOptionsDataModel GetDefaultOptionsDataModel()
        {
            return new PasswordOptionsDataModel
            {
                MaxLength = MIN_PASSWORD_LENGTH * 4,
                RequiredLength = MIN_PASSWORD_LENGTH * 2,
                RequiredUniqueChars = MIN_PASSWORD_LENGTH,
                RequireDigit = true,
                RequireLowercase = true,
                RequireNonAlphanumeric = true,
                RequireUppercase = true,
                AllowedNonAlphaNumericChars = DEFAULT_ALLOWED_NON_ALPHA_NUMERIC_CHARS
            };
        }

        #endregion LoadPasswordOptionsAsync

        private Task<PasswordOptionsDataModel> SavePasswordOptionsAsync()
        {
            return this.unitOfWork.SavePasswordOptionsAsync(this.PasswordOptions.ToDataModel()).RegisterCallbacks(
                (task, data) =>
                {
                    this.passwordOptionsSaved.Invoke(data.ToAppModel());
                },
                (task, ex) =>
                {
                    this.passwordOptionsSaveError.Invoke(ex);
                });
        }

        private Task<List<PasswordDataModel>> LoadPasswordCollectionAsync()
        {
            return this.unitOfWork.GetAllPasswordsAsync().RegisterCallbacks((task, data) =>
            {
                List<PasswordData> appModelList = data.Select(item => item.ToAppModel()).ToList();
                this.PasswordCollection = appModelList;
                this.passwordCollectionLoaded.Invoke(appModelList);
            }, (task, ex) =>
            {
                this.passwordCollectionLoadError.Invoke(ex);
            });
        }

        private Task<PasswordDataModel> SavePasswordAsync(PasswordDataModel dataModel)
        {
            return this.unitOfWork.SavePasswordAsync(dataModel).RegisterCallbacks(
                (task, data) =>
                {
                    this.passwordSaved.Invoke(data.ToAppModel());
                },
                (task, ex) =>
                {
                    this.passwordSaveError.Invoke(ex);
                });
        }

        private Task UpdatePasswordCollectionOrderAsync(ulong[] oids)
        {
            return this.unitOfWork.UpdatePasswordCollectionOrderAsync(oids).RegisterCallbacks(
                task =>
                {
                    this.passwordCollectionOrderSaved.Invoke();
                }, (task, ex) =>
                {
                    this.passwordCollectionOrderSaveError.Invoke(ex);
                });
        }

        private Task DeletePasswordAsync(PasswordData appModel)
        {
            return this.unitOfWork.DeletePasswordAsync(appModel.Id).RegisterCallbacks(
                task =>
                {
                    this.passwordDeleted.Invoke(appModel);
                }, (task, ex) =>
                {
                    this.passwordDeleteError.Invoke(ex);
                });
        }

        private Task DeletePasswordValueAsync(PasswordData appModel)
        {
            return this.unitOfWork.DeletePasswordValueAsync(appModel.Id).RegisterCallbacks(
                task =>
                {
                    this.passwordValueDeleted.Invoke(appModel);
                }, (task, ex) =>
                {
                    this.passwordValueDeleteError.Invoke(ex);
                });
        }

        private ulong[] GetPasswordDataIds()
        {
            return this.PasswordCollection.Select(item => item.Id).ToArray();
        }
    }
}
