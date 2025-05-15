import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4 md:p-8 flex flex-col items-center justify-center h-[70vh]">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center max-w-md">
        <AlertTriangle size={48} className="mx-auto text-amber-500 mb-4" />
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-slate-500 mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors shadow-sm"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
