using System;
using System.Collections.Generic;
using System.Linq;

namespace Turmenic.Core.Reflection
{
    public class ArgTypeListMatchHelper
    {
        protected readonly Type[] RuntimeTypes;

        public ArgTypeListMatchHelper(params Type[] runtimeTypes)
        {
            this.RuntimeTypes = runtimeTypes;
        }

        public static TypeMatchScore GetTypeMatchScore(Type runtimeType, Type declaringType)
        {
            TypeMatchScore typeMatchScore = TypeMatchScore.None;

            if (runtimeType == declaringType)
            {
                typeMatchScore = TypeMatchScore.Exact;
            }
            else if (declaringType.IsAssignableFrom(runtimeType))
            {
                typeMatchScore = TypeMatchScore.Inherited;
            }

            return typeMatchScore;
        }

        public TypeMatchScore[] GetMatchScore(params Type[] declaringTypes)
        {
            TypeMatchScore[] typeMatchScores = null;

            if (this.RuntimeTypes.Length == declaringTypes.Length)
            {
                typeMatchScores = declaringTypes.Select(
                    (declaringType, idx) => GetTypeMatchScore(
                        this.RuntimeTypes[idx],
                        declaringType)).ToArray();
            }

            return typeMatchScores;
        }

        public List<Tuple<Type[], TypeMatchScore[]>> GetSortedMatchScores(params Type[][] declaringTypesMatrix)
        {
            List<Tuple<Type[], TypeMatchScore[]>> matchScores = declaringTypesMatrix.Where(
                types => types.Length == this.RuntimeTypes.Length).Select(
                declaringTypes => new Tuple<Type[], TypeMatchScore[]>(declaringTypes, this.GetMatchScore(declaringTypes))).ToList();

            matchScores.Sort((leftScore, rightScore) =>
            {
                IEnumerable<int> comparisonColl = leftScore.Item1.Select(
                    (typeMatchScore, idx) => leftScore.Item2[idx].CompareTo(
                        rightScore.Item2[idx]));

                int result = comparisonColl.FirstOrDefault(
                    r => r != 0);

                return result;
            });

            return matchScores;
        }

        public Type[] GetBestMatch(params Type[][] declaringTypesMatrix)
        {
            List<Tuple<Type[], TypeMatchScore[]>> matchScores = this.GetSortedMatchScores(declaringTypesMatrix);

            Type[] bestMatch = this.GetBestMatch(matchScores);
            return bestMatch;
        }

        private Type[] GetBestMatch(List<Tuple<Type[], TypeMatchScore[]>> matchScores)
        {
            Tuple<Type[], TypeMatchScore[]> bestMatch = matchScores.FirstOrDefault();

            if (bestMatch != null)
            {
                this.AssureNonAmbiguousBestMatch(bestMatch, matchScores[1]);
            }

            return bestMatch?.Item1;
        }

        private void AssureNonAmbiguousBestMatch(Tuple<Type[], TypeMatchScore[]> bestMatch, Tuple<Type[], TypeMatchScore[]> secondBestMatch)
        {
            if (this.MatchesHaveIdenticalScore(bestMatch, secondBestMatch))
            {
                throw new ArgumentException("The provided types are ambiguous for choosing the best match!");
            }
        }

        private bool MatchesHaveIdenticalScore(Tuple<Type[], TypeMatchScore[]> leftMatch, Tuple<Type[], TypeMatchScore[]> rightMatch)
        {
            bool retVal = leftMatch.Item2.Where(
                (matchScore, idx) => matchScore != rightMatch.Item2[idx]).Any() == false;

            return retVal;
        }

        public enum TypeMatchScore
        {
            None = 0,
            Inherited = 1,
            Exact = 2
        }
    }
}
