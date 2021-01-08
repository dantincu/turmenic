using System.Windows.Forms;

namespace SimplePasswordTool.Components
{
    public class ShowHideButtonWrapperData
    {
        public ShowHideButtonWrapperData(Button button)
        {
            Button = button;
            ShowText = "Show";
            HideText = "Hide";
            TriggerShow = true;
        }

        public Button Button { get; set; }
        public string ShowText { get; set; }
        public string HideText { get; set; }
        public bool TriggerShow { get; set; }
    }

    public class ShowHideButtonController
    {
        private readonly string showText;
        private readonly string hideText;

        private bool triggerShow;

        public ShowHideButtonController(ShowHideButtonWrapperData data)
        {
            Button = data.Button;

            showText = data.ShowText;
            hideText = data.HideText;

            triggerShow = data.TriggerShow;

            UpdateButtonText();
        }

        public bool TriggerShow => triggerShow;
        public Button Button { get; }

        public void SetTriggerShow(bool triggerShow)
        {
            this.triggerShow = triggerShow;
            UpdateButtonText();
        }

        public bool ToggleTriggerShow()
        {
            triggerShow = !triggerShow;
            UpdateButtonText();
            return triggerShow;
        }

        private void UpdateButtonText()
        {
            Button.Text = triggerShow ? showText : hideText;
        }
    }
}
