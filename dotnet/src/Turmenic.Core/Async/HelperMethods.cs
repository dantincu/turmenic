using System;
using System.Threading.Tasks;

namespace Turmenic.Core.Async
{
    public static partial class HelperMethods
    {
        public static Task RegisterCallbacks(this Task task, Action<Task> successCallback, Action<Task, AggregateException> errorCallback)
        {
            task.GetAwaiter().OnCompleted(() =>
            {
                if (task.IsCompletedSuccessfully)
                {
                    successCallback.Invoke(task);
                }
                else
                {
                    errorCallback.Invoke(task, task.Exception);
                }
            });

            return task;
        }

        public static Task<T> RegisterCallbacks<T>(this Task<T> task, Action<Task<T>, T> successCallback, Action<Task<T>, AggregateException> errorCallback)
        {
            task.GetAwaiter().OnCompleted(() =>
            {
                if (task.IsCompletedSuccessfully)
                {
                    successCallback.Invoke(task, task.Result);
                }
                else
                {
                    errorCallback.Invoke(task, task.Exception);
                }
            });

            return task;
        }
    }
}
