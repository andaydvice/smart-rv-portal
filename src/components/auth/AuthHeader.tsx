
interface AuthHeaderProps {
  isSignUp: boolean;
}

const AuthHeader = ({ isSignUp }: AuthHeaderProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white text-left">
        {isSignUp ? "Create Your Account" : "Welcome Back"}
      </h2>
      <p className="text-white text-left">
        {isSignUp 
          ? "Join our community of RV enthusiasts" 
          : "Access your Smart RV tools and saved preferences"}
      </p>
    </div>
  );
};

export default AuthHeader;
