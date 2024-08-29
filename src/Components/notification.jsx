import { useState, useEffect } from "react";

const Notification = ({ message, type, duration = 10000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose && onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md shadow-lg z-50 ${
        type === "success"
          ? "bg-[#28ff19] text-black font-bold"
          : "bg-red-500 text-white"
      }`}
    >
      <p>{message}</p>
    </div>
  );
};

export default Notification;
