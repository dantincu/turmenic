using Tncvd.WinForms.Controls;
using Tncvd.WinForms.Controls.Components;
using Tncvd.WinForms.Controls.Components.Base;

namespace Tncvd.WinForms.Forms.AppContainerWindow.Components
{
    public class AppContainerOutputTabPageCreator : AppControlCreator<AppTabPage>
    {
    }

    public class AppContainerOutputTabPageWrapper : AppControlWrapper<AppTabPage>
    {
        public AppContainerOutputTabPageWrapper(AppTabPage control) : base(control)
        {
        }

        public RichTextBoxWrapperReadonly TextBox { get; set; }
    }

    public class AppContainerOutputTabPageWrapperReadonly : AppControlWrapperReadonly<AppTabPage>
    {
        public AppContainerOutputTabPageWrapperReadonly(AppContainerOutputTabPageWrapper wrapper) : base(wrapper)
        {
        }

        public RichTextBoxWrapperReadonly TextBox { get; }
    }

    public class AppContainerOutputTabPageAttachBridge : AppControlAttachBridge<AppTabControl, AppTabPage, AppContainerOutputTabPageCreator, AppContainerOutputTabPageWrapper, AppContainerOutputTabPageWrapperReadonly>
    {
        public AppContainerOutputTabPageAttachBridge(AppTabControl parentControl) : base(parentControl)
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
