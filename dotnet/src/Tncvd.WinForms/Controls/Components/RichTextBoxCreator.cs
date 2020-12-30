using System.Windows.Forms;
using Tncvd.WinForms.Controls;
using Tncvd.WinForms.Controls.Components.Base;

namespace Tncvd.WinForms.Controls.Components
{
    public class RichTextBoxCreator : AppControlCreator<AppRichTextBox>
    {
    }

    public class RichTextBoxWrapper : AppControlWrapper<AppRichTextBox>
    {
        public RichTextBoxWrapper(AppRichTextBox control) : base(control)
        {
        }
    }

    public class RichTextBoxWrapperReadonly : AppControlWrapperReadonly<AppRichTextBox>
    {
        public RichTextBoxWrapperReadonly(RichTextBoxWrapper wrapper) : base(wrapper)
        {
        }
    }

    public class RichTextBoxAttachBridge : AppControlAttachBridge<Control, AppRichTextBox, RichTextBoxCreator, RichTextBoxWrapper, RichTextBoxWrapperReadonly>
    {
        public RichTextBoxAttachBridge(Control parentControl) : base(parentControl)
        {
        }
    }
}
