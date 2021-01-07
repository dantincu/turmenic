using System;
using System.IO;
using System.Threading;

namespace Tncvd.Core.FileSystem
{
    public class AsyncFileCopyComponent<TSuccessCallbackArg>
    {
        private Action<TSuccessCallbackArg> _fileCopySuccessHandler;

        public event Action<TSuccessCallbackArg> OnFileCopySuccess
        {
            add
            {
                this._fileCopySuccessHandler += value;
            }

            remove
            {
                this._fileCopySuccessHandler -= value;
            }
        }

        public Thread CopyFile(string sourceFilePath, string destinationFilePath, TSuccessCallbackArg successCallbackArg)
        {
            Thread thread = Threading.HelperMethods.LaunchNewThread(() =>
            {
                File.Copy(sourceFilePath, destinationFilePath);
                this._fileCopySuccessHandler.Invoke(successCallbackArg);
            });

            return thread;
        }
    }

    public class AsyncFileCopyComponent
    {
        private Action _fileCopySuccessHandler;

        public event Action OnFileCopySuccess
        {
            add
            {
                this._fileCopySuccessHandler += value;
            }

            remove
            {
                this._fileCopySuccessHandler -= value;
            }
        }

        public Thread CopyFile(string sourceFilePath, string destinationFilePath)
        {
            Thread thread = Threading.HelperMethods.LaunchNewThread(() =>
            {
                File.Copy(sourceFilePath, destinationFilePath);
                this._fileCopySuccessHandler.Invoke();
            });

            return thread;
        }
    }
}
