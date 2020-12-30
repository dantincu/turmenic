using Tncvd.WinForms.Controls;
using Tncvd.WinForms.Controls.Components;
using Tncvd.WinForms.Controls.Components.Base;

namespace Tncvd.WinForms.Forms.AppContainerWindow.Components
{
    public class AppContainerLogsTabPageCreator : AppControlCreator<AppTabPage>
    {
    }

    public class AppContainerLogsTabPageWrapper : AppControlWrapper<AppTabPage>
    {
        public AppContainerLogsTabPageWrapper(AppTabPage control) : base(control)
        {
        }

        public RichTextBoxWrapperReadonly TextBox { get; set; }
    }

    public class AppContainerLogsTabPageWrapperReadonly : AppControlWrapperReadonly<AppTabPage>
    {
        public AppContainerLogsTabPageWrapperReadonly(AppContainerLogsTabPageWrapper wrapper) : base(wrapper)
        {
            TextBox = wrapper.TextBox;
        }

        public RichTextBoxWrapperReadonly TextBox { get; }
    }

    public class AppContainerLogsTabPageAttachBridge : AppControlAttachBridge<AppTabControl, AppTabPage, AppContainerLogsTabPageCreator, AppContainerLogsTabPageWrapper, AppContainerLogsTabPageWrapperReadonly>
    {
        public AppContainerLogsTabPageAttachBridge(AppTabControl parentControl) : base(parentControl)
        {
        }

        protected override void BuildControl()
        {
            base.BuildControl();

            ControlWrapper.TextBox = new RichTextBoxAttachBridge(ParentControl).CreateAndAttach();
        }

        protected override void AttachControl()
        {
            ParentControl.TabPages.Add(Control);
        }
    }
}
