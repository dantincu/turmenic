using SimplePasswordTool.Services;

namespace SimplePasswordTool.DataModels.Mapping
{
    public static class PasswordDataModelMapper
    {
        public static PasswordDataModel ToDataModel(this PasswordData appModel)
        {
            return new PasswordDataModel
            {
                Id = appModel.Id,
                PasswordName = appModel.PasswordName,
                PasswordValue = appModel.PasswordValue,
                PasswordHash = appModel.PasswordHash
            };
        }

        public static PasswordData ToAppModel(this PasswordDataModel dataModel)
        {
            return new PasswordData(
                dataModel.Id,
                dataModel.PasswordName,
                dataModel.PasswordValue,
                dataModel.PasswordHash);
        }
    }
}
