using System.Windows.Forms;
using Tncvd.WinForms.Controls;
using Tncvd.WinForms.Controls.Components.Base;

namespace Tncvd.WinForms.Forms.AppContainerWindow.Components
{
    public class AppContainerTabControlCreator : AppControlCreator<AppTabControl>
    {
    }

    public class AppContainerTabControlWrapper : AppControlWrapper<AppTabControl>
    {
        public AppContainerTabControlWrapper(AppTabControl appTabControl) : base(appTabControl)
        {
        }

        public AppContainerMainTabPageWrapperReadonly MainTabPageCtrl { get; set; }
        public AppContainerLogsTabPageWrapperReadonly LogsTabPageCtrl { get; set; }
        public AppContainerOutputTabPageWrapperReadonly OutputTabPageCtrl { get; set; }
    }

    public class AppContainerTabControlWrapperReadonly : AppControlWrapperReadonly<AppTabControl>
    {
        public AppContainerTabControlWrapperReadonly(AppContainerTabControlWrapper wrapper) : base(wrapper)
        {
            MainTabPageCtrl = wrapper.MainTabPageCtrl;
            LogsTabPageCtrl = wrapper.LogsTabPageCtrl;
            OutputTabPageCtrl = wrapper.OutputTabPageCtrl;
        }

        public AppContainerMainTabPageWrapperReadonly MainTabPageCtrl { get; }
        public AppContainerLogsTabPageWrapperReadonly LogsTabPageCtrl { get; }
        public AppContainerOutputTabPageWrapperReadonly OutputTabPageCtrl { get; }
    }

    public class AppContainerTabControlAttachBridge : AppControlAttachBridge<Control, AppTabControl, AppContainerTabControlCreator, AppContainerTabControlWrapper, AppContainerTabControlWrapperReadonly>
    {
        public AppContainerTabControlAttachBridge(Control parentControl) : base(parentControl)
        {
        }

        protected override void BuildControl()
        {
            base.BuildControl();

            ControlWrapper.MainTabPageCtrl = new AppContainerMainTabPageAttachBridge(Control).CreateAndAttach();
            ControlWrapper.LogsTabPageCtrl = new AppContainerLogsTabPageAttachBridge(Control).CreateAndAttach();
            ControlWrapper.OutputTabPageCtrl = new AppContainerOutputTabPageAttachBridge(Control).CreateAndAttach();
        }
    }
}
