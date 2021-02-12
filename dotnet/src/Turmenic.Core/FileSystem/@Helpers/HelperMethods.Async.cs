using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Turmenic.Core.FileSystem.Components;

namespace Turmenic.Core.FileSystem
{
    public static partial class HelperMethods
    {
        public static Thread CopyFileUNewThread(string sourceFilePath, string destinationFilePath, Action copyFileSuccessCallback)
        {
            AsyncFileCopyComponent asyncFileCopyComponent = new AsyncFileCopyComponent();
            Action copyFileSuccessfullHandler = null;

            copyFileSuccessfullHandler = () =>
            {
                copyFileSuccessCallback.Invoke();
                asyncFileCopyComponent.OnFileCopySuccess -= copyFileSuccessfullHandler;
            };

            asyncFileCopyComponent.OnFileCopySuccess += copyFileSuccessfullHandler;
            Thread thread = asyncFileCopyComponent.CopyFile(sourceFilePath, destinationFilePath);

            return thread;
        }

        public static Task CopyFileAsync(string sourceFilePath, string destinationFilePath, Action copyFileSuccessCallback, bool overwrite = false, bool isLongRunning = true)
        {
            Task task = Task.Factory.StartNew(() =>
            {
                File.Copy(sourceFilePath, destinationFilePath, overwrite);
                copyFileSuccessCallback.Invoke();
            }, isLongRunning ? TaskCreationOptions.LongRunning : TaskCreationOptions.None);

            return task;
        }
    }
}
