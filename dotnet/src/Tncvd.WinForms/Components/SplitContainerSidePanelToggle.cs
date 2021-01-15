using System;
using System.Windows.Forms;

namespace Tncvd.WinForms.Components
{
    public class SplitContainerSidePanelToggle<TTriggerControl, TToggledControl> : ShowHideToggle<TTriggerControl, TToggledControl>
        where TTriggerControl : Control where TToggledControl : SplitContainer
    {
        public SplitContainerSidePanelToggle(
            TTriggerControl triggerControl,
            TToggledControl toggledControl,
            Func<TTriggerControl, TToggledControl, bool, bool> toggleHandler = null,
            bool? isVisible = null) : base(
                triggerControl,
                toggledControl,
                toggleHandler ?? GetDefaultToggleHandler(),
                isVisible)
        {
        }

        public SplitContainerSidePanelToggle(ShowHideToggleOptions<TTriggerControl, TToggledControl> options) : base(NormalizeOptions(options))
        {
        }

        public static Func<TTriggerControl, TToggledControl, bool, bool> GetDefaultToggleHandler()
        {
            Func<TTriggerControl, TToggledControl, bool, bool> retHandler = (triggerControl, toggledControl, isVisible) =>
            {
                bool retVal = isVisible == false;
                UpdateControlProperties(triggerControl, toggledControl, retVal);

                return retVal;
            };

            return retHandler;
        }

        protected static new void UpdateControlProperties(TTriggerControl triggerControl, TToggledControl toggledControl, bool isVisible)
        {
            triggerControl.Text = isVisible ? "-" : "+";
            toggledControl.Panel1Collapsed = isVisible == false;
        }

        protected static ShowHideToggleOptions<TTriggerControl, TToggledControl> NormalizeOptions(
            ShowHideToggleOptions<TTriggerControl, TToggledControl> options)
        {
            options.ToggleHandler = options.ToggleHandler ?? GetDefaultToggleHandler();

            return options;
        }

        protected override void InitControlProperties(bool init)
        {
            if (init)
            {
                UpdateControlProperties(
                    this.TriggerControl,
                    this.ToggledControl,
                    this.IsVisible);
            }
        }
    }
}
