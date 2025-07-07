"use client";

import { usePathname } from "next/navigation";
import React, { useState } from "react";
import ChatIcon from "./ChatIcon";
import ChatBox from "./ChatBox";

const Chatbot = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Hide on login/signup
  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <>
      <ChatIcon onClick={() => setOpen(!open)} />
      {open && <ChatBox onClose={() => setOpen(false)} />}
    </>
  );
};

export default Chatbot;
