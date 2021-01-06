using SimplePasswordTool.Forms;

namespace SimplePasswordTool.Components
{
    public class MainFormController
    {
        public MainFormController(MainForm mainForm)
        {
            this.MainForm = mainForm;
        }

        protected MainForm MainForm { get; }
    }
}
