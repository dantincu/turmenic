using System;
using System.Linq.Expressions;

namespace Turmerik.Core.Reflection
{
    public static partial class HelperMethods
    {
        public const string DEFAULT_PARAM_NAME = "e";

        public static Func<TObject, TValue> GetPropPredicate<TObject, TValue>(string propName, string paramName = DEFAULT_PARAM_NAME)
        {
            LambdaExpression expr = GetPropLambda<TObject, TValue>(propName, paramName);

            Func<TObject, TValue> predicate = expr.Compile() as Func<TObject, TValue>;
            return predicate;
        }

        public static LambdaExpression GetPropLambda<TObject, TValue>(string propName, string paramName = DEFAULT_PARAM_NAME)
        {
            ParameterExpression paramExpr = Expression.Parameter(typeof(TObject), paramName);
            MemberExpression propExpr = Expression.Property(paramExpr, propName);

            LambdaExpression retExpr = Expression.Lambda(
                typeof(Func<TObject, TValue>),
                propExpr,
                paramExpr);

            return retExpr;
        }

        public static LambdaExpression GetPropEqLambda<TObject, TValue>(string propName, TValue val, string paramName = DEFAULT_PARAM_NAME)
        {
            ParameterExpression paramExpr = Expression.Parameter(typeof(TObject), paramName);
            BinaryExpression eqExpr = GetPropEqExpr<TObject, TValue>(propName, val, paramExpr);

            LambdaExpression retExpr = Expression.Lambda(
                typeof(Func<TObject, bool>),
                eqExpr,
                paramExpr);

            return retExpr;
        }

        public static BinaryExpression GetPropEqExpr<TObject, TValue>(string propName, TValue val, ParameterExpression paramExpr)
        {
            MemberExpression propExpr = Expression.Property(paramExpr, propName);
            ConstantExpression constExpr = Expression.Constant(val);

            BinaryExpression eqExpr = Expression.Equal(propExpr, constExpr);
            return eqExpr;
        }

        public static Func<TObject, bool> GetPropEqPredicate<TObject, TValue>(string propName, TValue val, string paramName = DEFAULT_PARAM_NAME)
        {
            LambdaExpression expr = GetPropEqLambda<TObject, TValue>(propName, val, paramName);

            Func<TObject, bool> predicate = expr.Compile() as Func<TObject, bool>;
            return predicate;
        }
    }
}
