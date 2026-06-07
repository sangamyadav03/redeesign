const LoadingSpinner = ({ label = 'Loading...' }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-4">
    <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    <p className="text-sm text-white/60 tracking-widest uppercase">{label}</p>
  </div>
);

export default LoadingSpinner;
