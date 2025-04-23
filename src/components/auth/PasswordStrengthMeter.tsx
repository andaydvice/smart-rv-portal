
import { getPasswordStrengthColor, getPasswordStrengthLabel } from '@/utils/passwordUtils';

interface PasswordStrengthMeterProps {
  passwordStrength: number;
}

const PasswordStrengthMeter = ({ passwordStrength }: PasswordStrengthMeterProps) => {
  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-white">Password strength: </span>
        <span className="text-xs font-semibold text-white">{getPasswordStrengthLabel(passwordStrength)}</span>
      </div>
      <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getPasswordStrengthColor(passwordStrength)} transition-all duration-300`} 
          style={{ width: `${(passwordStrength + 1) * 20}%` }} 
        />
      </div>
      <p className="text-xs text-white mt-1">
        Use at least 8 characters with a mix of letters, numbers, and symbols
      </p>
    </div>
  );
};

export default PasswordStrengthMeter;
