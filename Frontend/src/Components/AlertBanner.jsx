import React from "react";
import { AlertTriangle } from 'lucide-react'


export default function AlertBanner() {
  return (
    <>
      <div className="rounded-md border-l-4 border-red-500 bg-red-100 p-4">
        <div className="flex items-center space-x-4">
          <div>
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-red-600">
              Contact details are not successfully send! Try with unqiue details
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
