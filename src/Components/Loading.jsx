import React, { useState, useEffect } from "react";

const Loading = () => {
  const [loading, setLoading] = useState(true);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
      <div className="w-full sm:w-[500px] bg-gray-800 p-6 rounded-xl shadow-lg">
        {loading ? (
          <>
            {/* Skeleton for header */}
            <div className="h-6 bg-gray-700 rounded mb-4 w-1/3"></div>

            {/* Skeleton for form */}
            <div className="flex mb-4 space-x-2">
              <div className="h-10 bg-gray-700 rounded w-full"></div>
              <div className="h-10 bg-gray-700 rounded w-20"></div>
            </div>

            {/* Skeleton for task list */}
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-700 px-4 py-2 rounded-md flex items-center justify-between"
                >
                  <div className="h-5 w-5 bg-gray-600 rounded"></div>
                  <div className="h-5 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-6 w-6 bg-gray-600 rounded"></div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Replace this block with your actual `Todo` component */}
            <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>
            {/* Add form and task list components */}
          </>
        )}
      </div>
    </div>
  );
};

export default Loading;
