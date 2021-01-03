using System.Windows.Forms;

namespace SimplePasswordTool
{
    public class ShowHideButtonWrapperData
    {
        public ShowHideButtonWrapperData(Button button)
        {
            this.Button = button;
            this.ShowText = "Show";
            this.HideText = "Hide";
            this.TriggerShow = true;
        }

        public Button Button { get; set; }
        public string ShowText { get; set; }
        public string HideText { get; set; }
        public bool TriggerShow { get; set; }
    }

    public class ShowHideButtonWrapper
    {
        private readonly string _showText;
        private readonly string _hideText;

        private bool _triggerShow;

        public ShowHideButtonWrapper(ShowHideButtonWrapperData data)
        {
            this.Button = data.Button;

            this._showText = data.ShowText;
            this._hideText = data.HideText;

            this._triggerShow = data.TriggerShow;

            this.UpdateButtonText();
        }

        public bool TriggerShow => this._triggerShow;
        public Button Button { get; }

        public void SetTriggerShow(bool triggerShow)
        {
            this._triggerShow = triggerShow;
            this.UpdateButtonText();
        }

        public bool ToggleTriggerShow()
        {
            this._triggerShow = !this._triggerShow;
            this.UpdateButtonText();
            return this._triggerShow;
        }

        private void UpdateButtonText()
        {
            this.Button.Text = this._triggerShow ? this._showText : this._hideText;
        }
    }
}
