
import zxcvbn from 'zxcvbn';

/**
 * Evaluates password strength using zxcvbn and returns a score between 0-4
 * 0 = very weak, 1 = weak, 2 = fair, 3 = good, 4 = strong
 */
export const checkPasswordStrength = (password: string): number => {
  if (!password) return 0;
  const result = zxcvbn(password);
  return result.score;
};

/**
 * Returns a descriptive label for the password strength score
 */
export const getPasswordStrengthLabel = (score: number): string => {
  switch (score) {
    case 0:
      return "Very Weak";
    case 1:
      return "Weak";
    case 2:
      return "Fair";
    case 3: 
      return "Good";
    case 4:
      return "Strong";
    default:
      return "Unknown";
  }
};

/**
 * Returns a color for the password strength indicator
 */
export const getPasswordStrengthColor = (score: number): string => {
  switch (score) {
    case 0:
      return "bg-red-600";
    case 1:
      return "bg-red-500";
    case 2:
      return "bg-yellow-500";
    case 3:
      return "bg-green-400";
    case 4:
      return "bg-green-600";
    default:
      return "bg-gray-300";
  }
};

/**
 * Checks if a password meets minimum requirements
 * Returns true if the password is acceptable
 */
export const isPasswordAcceptable = (password: string): boolean => {
  // At least 8 characters and score of 2 or higher
  return password.length >= 8 && checkPasswordStrength(password) >= 2;
};
