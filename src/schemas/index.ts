import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(6, {
    message: 'Minimum 6 characters required',
  }),
  code: z.optional(z.string()),
});

export const OrganizationSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  picture: z.optional(z.string()),
  email: z.string().email({
    message: 'Email is required',
  }),
});

export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: 'Email is required',
    }),
    password: z.string().min(6, {
      message: 'Minimum 6 characters required',
    }),
    confirmPassword: z.string().min(6, {
      message: 'Minimum 6 characters required',
    }),
    name: z.string().min(1, {
      message: 'Name is required',
    }),
  })
  .superRefine(({ password }, checkPassComplexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch: string) =>
      /* eslint-disable-next-line no-useless-escape */
      /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countOfUpperCase = 0;
    let countOfLowerCase = 0;
    let countOfNumbers = 0;
    let countOfSpecialChar = 0;

    /* eslint-disable-next-line no-plusplus */
    for (let i = 0; i < password.length; i++) {
      const ch = password.charAt(i);
      /* eslint-disable-next-line no-plusplus */
      if (!Number.isNaN(+ch)) countOfNumbers++;
      /* eslint-disable-next-line no-plusplus */ else if (containsUppercase(ch))
        countOfUpperCase++;
      /* eslint-disable-next-line no-plusplus */ else if (containsLowercase(ch))
        countOfLowerCase++;
      /* eslint-disable-next-line no-plusplus */ else if (
        containsSpecialChar(ch)
      )
        /* eslint-disable-next-line no-plusplus */
        countOfSpecialChar++;
    }

    let errObj =
      'Minimal 1 lower case, 1 upper case, 1 number and 1 special character';

    if (countOfLowerCase < 1) {
      errObj = 'Minimal 1 lower case';
    }
    if (countOfNumbers < 1) {
      errObj = 'Minimal 1 number';
    }
    if (countOfUpperCase < 1) {
      errObj = 'Minimal 1 upper case';
    }
    if (countOfSpecialChar < 1) {
      errObj = 'Minimal 1 special character';
    }

    if (
      countOfLowerCase < 1 ||
      countOfUpperCase < 1 ||
      countOfSpecialChar < 1 ||
      countOfNumbers < 1
    ) {
      checkPassComplexity.addIssue({
        code: 'custom',
        path: ['password'],
        message: errObj,
      });
    }
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
});

export const ChangePasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: 'Minimum 6 characters required',
    }),
    newPassword: z.string().min(6, {
      message: 'Minimum of 6 characters required',
    }),
    confirmPassword: z.string().min(6, {
      message: 'Minimum 6 characters required',
    }),
  })
  .superRefine(({ password }, checkPassComplexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch: string) =>
      /* eslint-disable-next-line no-useless-escape */
      /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countOfUpperCase = 0;
    let countOfLowerCase = 0;
    let countOfNumbers = 0;
    let countOfSpecialChar = 0;

    /* eslint-disable-next-line no-plusplus */
    for (let i = 0; i < password.length; i++) {
      const ch = password.charAt(i);
      /* eslint-disable-next-line no-plusplus */
      if (!Number.isNaN(+ch)) countOfNumbers++;
      /* eslint-disable-next-line no-plusplus */ else if (containsUppercase(ch))
        countOfUpperCase++;
      /* eslint-disable-next-line no-plusplus */ else if (containsLowercase(ch))
        countOfLowerCase++;
      /* eslint-disable-next-line no-plusplus */ else if (
        containsSpecialChar(ch)
      )
        /* eslint-disable-next-line no-plusplus */
        countOfSpecialChar++;
    }

    let errObj =
      'Minimal 1 lower case, 1 upper case, 1 number and 1 special character';

    if (countOfLowerCase < 1) {
      errObj = 'Minimal 1 lower case';
    }
    if (countOfNumbers < 1) {
      errObj = 'Minimal 1 number';
    }
    if (countOfUpperCase < 1) {
      errObj = 'Minimal 1 upper case';
    }
    if (countOfSpecialChar < 1) {
      errObj = 'Minimal 1 special character';
    }

    if (
      countOfLowerCase < 1 ||
      countOfUpperCase < 1 ||
      countOfSpecialChar < 1 ||
      countOfNumbers < 1
    ) {
      checkPassComplexity.addIssue({
        code: 'custom',
        path: ['password'],
        message: errObj,
      });
    }
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const ChangeNameSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
});

export const ChangeEmailSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
});

export const ChangeAvatarSchema = z.object({
  avatar: z
    .any()
    .refine((file) => {
      return ['image/jpeg', 'image/jpg', 'image/png'].includes(file?.[0]?.type);
    }, 'File must be a image')
    .refine((file) => {
      return !file || file?.[0].size <= 1024 * 1024 * 4;
    }, 'File size must be less than 4MB'),
});

export const ChangeAvatarURLSchema = z.object({
  avatar: z.string().url({
    message: 'Invalid URL',
  }),
});

export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: 'Minimum of 6 characters required',
    }),
    confirmPassword: z.string().min(6, {
      message: 'Minimum 6 characters required',
    }),
  })
  .superRefine(({ password }, checkPassComplexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch: string) =>
      /* eslint-disable-next-line no-useless-escape */
      /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countOfUpperCase = 0;
    let countOfLowerCase = 0;
    let countOfNumbers = 0;
    let countOfSpecialChar = 0;

    /* eslint-disable-next-line no-plusplus */
    for (let i = 0; i < password.length; i++) {
      const ch = password.charAt(i);
      /* eslint-disable-next-line no-plusplus */
      if (!Number.isNaN(+ch)) countOfNumbers++;
      /* eslint-disable-next-line no-plusplus */ else if (containsUppercase(ch))
        countOfUpperCase++;
      /* eslint-disable-next-line no-plusplus */ else if (containsLowercase(ch))
        countOfLowerCase++;
      /* eslint-disable-next-line no-plusplus */ else if (
        containsSpecialChar(ch)
      )
        /* eslint-disable-next-line no-plusplus */
        countOfSpecialChar++;
    }

    let errObj =
      'Minimal 1 lower case, 1 upper case, 1 number and 1 special character';

    if (countOfLowerCase < 1) {
      errObj = 'Minimal 1 lower case';
    }
    if (countOfNumbers < 1) {
      errObj = 'Minimal 1 number';
    }
    if (countOfUpperCase < 1) {
      errObj = 'Minimal 1 upper case';
    }
    if (countOfSpecialChar < 1) {
      errObj = 'Minimal 1 special character';
    }

    if (
      countOfLowerCase < 1 ||
      countOfUpperCase < 1 ||
      countOfSpecialChar < 1 ||
      countOfNumbers < 1
    ) {
      checkPassComplexity.addIssue({
        code: 'custom',
        path: ['password'],
        message: errObj,
      });
    }
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const SettingsSchema = z.object({
  isTwoFactorEnabled: z.boolean(),
});
