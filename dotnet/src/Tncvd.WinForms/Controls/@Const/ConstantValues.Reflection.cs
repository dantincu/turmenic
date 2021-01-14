using System;
using System.Reflection;
using System.Windows.Forms;
using Tncvd.Core.Reflection;

namespace Tncvd.WinForms.Controls
{
    public static partial class ConstantValues
    {
        public static class DelegateExpressions
        {
            public static readonly Func<PropertyInfo, bool> SimpleControlTypeSelector = typeof(Control).GetSimpleTypeSelector();
        }
    }
}
