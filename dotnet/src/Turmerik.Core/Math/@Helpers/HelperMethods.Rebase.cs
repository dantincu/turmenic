using System;
using System.Collections.Generic;
using System.Numerics;

namespace Turmerik.Core.Math
{
    public static partial class HelperMethods
    {
        public const int DEFAULT_BYTE_REBASE_VALUE = byte.MaxValue + 1;
        public const uint DEFAULT_INT_REBASE_VALUE = (uint)int.MaxValue + 1;

        public static byte[] ToByteArray(long value, int newBase = DEFAULT_BYTE_REBASE_VALUE)
        {
            byte[] byteArr = Rebase.ToByteArray(value, newBase);
            return byteArr;
        }

        public static byte[] ToByteArray(ulong value, int newBase = DEFAULT_BYTE_REBASE_VALUE)
        {
            byte[] byteArr = Rebase.ToByteArray(value, newBase);
            return byteArr;
        }

        public static byte[] ToByteArray(int value, int newBase = DEFAULT_BYTE_REBASE_VALUE)
        {
            byte[] byteArr = Rebase.ToByteArray(Convert.ToInt64(value), newBase);
            return byteArr;
        }

        public static byte[] ToByteArray(uint value, int newBase = DEFAULT_BYTE_REBASE_VALUE)
        {
            byte[] byteArr = Rebase.ToByteArray(Convert.ToUInt64(value), newBase);
            return byteArr;
        }

        public static byte[] ToByteArray(short value, int newBase = DEFAULT_BYTE_REBASE_VALUE)
        {
            byte[] byteArr = Rebase.ToByteArray(Convert.ToInt64(value), newBase);
            return byteArr;
        }

        public static byte[] ToByteArray(ushort value, int newBase = DEFAULT_BYTE_REBASE_VALUE)
        {
            byte[] byteArr = Rebase.ToByteArray(Convert.ToUInt64(value), newBase);
            return byteArr;
        }

        public static byte[] ToByteArray(BigInteger value, int newBase = DEFAULT_BYTE_REBASE_VALUE)
        {
            byte[] byteArr = Rebase.ToByteArray(Convert.ToInt64(value), newBase);
            return byteArr;
        }

        public static int[] ToIntArray(BigInteger value, uint newBase = DEFAULT_INT_REBASE_VALUE)
        {
            int[] intArr = Rebase.ToIntArray(value, newBase);
            return intArr;
        }

        public static short ByteArrayToShort(this byte[] byteArr, int newBase = DEFAULT_BYTE_REBASE_VALUE)
        {
            ulong val = ByteArrayToULong(byteArr, newBase);
            short retVal = Convert.ToInt16(val);

            return retVal;
        }

        public static ushort ByteArrayToUShort(this byte[] byteArr, int newBase = DEFAULT_BYTE_REBASE_VALUE)
        {
            ulong val = ByteArrayToULong(byteArr, newBase);
            ushort retVal = Convert.ToUInt16(val);

            return retVal;
        }

        public static int ByteArrayToInt(this byte[] byteArr, int newBase = DEFAULT_BYTE_REBASE_VALUE)
        {
            ulong val = ByteArrayToULong(byteArr, newBase);
            int retVal = Convert.ToInt32(val);

            return retVal;
        }

        public static uint ByteArrayToUInt(this byte[] byteArr, int newBase = DEFAULT_BYTE_REBASE_VALUE)
        {
            ulong val = ByteArrayToULong(byteArr, newBase);
            uint retVal = Convert.ToUInt32(val);

            return retVal;
        }

        public static long ByteArrayToLong(this byte[] byteArr, int newBase = DEFAULT_BYTE_REBASE_VALUE)
        {
            ulong val = ByteArrayToULong(byteArr, newBase);
            long retVal = Convert.ToInt64(val);

            return retVal;
        }

        public static ulong ByteArrayToULong(this byte[] byteArr, int newBase = DEFAULT_BYTE_REBASE_VALUE)
        {
            ulong newBaseU = Convert.ToUInt64(newBase);
            ulong retVal = 0;
            ulong multiplier = 1;

            foreach (byte b in byteArr)
            {
                retVal += b * multiplier;
                multiplier *= newBaseU;
            }

            return retVal;
        }

        public static BigInteger ByteArrayToBigInt(this byte[] byteArr, uint newBase = DEFAULT_INT_REBASE_VALUE)
        {
            BigInteger retVal = 0;
            BigInteger multiplier = 1;

            foreach (byte b in byteArr)
            {
                retVal += b * multiplier;
                multiplier *= newBase;
            }

            return retVal;
        }

        public static BigInteger IntArrayToBigInt(this int[] intArr, int newBase = DEFAULT_BYTE_REBASE_VALUE)
        {
            BigInteger retVal = 0;
            BigInteger multiplier = 1;

            foreach (byte b in intArr)
            {
                retVal += b * multiplier;
                multiplier *= newBase;
            }

            return retVal;
        }

        private static class Rebase
        {
            public static byte[] ToByteArray(BigInteger value, int newBase)
            {
                Stack<byte> queue = new Stack<byte>();

                BigInteger dividedValue = value;
                byte byteValue = 0;

                while (dividedValue > 0)
                {
                    StackByte(queue, ref dividedValue, ref byteValue, newBase);
                }

                byte[] retArr = queue.ToArray();
                return retArr;
            }

            public static int[] ToIntArray(BigInteger value, uint newBase)
            {
                Stack<int> queue = new Stack<int>();

                BigInteger dividedValue = value;
                int intValue = 0;

                while (dividedValue > 0)
                {
                    StackInt(queue, ref dividedValue, ref intValue, newBase);
                }

                int[] retArr = queue.ToArray();
                return retArr;
            }

            public static byte[] ToByteArray(long value, int newBase)
            {
                Stack<byte> queue = new Stack<byte>();

                long dividedValue = value;
                byte byteValue = 0;

                while (dividedValue > 0)
                {
                    StackByte(queue, ref dividedValue, ref byteValue, newBase);
                }

                byte[] retArr = queue.ToArray();
                return retArr;
            }

            public static byte[] ToByteArray(ulong value, int newBase)
            {
                Stack<byte> queue = new Stack<byte>();

                ulong dividedValue = value;
                byte byteValue = 0;

                while (dividedValue > 0)
                {
                    StackByte(queue, ref dividedValue, ref byteValue, newBase);
                }

                byte[] retArr = queue.ToArray();
                return retArr;
            }

            #region Private

            private static void StackByte(Stack<byte> queue, ref long dividedValue, ref byte byteValue, int newBase)
            {
                byteValue = (byte)(dividedValue % newBase);
                queue.Push(byteValue);

                dividedValue = dividedValue / newBase;
            }

            private static void StackByte(Stack<byte> queue, ref ulong dividedValue, ref byte byteValue, int newBase)
            {
                ulong newBaseU = Convert.ToUInt64(newBase);

                byteValue = (byte)(dividedValue % newBaseU);
                queue.Push(byteValue);

                dividedValue = dividedValue / newBaseU;
            }

            private static void StackByte(Stack<byte> queue, ref BigInteger dividedValue, ref byte byteValue, int newBase)
            {
                byteValue = (byte)(dividedValue % newBase);
                queue.Push(byteValue);

                dividedValue = dividedValue / newBase;
            }

            private static void StackInt(Stack<int> queue, ref BigInteger dividedValue, ref int intValue, uint newBase)
            {
                intValue = (int)(dividedValue % newBase);
                queue.Push(intValue);

                dividedValue = dividedValue / newBase;
            }

            #endregion Private
        }
    }
}
