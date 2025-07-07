"use client";

import { FaCommentDots } from "react-icons/fa";
import React from "react";

interface ChatIconProps {
  onClick: () => void;
}

const ChatIcon: React.FC<ChatIconProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-blue-500 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform"
    aria-label="Open chat"
  >
    <FaCommentDots size={22} />
  </button>
);

export default ChatIcon;
