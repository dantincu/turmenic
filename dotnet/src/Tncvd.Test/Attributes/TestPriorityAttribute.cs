﻿using System;

namespace Tncvd.Test.Attributes
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
    public class TestPriorityAttribute : Attribute
    {
        public TestPriorityAttribute(int priority) => this.Priority = priority;

        public int Priority { get; private set; }
    }
}
