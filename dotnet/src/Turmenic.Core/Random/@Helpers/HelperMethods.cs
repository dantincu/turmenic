using System;
using System.Collections.Generic;
using System.Text;

namespace Turmenic.Core.Random
{
    public static class HelperMethods
    {
        public static string GenerateGuidString(string format = "N")
        {
            string randStr = Guid.NewGuid().ToString(format);
            return randStr;
        }
    }
}
