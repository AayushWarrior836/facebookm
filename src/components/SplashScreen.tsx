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
        <svg viewBox="0 0 36 36" className="w-24 h-24" fill="#1877f2">
          <path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 4.921 1.971 9.381 5.166 12.624L5.15 25.5h4.1l1.65-6.6H7.2L7.8 16h3.75l.45-2.85c.399-2.55 2.1-4.95 6.3-4.95 1.65 0 3.15.3 3.15.3v3.6h-1.8c-1.65 0-2.25.9-2.25 2.1V16h4.05l-.6 2.9h-3.45l-1.65 6.6h3.75l.081 5.07z"/>
        </svg>
      </div>
      <div className="absolute bottom-12 flex flex-col items-center gap-1 text-sm">
        <span className="text-gray-400">from</span>
        <span className="text-[#1877f2] font-semibold text-lg tracking-wide">Meta</span>
      </div>
    </div>
  );
};

export default SplashScreen;
