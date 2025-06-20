export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-700 text-sm">Loading, please wait...</p>
      </div>
    </div>
  );
}
