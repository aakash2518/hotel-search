import { z } from 'zod';
import { isBefore, parseISO, isValid } from 'date-fns';

export const searchSchema = z
  .object({
    city: z
      .string()
      .min(1, 'Destination is required')
      .min(2, 'Please enter at least 2 characters')
      .max(100, 'Destination is too long'),
    checkIn: z.string().optional().or(z.literal('')),
    checkOut: z.string().optional().or(z.literal('')),
    adults: z
      .string()
      .optional()
      .refine(
        (val) => !val || (Number(val) >= 1 && Number(val) <= 20),
        { message: 'Adults must be between 1 and 20' }
      ),
    children: z
      .string()
      .optional()
      .refine(
        (val) => !val || (Number(val) >= 0 && Number(val) <= 10),
        { message: 'Children must be between 0 and 10' }
      ),
    currency: z.string().optional().or(z.literal('')),
    language: z.string().optional().or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    const { checkIn, checkOut } = data;

    if (checkIn && checkIn.length > 0) {
      const parsedIn = parseISO(checkIn);
      if (!isValid(parsedIn)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid check-in date',
          path: ['checkIn'],
        });
        return;
      }
      // Check-in must be today or in the future
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isBefore(parsedIn, today)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Check-in date cannot be in the past',
          path: ['checkIn'],
        });
      }
    }

    if (checkOut && checkOut.length > 0) {
      const parsedOut = parseISO(checkOut);
      if (!isValid(parsedOut)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid check-out date',
          path: ['checkOut'],
        });
        return;
      }
    }

    if (checkIn && checkIn.length > 0 && checkOut && checkOut.length > 0) {
      const parsedIn = parseISO(checkIn);
      const parsedOut = parseISO(checkOut);
      if (isValid(parsedIn) && isValid(parsedOut)) {
        if (!isBefore(parsedIn, parsedOut)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Check-out must be after check-in',
            path: ['checkOut'],
          });
        }
      }
    }
  });

export type SearchSchemaValues = z.infer<typeof searchSchema>;
