using System;
using System.IO;
using System.Linq;
using Turmerik.Core.Text;

namespace Turmerik.Core.FileSystem
{
    public static partial class HelperMethods
    {
        public static bool IsMachineUnixStyle()
        {
            bool isMachineUnixStyle = Path.DirectorySeparatorChar == ConstantValues.PATH_DELIMITER_UNIX;
            return isMachineUnixStyle;
        }

        public static bool IsMachineWindowsStyle()
        {
            bool isMachineWindowsStyle = Path.DirectorySeparatorChar == ConstantValues.PATH_DELIMITER_WINDOWS;
            return isMachineWindowsStyle;
        }

        public static bool IsPathAbsolute(this string path)
        {
            bool isPathAbsolute = path.IsPathLinuxStyleAbsolute() || path.IsPathWindowsStyleAbsolute();
            return isPathAbsolute;
        }

        public static bool IsPathWindowsStyleAbsolute(this string path)
        {
            bool isPathWindowsStyle = path.Contains(ConstantValues.PATH_DRIVE_DELIMITER_CHAR_WINDOWS);
            return isPathWindowsStyle;
        }

        public static bool IsPathLinuxStyleAbsolute(this string path)
        {
            bool isPathLinuxStyleAbsolute = path.StartsWith(ConstantValues.PATH_DELIMITER_UNIX);
            return isPathLinuxStyleAbsolute;
        }

        public static string[] GetPathParts(this string path)
        {
            string[] pathParts = path.Split(
                new char[] {
                    Path.DirectorySeparatorChar,
                    Path.AltDirectorySeparatorChar
                },
                StringSplitOptions.RemoveEmptyEntries).TrimAll(true);

            return pathParts;
        }

        public static string PathToMachineStyle(this string path, bool normalize = false)
        {
            string retPath = null;
            string[] pathParts = path.GetPathParts();

            if (path.IsPathAbsolute())
            {
                pathParts[0] = pathParts[0].AbsPathRootPartToMachineStyle();
            }

            if (normalize)
            {
                pathParts = pathParts.NormalizePathParts();
            }

            retPath = Path.Combine(pathParts);

            return retPath;
        }

        public static string NormalizePath(this string path)
        {
            string[] pathParts = null;
            string retPath = null;

            if (path != null)
            {
                pathParts = path.GetPathParts();
                pathParts = pathParts.NormalizePathParts();

                retPath = Path.Combine(pathParts);
            }

            return retPath;
        }

        public static string[] NormalizePathParts(this string[] pathParts)
        {
            int idx = -1;

            for (int i = 0; i < pathParts.Length; i++)
            {
                string ptPr = pathParts[i];

                if (ptPr == ConstantValues.REL_PATH_CURRENT_DIR_SYMBOL)
                {
                    pathParts[i] = null;
                }
                else if (ptPr == ConstantValues.REL_PATH_PARENT_DIR_SYMBOL)
                {
                    if (i > 0)
                    {
                        pathParts[i] = null;

                        if (idx < 0)
                        {
                            idx = i;
                        }

                        idx--;
                        pathParts[idx] = null;
                    }
                }
                else
                {
                    idx = -1;
                }
            }

            pathParts = pathParts.TrimAll(true);

            return pathParts;
        }

        public static string PathToUnixStyle(this string path, bool normalize = false)
        {
            string retPath;
            string[] pathParts = pathParts = path.GetPathParts();

            if (path.IsPathAbsolute())
            {
                pathParts[0] = pathParts[0].AbsPathRootPartToUnixStyle();
            }

            if (normalize)
            {
                pathParts = pathParts.NormalizePathParts();
            }

            retPath = pathParts.Aggregate((leftPart, rightPart) => string.Concat(leftPart, ConstantValues.PATH_DELIMITER_UNIX, rightPart));
            return retPath;
        }

        public static string PathToWindowsStyle(this string path, bool normalize = false)
        {
            string retPath;
            string[] pathParts = path.GetPathParts();

            if (path.IsPathAbsolute())
            {
                pathParts[0] = pathParts[0].AbsPathRootPartToWindowsStyle();
            }

            if (normalize)
            {
                pathParts = pathParts.NormalizePathParts();
            }

            retPath = pathParts.Aggregate((leftPart, rightPart) => string.Concat(leftPart, ConstantValues.PATH_DELIMITER_WINDOWS, rightPart));

            return retPath;
        }

        public static string AbsPathRootPartToMachineStyle(this string pathPart)
        {
            bool isMachineWindowsStyle = IsMachineWindowsStyle();

            if (isMachineWindowsStyle)
            {
                pathPart = pathPart.AbsPathRootPartToWindowsStyle();
            }
            else
            {
                pathPart = pathPart.AbsPathRootPartToUnixStyle();
            }

            return pathPart;
        }

        public static string AbsPathRootPartToUnixStyle(this string pathPart)
        {
            if (pathPart.TrimStart().StartsWith(ConstantValues.PATH_DELIMITER_UNIX) == false)
            {
                pathPart = ConstantValues.PATH_DELIMITER_UNIX + pathPart;
            }

            return pathPart;
        }

        public static string AbsPathRootPartToWindowsStyle(this string pathPart)
        {
            if (pathPart.Contains(ConstantValues.PATH_DRIVE_DELIMITER_CHAR_WINDOWS) == false)
            {
                pathPart += ConstantValues.PATH_DRIVE_DELIMITER_CHAR_WINDOWS;
            }

            return pathPart;
        }
    }
}
