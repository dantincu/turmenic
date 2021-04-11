using System;
using System.Linq.Expressions;
using System.Reflection;

namespace Turmerik.Core.Reflection
{
    public static partial class HelperMethods
    {
        public static string GetMemberNameFromLambda<TArg>(this Expression<Func<TArg, object>> lambdaExpr)
        {
            MemberExpression memberExpr = lambdaExpr.Body as MemberExpression;

            string memberName = memberExpr?.Member.Name;
            return memberName;
        }

        public static MemberInfo GetMemberFromLambda<TArg>(this Expression<Func<TArg, object>> lambdaExpr)
        {
            MemberExpression memberExpr = lambdaExpr.Body as MemberExpression;

            MemberInfo memberInfo = memberExpr?.Member;
            return memberInfo;
        }
    }
}
