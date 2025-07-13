const TasksListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="p-4 bg-white shadow-sm rounded-lg animate-pulse"
        >
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>

          <div className="mt-6 flex justify-between items-center">
            <div className="flex gap-2 w-2/4">
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>

          <div className="mt-3 flex justify-between items-center">
            <div className="flex gap-2 w-2/4">
              <div className="h-3 bg-gray-200 rounded w-2/5"></div>
              <div className="h-3 bg-gray-200 rounded w-3/5"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TasksListSkeleton;
