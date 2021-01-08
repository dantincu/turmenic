using System.Linq;

namespace Tncvd.Core.Text
{
    public static partial class HelperMethods
    {
        public static string GetSlugFromSegments(string[] segments)
        {
            string slug = segments.Aggregate((leftSegment, rightSegment) => $"{leftSegment}{ConstantValues.Slugs.SlugSegmentsSeparator}{rightSegment}");
            return slug;
        }

        public static string GetSlugFromParts(string[] parts)
        {
            string slug = parts.Aggregate((leftPart, rightPart) => $"{leftPart}{ConstantValues.Slugs.SlugPartsSeparator}{rightPart}");
            return slug;
        }

        public static string GetSlug(string[][] segmentParts)
        {
            string[] parts = segmentParts.Select(part => GetSlugFromSegments(part)).ToArray();
            string slug = GetSlugFromParts(parts);
            return slug;
        }
    }
}
