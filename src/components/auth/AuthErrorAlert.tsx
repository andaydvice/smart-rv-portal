
import { AlertCircle } from "lucide-react";

const AuthErrorAlert = ({ error }: { error: string | null }) =>
  error ? (
    <div className="bg-red-900/30 border border-red-500/50 p-3 rounded-md flex items-start gap-2 mb-2">
      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
      <p className="text-sm text-white">{error}</p>
    </div>
  ) : null;

export default AuthErrorAlert;
