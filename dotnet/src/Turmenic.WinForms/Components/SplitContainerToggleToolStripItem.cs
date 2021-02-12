using System;
using System.Windows.Forms;

namespace Turmenic.WinForms.Components
{
    public class SplitContainerToggleToolStripItem<TTriggerControl, TToggledControl> : ShowHideToggleToolStripItem<TTriggerControl, TToggledControl>
        where TTriggerControl : ToolStripItem where TToggledControl : SplitContainer
    {
        public SplitContainerToggleToolStripItem(
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

        public SplitContainerToggleToolStripItem(ShowHideToggleToolStripItemOptions<TTriggerControl, TToggledControl> options) : base(NormalizeOptions(options))
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

        protected static ShowHideToggleToolStripItemOptions<TTriggerControl, TToggledControl> NormalizeOptions(
            ShowHideToggleToolStripItemOptions<TTriggerControl, TToggledControl> options)
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
