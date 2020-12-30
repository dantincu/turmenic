using Tncvd.WinForms.Controls;

namespace Tncvd.WinForms.Forms.AppContainerWindow.Controls
{
    public class AppContainerTabCtrlWrapper
    {
        public AppTabControl TabControl { get; set; }

        public AppTabPage MainTabPage { get; set; }

        public AppTabPage LogsTabPage { get; set; }

        public AppTabPage OutputTabPage { get; set; }

        public AppRichTextBox LogsTextBox { get; set; }

        public AppRichTextBox OutputTextBox { get; set; }
    }

    public class AppContainerTabCtrlWrapperReadonly
    {
        public AppContainerTabCtrlWrapperReadonly(AppContainerTabCtrlWrapper wrapper)
        {
            TabControl = wrapper.TabControl;
            MainTabPage = wrapper.MainTabPage;
            LogsTabPage = wrapper.LogsTabPage;
            OutputTabPage = wrapper.OutputTabPage;
            LogsTextBox = wrapper.LogsTextBox;
            OutputTextBox = wrapper.OutputTextBox;
        }

        public AppTabControl TabControl { get; }

        public AppTabPage MainTabPage { get; }

        public AppTabPage LogsTabPage { get; }

        public AppTabPage OutputTabPage { get; }

        public AppRichTextBox LogsTextBox { get; }

        public AppRichTextBox OutputTextBox { get; }
    }

    public class AppContainerTabCtrlCreator
    {
        public AppContainerTabCtrlWrapperReadonly Create()
        {
            return new AppContainerTabCtrlWrapperReadonly(CreateCore());
        }

        private AppContainerTabCtrlWrapper CreateCore()
        {
            AppContainerTabCtrlWrapper wrapper = new AppContainerTabCtrlWrapper();
            wrapper.TabControl = new AppTabControl();

            CreateMainTabPage(wrapper);
            CreateLogsTabPage(wrapper);
            CreateOutputTabPage(wrapper);

            return wrapper;
        }

        private void CreateMainTabPage(AppContainerTabCtrlWrapper wrapper)
        {
            wrapper.MainTabPage = new AppTabPage();
            wrapper.TabControl.TabPages.Add(wrapper.MainTabPage);
        }

        private void CreateLogsTabPage(AppContainerTabCtrlWrapper wrapper)
        {
            wrapper.LogsTabPage = new AppTabPage();

            wrapper.LogsTextBox = new AppRichTextBox();
            wrapper.LogsTabPage.Controls.Add(wrapper.LogsTextBox);

            wrapper.TabControl.TabPages.Add(wrapper.LogsTabPage);
        }

        private void CreateOutputTabPage(AppContainerTabCtrlWrapper wrapper)
        {
            wrapper.OutputTabPage = new AppTabPage();

            wrapper.OutputTextBox = new AppRichTextBox();
            wrapper.OutputTabPage.Controls.Add(wrapper.OutputTextBox);

            wrapper.TabControl.TabPages.Add(wrapper.OutputTabPage);
        }
    }
}
