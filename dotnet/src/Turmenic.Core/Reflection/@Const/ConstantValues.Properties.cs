﻿using System;
using System.Reflection;

namespace Turmenic.Core.Reflection
{
    public static partial class ConstantValues
    {
        public static class DelegateExpressions
        {
            public static readonly Func<PropertyInfo, bool> DefaultAutoInitPropsSelector = HelperMethods.GetAutoInitPropsSelector();
        }
    }
}