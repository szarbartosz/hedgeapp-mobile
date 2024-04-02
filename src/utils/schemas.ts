import { z } from 'zod';

export const signUpValidationSchema = z
  .object({
    email: z
      .string()
      .email('Wprowadź swój adres e-mail we właściwym formacie')
      .min(1, 'To pole jest wymagane'),
    password: z
      .string()
      .min(1, 'To pole jest wymagane')
      .min(8, 'Hasło musi zawierać co najmniej 8 znaków')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        'Hasło musi zawierać co najmniej 8 znaków, przynajmniej jedną małą literę, jedną dużą literę i jedną cyfrę.'
      ),
    confirmPassword: z.string().min(1, 'To pole jest wymagane'),
  })
  .superRefine((obj, ctx) => {
    if (obj.password !== obj.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Wprowadzone hasła nie są zgodne',
        path: ['password', 'confirmPassword'],
      });
    }
  });

export const signInValidationSchema = z.object({
  email: z
    .string()
    .email('Wprowadź swój adres e-mail we właściwym formacie')
    .min(1, 'To pole jest wymagane'),
  password: z.string().min(1, 'To pole jest wymagane'),
});
