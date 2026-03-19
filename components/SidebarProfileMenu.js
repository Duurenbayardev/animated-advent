"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function SidebarProfileMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sidebar-profile-menu" ref={wrapperRef}>
      <button type="button" className="profile-name-button" onClick={() => setOpen((v) => !v)}>
        Бат-Эрдэнэ Ганболд
      </button>
      {open && (
        <div className="profile-dropdown">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              router.push("/login");
            }}
          >
            Гарах
          </button>
        </div>
      )}
    </div>
  );
}
