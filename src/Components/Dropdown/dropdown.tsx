import React, { useState, useRef, useEffect } from "react";
import "./dropdown.css";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  placeholder?: string;
  searchable?: boolean;
  color?: string;
  onChange?: (value: string) => void;
  value?: string;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = "Selecciona una opción",
  searchable = false,
  color = "#a78bfa",
  onChange,
  value,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
      )
    : options;

  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`dropdown-container ${className}`}
      ref={ref}
      tabIndex={0}
      onBlur={() => setOpen(false)}
    >
      <div
        className="dropdown-selected"
        style={{ borderColor: color }}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={selected ? "" : "dropdown-placeholder"}>
          {selected ? selected.label : placeholder}
        </span>
        <span className="dropdown-arrow" style={{ color }}>
          ▼
        </span>
      </div>
      {open && (
        <div className="dropdown-list" style={{ borderColor: color }}>
          {searchable && (
            <input
              className="dropdown-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar..."
              autoFocus
              style={{ borderColor: color }}
            />
          )}
          {filteredOptions.length === 0 ? (
            <div className="dropdown-option dropdown-no-option">
              Sin opciones
            </div>
          ) : (
            filteredOptions.map((opt) => (
              <div
                key={opt.value}
                className={`dropdown-option${
                  value === opt.value ? " selected" : ""
                }`}
                style={{
                  background:
                    value === opt.value ? color : undefined,
                  color: value === opt.value ? "#fff" : undefined,
                }}
                onClick={() => {
                  onChange?.(opt.value);
                  setOpen(false);
                  setSearch("");
                }}
              >
                {opt.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;