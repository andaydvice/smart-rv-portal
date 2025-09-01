
import { useAuthForm } from './useAuthForm';
import AuthTabs from './AuthTabs';
import AuthErrorAlert from './AuthErrorAlert';
import OtpPrompt from './OtpPrompt';
import AuthHeader from './AuthHeader';
import AuthFormFields from './AuthFormFields';

interface AuthFormsProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const AuthForms = ({ onSuccess, onError }: AuthFormsProps) => {
  const {
    isSignUp,
    setIsSignUp,
    isPasswordReset,
    setIsPasswordReset,
    loading,
    email,
    setEmail,
    password, 
    setPassword,
    passwordStrength,
    error,
    showOtp,
    handleSubmit,
    handlePasswordReset,
    handleOtpVerify,
    handleCancelOtp
  } = useAuthForm({ onSuccess, onError });

  // UI: show OTP dialog if 2FA enabled
  if (showOtp) {
    return (
      <OtpPrompt
        email={email}
        onVerify={handleOtpVerify}
        onCancel={handleCancelOtp}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <AuthTabs 
          isSignUp={isSignUp} 
          setIsSignUp={setIsSignUp}
          isPasswordReset={isPasswordReset}
          setIsPasswordReset={setIsPasswordReset}
        />
        <AuthHeader isSignUp={isSignUp} isPasswordReset={isPasswordReset} />
      </div>

      <AuthErrorAlert error={error} />

      <AuthFormFields
        isSignUp={isSignUp}
        isPasswordReset={isPasswordReset}
        loading={loading}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        passwordStrength={passwordStrength}
        onSubmit={isPasswordReset ? handlePasswordReset : handleSubmit}
      />
    </div>
  );
};
