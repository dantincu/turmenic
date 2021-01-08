using SimplePasswordTool.Services;
using System.Linq;

namespace SimplePasswordTool.DataModels.Mapping
{
    public static class PasswordOptionsDataModelMapper
    {
        public static PasswordOptionsDataModel ToDataModel(this PasswordOptions appModel)
        {
            return new PasswordOptionsDataModel
            {
                Id = appModel.Id,
                MaxLength = appModel.MaxLength,
                RequireDigit = appModel.RequireDigit,
                RequiredLength = appModel.RequiredLength,
                RequiredUniqueChars = appModel.RequiredUniqueChars,
                RequireLowercase = appModel.RequireLowercase,
                RequireNonAlphanumeric = appModel.RequireNonAlphanumeric,
                RequireUppercase = appModel.RequireUppercase,
                AllowedNonAlphaNumericChars = appModel.AllowedNonAlphaNumericChars
            };
        }

        public static PasswordOptions ToAppModel(this PasswordOptionsDataModel dataModel)
        {
            return new PasswordOptions(dataModel.Id)
            {
                MaxLength = dataModel.MaxLength,
                RequireDigit = dataModel.RequireDigit,
                RequiredLength = dataModel.RequiredLength,
                RequiredUniqueChars = dataModel.RequiredUniqueChars,
                RequireLowercase = dataModel.RequireLowercase,
                RequireNonAlphanumeric = dataModel.RequireNonAlphanumeric,
                RequireUppercase = dataModel.RequireUppercase,
                AllowedNonAlphaNumericChars = dataModel.AllowedNonAlphaNumericChars
            };
        }
    }
}
