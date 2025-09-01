
import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { AlertCircle, CheckCircle2, XCircle, Clock } from "lucide-react";
import { format } from "date-fns";

interface AuthLog {
  id: string;
  timestamp: Date;
  event: "signin" | "signout" | "verification" | "password_update" | "twofactor_toggle";
  success: boolean;
  ipAddress: string;
  device: string;
}

// This is a demo component with mock data
// In a real application, this would fetch actual auth logs from the backend
const SecurityVerificationLogs = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState<AuthLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real activity logging is not yet implemented
    // This will show when actual security logging is added
    if (user) {
      setLoading(false);
      setLogs([]); // No logs until real implementation
    }
  }, [user]);

  const getEventLabel = (event: string) => {
    switch (event) {
      case "signin":
        return "Sign In";
      case "signout":
        return "Sign Out";
      case "verification":
        return "Email Verification";
      case "password_update":
        return "Password Update";
      case "twofactor_toggle":
        return "2FA Settings Changed";
      default:
        return event;
    }
  };

  const getEventIcon = (event: string, success: boolean) => {
    if (!success) {
      return <XCircle className="w-5 h-5 text-red-500" />;
    }
    
    switch (event) {
      case "signin":
      case "verification":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "password_update":
      case "twofactor_toggle":
        return <CheckCircle2 className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-6 max-w-full mx-auto my-6">
      <div className="flex items-center mb-6">
        <Clock className="text-blue-400 w-6 h-6 mr-2" />
        <h3 className="text-lg font-bold text-white">Account Activity</h3>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : logs.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p>Activity logging is not yet implemented</p>
          <p className="text-sm mt-2">We're working on adding real security monitoring features</p>
        </div>
      ) : (
        <div className="overflow-hidden">
          <div className="max-h-[400px] overflow-y-auto pr-2">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Event
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Device
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    IP Address
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/30 divide-y divide-gray-800">
                {logs.map((log) => (
                  <tr key={log.id} className={!log.success ? "bg-red-900/10" : ""}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        {getEventIcon(log.event, log.success)}
                        <span className="ml-2 text-white text-sm">
                          {getEventLabel(log.event)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                      {format(log.timestamp, "MMM d, yyyy h:mm a")}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                      {log.device}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                      {log.ipAddress}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-xs text-gray-400">
            <p>Activity logging will be available when we implement real security monitoring.</p>
            <p>Currently, only basic account security features are available.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityVerificationLogs;
