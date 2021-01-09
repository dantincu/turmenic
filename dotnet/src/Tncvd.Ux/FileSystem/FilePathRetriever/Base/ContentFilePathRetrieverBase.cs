using System.IO;
using Tncvd.Core.AppConfig;

namespace Tncvd.Ux.FileSystem.FilePathRetriever.Base
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
            return Core.FileSystem.HelperMethods.GetSlugFileNameFromSegments(
                this.GetFileExtension(),
                this.GetContentFileNameSegments());
        }

        protected virtual string GetFileDirPath()
        {
            string relPath = Path.Combine(this.GetContentFileDirPathParts());
            return Path.Combine(this.GetContentBasePath(), relPath);
        }

        protected abstract string GetFileExtension();

        protected abstract string[] GetContentFileNameSegments();

        protected abstract string[] GetContentFileDirPathParts();

        protected virtual string GetContentBasePath()
        {
            return RootEnvConfigContainer.Instance.GetRootEnvRelPath(RootEnvDir.Content);
        }
    }
}
