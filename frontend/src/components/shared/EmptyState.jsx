import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function EmptyState({ 
  icon: Icon = AlertCircle, 
  title = "No data found", 
  message = "There are currently no records to display for this view.", 
  onRetry = null,
  retryLabel = "Retry Search / Refresh"
}) {
  return (
    <div className="p-8 text-center bg-white border border-[#D7E3FC] rounded-xl my-4 space-y-3 shadow-sm">
      <div className="w-12 h-12 rounded-full bg-[#EDF2FB] text-[#22223B] flex items-center justify-center mx-auto border border-[#E2EAFC]">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#ABC4FF] text-[#22223B] text-xs font-semibold rounded-lg hover:bg-[#B6CCFE] transition-colors shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{retryLabel}</span>
        </button>
      )}
    </div>
  );
}
