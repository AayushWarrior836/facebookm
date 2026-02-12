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
      style={{ backgroundColor: "hsl(220, 20%, 96%)" }}
    >
      <div className="flex flex-col items-center gap-2 animate-splash-pulse">
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg">
          <span className="text-primary-foreground text-4xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
            f
          </span>
        </div>
      </div>
      <div className="absolute bottom-12 flex flex-col items-center gap-1 text-muted-foreground text-sm">
        <span>from</span>
        <span className="text-primary font-semibold text-lg tracking-wide">Meta</span>
      </div>
    </div>
  );
};

export default SplashScreen;
