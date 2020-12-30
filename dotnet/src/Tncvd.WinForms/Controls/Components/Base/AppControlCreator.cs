using System;
using System.Windows.Forms;

namespace Tncvd.WinForms.Controls.Components.Base
{
    public class AppControlCreator<TControl> where TControl : Control
    {
        public virtual TControl Create()
        {
            TControl control = Activator.CreateInstance<TControl>();
            return control;
        }
    }

    public class AppControlWrapper<TControl> where TControl : Control
    {
        public AppControlWrapper(TControl control)
        {
            Control = control ?? throw new ArgumentNullException(nameof(control));
        }

        public TControl Control { get; }
    }

    public class AppControlWrapperReadonly<TControl> where TControl : Control
    {
        public AppControlWrapperReadonly(AppControlWrapper<TControl> wrapper)
        {
            Control = wrapper?.Control ?? throw new ArgumentNullException(nameof(wrapper));
        }

        public TControl Control { get; }
    }

    public class AppControlAttachBridge<TParentControl, TControl, TControlCreator, TControlWrapper, TControlWrapperReadonly>
        where TParentControl : Control
        where TControl : Control
        where TControlCreator : AppControlCreator<TControl>
        where TControlWrapper : AppControlWrapper<TControl>
        where TControlWrapperReadonly : AppControlWrapperReadonly<TControl>
    {
        public AppControlAttachBridge(TParentControl parentControl)
        {
            ParentControl = parentControl;
        }

        protected TParentControl ParentControl { get; }

        protected TControl Control { get; private set; }

        protected TControlCreator ControlCreator { get; private set; }

        protected TControlWrapper ControlWrapper { get; private set; }

        public virtual TControlWrapperReadonly CreateAndAttach()
        {
            CreateAndAttachCore();

            TControlWrapperReadonly controlWrapperReadonly = CreateControlWrapperReadonly();
            return controlWrapperReadonly;
        }

        protected virtual void CreateAndAttachCore()
        {
            CreateCore();
            BuildControl();
            AttachControl();
        }

        protected virtual void CreateCore()
        {
            ControlCreator = GetControlCreator();
            Control = ControlCreator.Create();
            ControlWrapper = CreateControlWrapper();
        }

        protected virtual TControlWrapperReadonly CreateControlWrapperReadonly()
        {
            TControlWrapperReadonly controlWrapperReadonly = Activator.CreateInstance(typeof(TControlWrapperReadonly), ControlWrapper) as TControlWrapperReadonly;
            return controlWrapperReadonly;
        }

        protected virtual TControlWrapper CreateControlWrapper()
        {
            TControlWrapper controlWrapper = Activator.CreateInstance(typeof(TControlWrapper), Control) as TControlWrapper;
            return controlWrapper;
        }

        protected virtual void BuildControl()
        {
        }

        protected virtual TControl CreateControl()
        {
            TControlCreator controlCreator = Activator.CreateInstance<TControlCreator>();
            TControl control = controlCreator.Create();

            return control;
        }

        protected virtual TControlCreator GetControlCreator()
        {
            TControlCreator controlCreator = Activator.CreateInstance<TControlCreator>();
            return controlCreator;
        }

        protected virtual void AttachControl()
        {
            ParentControl.Controls.Add(Control);
        }
    }
}
