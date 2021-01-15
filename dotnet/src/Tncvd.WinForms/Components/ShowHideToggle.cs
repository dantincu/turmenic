using System;
using System.Windows.Forms;

namespace Tncvd.WinForms.Components
{
    public class ShowHideToggleOptions<TTriggerControl, TToggledControl> where TTriggerControl : Control where TToggledControl : Control
    {
        public TTriggerControl TriggerControl { get; set; }
        public TToggledControl ToggledControl { get; set; }
        public Func<TTriggerControl, TToggledControl, bool, bool> ToggleHandler { get; set; }
        public bool? IsVisible { get; set; }
    }

    public class ShowHideToggle<TTriggerControl, TToggledControl> where TTriggerControl : Control where TToggledControl : Control
    {
        public ShowHideToggle(
            TTriggerControl triggerControl,
            TToggledControl toggledControl,
            Func<TTriggerControl, TToggledControl, bool, bool> toggleHandler = null,
            bool? isVisible = null) : this(
                new ShowHideToggleOptions<TTriggerControl, TToggledControl>
                {
                    TriggerControl = triggerControl,
                    ToggledControl = toggledControl,
                    ToggleHandler = toggleHandler,
                    IsVisible = isVisible,
                })
        {
        }

        public ShowHideToggle(ShowHideToggleOptions<TTriggerControl, TToggledControl> options)
        {
            options = options ?? throw new ArgumentNullException(nameof(options));

            this.TriggerControl = options.TriggerControl ?? throw new ArgumentNullException(nameof(options.TriggerControl));
            this.ToggledControl = options.ToggledControl ?? throw new ArgumentNullException(nameof(options.ToggledControl));

            this.ToggleHandler = options.ToggleHandler ?? GetDefaultToggleHandler();
            this.IsVisible = options.IsVisible ?? true;

            this.InitControlEvents();
            this.InitControlProperties(options.IsVisible.HasValue);
        }

        protected Func<TTriggerControl, TToggledControl, bool, bool> ToggleHandler { get; }
        protected bool IsVisible { get; set; }

        #region Controls

        protected TTriggerControl TriggerControl { get; }
        protected TToggledControl ToggledControl { get; }

        #endregion Controls

        public static Func<TTriggerControl, TToggledControl, bool, bool> GetDefaultToggleHandler(
            Func<TTriggerControl, TToggledControl, bool, bool> handler = null)
        {
            Func<TTriggerControl, TToggledControl, bool, bool> retHandler = (triggerControl, toggledControl, isVisible) =>
            {
                bool retVal = isVisible == false;

                UpdateControlProperties(triggerControl, toggledControl, retVal);
                handler?.Invoke(triggerControl, toggledControl, retVal);

                return retVal;
            };

            return retHandler;
        }

        protected static void UpdateControlProperties(TTriggerControl triggerControl, TToggledControl toggledControl, bool isVisible)
        {
            triggerControl.Text = isVisible ? "-" : "+";
            toggledControl.Visible = isVisible;
        }

        #region ControlProperties

        protected virtual void InitControlProperties(bool init)
        {
            if (init)
            {
                UpdateControlProperties(
                    this.TriggerControl,
                    this.ToggledControl,
                    this.IsVisible);
            }
        }

        #endregion ControlProperties

        #region ControlEvents

        protected virtual void InitControlEvents()
        {
            this.TriggerControl.Click += this.TriggerControlClick;
        }

        protected virtual void OnTriggerControlClick()
        {
            this.IsVisible = this.ToggleHandler.Invoke(
                this.TriggerControl,
                this.ToggledControl,
                this.IsVisible);
        }

        #endregion ControlEvents

        #region ControlEventHandlers

        private void TriggerControlClick(object sender, EventArgs e)
        {
            this.OnTriggerControlClick();
        }

        #endregion ControlEventHandlers
    }
}
