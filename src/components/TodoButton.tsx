import React from "react";

export default function TodoButton(props: any) {
  return (
    <button
      className={`transition hover:scale-[1.05] shrink-0 p-1 rounded-md ring-[1px] ring-gray-300 text-gray-600 hover:text-primary`}
      {...props}
    >
      {props.children}
    </button>
  );
}
