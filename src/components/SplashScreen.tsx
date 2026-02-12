import { useState, useEffect } from "react";

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onFinish, 300);
    }, 1000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor: "#fff" }}
    >
      <div className="flex flex-col items-center gap-2 animate-splash-pulse">
        <img src="/facebook-logo.png" alt="Facebook" className="h-24 object-contain" />
      </div>
      <div className="absolute bottom-12 flex flex-col items-center gap-1 text-sm">
        <span className="text-gray-400">from</span>
        <span className="text-[#1877f2] font-semibold text-lg tracking-wide">Meta</span>
      </div>
    </div>
  );
};

export default SplashScreen;
