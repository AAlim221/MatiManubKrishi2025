// Dropdown-menu.jsx
import React, { useState, useRef, useEffect } from "react";

export const DropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Clone children and inject toggle/isOpen
  const childrenWithProps = React.Children.map(children, (child) => {
    if (child.type.displayName === "DropdownMenuTrigger") {
      return React.cloneElement(child, { toggle });
    }
    if (child.type.displayName === "DropdownMenuContent") {
      return React.cloneElement(child, { isOpen });
    }
    return child;
  });

  return (
    <div className="relative inline-block" ref={menuRef}>
      {childrenWithProps}
    </div>
  );
};

export const DropdownMenuTrigger = ({ children, toggle }) => {
  return (
    <div onClick={toggle} className="cursor-pointer">
      {children}
    </div>
  );
};
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export const DropdownMenuContent = ({ align = "start", children, className = "", isOpen }) => {
  if (!isOpen) return null;
  return (
    <div
      className={
        "absolute mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 " +
        className +
        (align === "end" ? " right-0" : " left-0")
      }
    >
      {children}
    </div>
  );
};
DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuItem = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
    >
      {children}
    </div>
  );
};
