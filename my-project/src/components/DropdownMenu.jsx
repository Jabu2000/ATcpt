import { useState, useRef, useEffect } from "react";

function DropdownMenu({ onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-gray-400 hover:text-gray-700"
        aria-label="Options"
      >
        ⋮
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <button
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Edit
          </button>
          <button
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;