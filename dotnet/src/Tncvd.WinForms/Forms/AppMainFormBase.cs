namespace Tncvd.WinForms.Forms
{
    public partial class AppMainFormBase : AppFormBase
    {
        public AppMainFormBase()
        {
            Utility.HelperMethods.AddMainAppFormProperties(this);
        }

        protected override void InitForm()
        {
            base.InitForm();
            Utility.HelperMethods.AddMainAppFormProperties(this);
        }
    }
}
