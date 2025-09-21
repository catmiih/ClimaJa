import { useRef, useState, useEffect } from "react";

export default function PullToRefresh({ onRefresh, children }) {
  const startY = useRef(null);
  const [pull, setPull] = useState(0);

  const isTouchMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches &&
    window.matchMedia("(max-width: 767px)").matches;

  useEffect(() => {
    return () => setPull(0);
  }, []);

  if (!isTouchMobile) return <>{children}</>;

  const onTouchStart = (e) => {
    if (window.scrollY > 0) return;
    startY.current = e.touches[0].clientY;
  };

  const onTouchMove = (e) => {
    if (startY.current == null || window.scrollY > 0) return;
    const dy = e.touches[0].clientY - startY.current;
    setPull(Math.max(0, Math.min(dy, 140)));
  };

  const onTouchEnd = async () => {
    const THRESHOLD = 70;
    if (pull >= THRESHOLD && onRefresh) {
      await onRefresh();
    }
    setPull(0);
    startY.current = null;
  };

  return (
    <div
      style={{
        transform: `translateY(${pull * 0.35}px)`,
        transition: pull ? "none" : "transform .18s ease-out",
        willChange: "transform",
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {pull > 0 && (
        <div
          style={{
            textAlign: "center",
            opacity: 0.7,
            marginBottom: 6,
            fontSize: 14,
          }}
        >
          {pull < 70 ? "Puxe para atualizar…" : "Solte para atualizar"}
        </div>
      )}
      {children}
    </div>
  );
}
