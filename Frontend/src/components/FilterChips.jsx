export function FilterChips({ options, selected = [], onChange, singleSelect = false }) {
  const toggleChip = (option) => {
    if (singleSelect) {
      onChange([option]); 
    } else {
      if (selected.includes(option)) {
        onChange(selected.filter((s) => s !== option));
      } else {
        onChange([...selected, option]);
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isActive = selected.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => toggleChip(opt)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "bg-[#61A5C2] text-black"
                : "bg-[#01497C] text-white hover:bg-[#014F86]"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
