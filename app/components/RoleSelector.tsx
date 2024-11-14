"use client";
import React, { Fragment, useState } from "react";

const roles = [
  { id: 1, name: "Driver" },
  { id: 2, name: "Fleet Manager" },
  { id: 3, name: "Admin" },
];

interface RoleSelectorProps {
  selectedRole: { id: number; name: string };
  setSelectedRole: (role: { id: number; name: string }) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({
  selectedRole,
  setSelectedRole,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (role: { id: number; name: string }) => {
    setSelectedRole(role);
    setIsOpen(false);
  };

  return (
    <Fragment>
      <div className="relative">
        <label htmlFor="role" className="block text-sm font-medium text-black">
          Role:
        </label>
        <button
          type="button"
          className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-blue-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="block truncate">{selectedRole.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <span className="h-5 w-5 text-gray-400">{isOpen ? "▲" : "▼"}</span>
          </span>
        </button>
        {isOpen && (
          <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {roles.map((role) => (
              <li
                key={role.id}
                className={`cursor-default select-none relative py-2 pl-3 pr-9 ${
                  selectedRole.id === role.id
                    ? "text-white bg-blue-600"
                    : "text-gray-900"
                } hover:bg-blue-200`}
                onClick={() => handleSelect(role)}
              >
                <span
                  className={`block truncate ${
                    selectedRole.id === role.id
                      ? "font-semibold"
                      : "font-normal"
                  }`}
                >
                  {role.name}
                </span>
                {selectedRole.id === role.id && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                    ✓
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Fragment>
  );
};

export default RoleSelector;
