import React from "react";

interface CardProps {
  children: React.ReactNode;
  css?: string;
}
export default function Card({ children, css }: CardProps) {
  return (
    <div
      className={`w-full max-w-[500px] mx-auto bg-white rounded-xl shadow-card overflow-hidden ${css}`}
    >
      {children}
    </div>
  );
}
