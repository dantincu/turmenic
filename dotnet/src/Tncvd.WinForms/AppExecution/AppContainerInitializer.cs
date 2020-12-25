using System;
using Tncvd.WinForms.Forms;

namespace Tncvd.WinForms.AppExecution
{
    public class AppContainerInitializer
    {
        public Func<MainAppFormBase> MainAppFormCreator { get; set; }
        public Action<AppContainerForm> AppContainerFormPropsAssigner { get; set; }
    }
}
