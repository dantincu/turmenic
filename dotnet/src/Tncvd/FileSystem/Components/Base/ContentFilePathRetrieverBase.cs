using System.IO;
using Tncvd.AppConfig.Env;
using Tncvd.Components;
using Tncvd.Reflection;

namespace Tncvd.FileSystem.Components.Base
{
    public abstract class ContentFilePathRetrieverBase
    {
        public virtual string GetFilePath()
        {
            return Path.Combine(
                this.GetFileDirPath(),
                this.GetFileName());
        }

        protected virtual string GetFileName()
        {
            return HelperMethods.GetSlugFileNameFromSegments(
                this.GetFileExtension(),
                this.GetContentFileNameSegments());
        }

        protected virtual string GetFileDirPath()
        {
            string relPath = Path.Combine(GetContentFileDirPathParts());
            return Path.Combine(GetContentBasePath(), relPath);
        }

        protected abstract string GetFileExtension();

        protected abstract string[] GetContentFileNameSegments();

        protected abstract string[] GetContentFileDirPathParts();

        protected virtual string GetContentBasePath()
        {
            return this.GetAssemblyContentBasePath();
        }

        protected string GetAssemblyContentBasePath()
        {
            return AppEnvConfigContainer.Instance.GetEnvContentPath(GetType().Assembly);
        }

        protected string GetTypeContentBasePath()
        {
            return AppEnvConfigContainer.Instance.GetEnvContentPath(GetType());
        }
    }
}
