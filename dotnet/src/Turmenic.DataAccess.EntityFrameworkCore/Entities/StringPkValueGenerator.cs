using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using System;
using System.Diagnostics.CodeAnalysis;

namespace Turmenic.DataAccess.EntityFrameworkCore.Entities
{
    public class StringPkValueGenerator : ValueGenerator
    {
        public override bool GeneratesTemporaryValues => throw new System.NotImplementedException();

        protected override object NextValue([NotNull] EntityEntry entry)
        {
            string pk = Core.Random.HelperMethods.GenerateGuidString();
            return pk;
        }
    }
}
