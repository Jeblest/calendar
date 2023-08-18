import React from "react";
import { Link } from "react-router-dom";
export default function TaskTracking() {
  return (
    <div className="mt-2">
      <div className="flex justify-center items-center">
        <span className="text-lg hover:underline hover:text-blue-300 "><Link>Your Notes</Link></span>
      </div>
      
    </div>
  );
}
