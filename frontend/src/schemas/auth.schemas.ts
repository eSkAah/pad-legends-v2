import { z } from 'zod';

// Base email schema
const emailSchema = z
  .string()
  .min(1, 'L\'email est requis')
  .email('Format d\'email invalide')
  .max(255, 'L\'email ne peut pas dépasser 255 caractères');

// Base password schema  
const passwordSchema = z
  .string()
  .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
  .max(128, 'Le mot de passe ne peut pas dépasser 128 caractères')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*\d)|(?=.*[A-Z])(?=.*\d)/,
    'Le mot de passe doit contenir au moins 2 des éléments suivants: minuscule, majuscule, chiffre'
  );

// Pseudo schema for registration
const pseudoSchema = z
  .string()
  .min(3, 'Le pseudo doit contenir au moins 3 caractères')
  .max(20, 'Le pseudo ne peut pas dépasser 20 caractères')
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    'Le pseudo ne peut contenir que des lettres, chiffres, tirets et underscores'
  )
  .regex(
    /^(?!.*[-_]{2})/,
    'Le pseudo ne peut pas contenir deux caractères spéciaux consécutifs'
  );

// Sign in form schema
export const signInSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(1, 'Le mot de passe est requis')
    .max(128, 'Le mot de passe ne peut pas dépasser 128 caractères'),
});

// Sign up form schema
export const signUpSchema = z.object({
  pseudo: pseudoSchema,
  email: emailSchema,
  password: passwordSchema,
});

// Type exports
export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;