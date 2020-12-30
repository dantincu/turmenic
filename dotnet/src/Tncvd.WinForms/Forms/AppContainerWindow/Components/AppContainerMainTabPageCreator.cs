using Tncvd.WinForms.Controls;
using Tncvd.WinForms.Controls.Components.Base;

namespace Tncvd.WinForms.Forms.AppContainerWindow.Components
{
    public class AppContainerMainTabPageCreator : AppControlCreator<AppTabPage>
    {
    }

    public class AppContainerMainTabPageWrapper : AppControlWrapper<AppTabPage>
    {
        public AppContainerMainTabPageWrapper(AppTabPage control) : base(control)
        {
        }
    }

    public class AppContainerMainTabPageWrapperReadonly : AppControlWrapperReadonly<AppTabPage>
    {
        public AppContainerMainTabPageWrapperReadonly(AppContainerMainTabPageWrapper wrapper) : base(wrapper)
        {
        }
    }

    public class AppContainerMainTabPageAttachBridge : AppControlAttachBridge<AppTabControl, AppTabPage, AppContainerMainTabPageCreator, AppContainerMainTabPageWrapper, AppContainerMainTabPageWrapperReadonly>
    {
        public AppContainerMainTabPageAttachBridge(AppTabControl parentControl) : base(parentControl)
        {
        }

        protected override void BuildControl()
        {
            base.BuildControl();
        }

        protected override void AttachControl()
        {
            ParentControl.TabPages.Add(Control);
        }
    }
}
