import React from "react";
import Select from "react-select";

function SearchBar({ inputDataState, setSelectedEmployee, selectedEmployee }) {
  return (
    <Select
      onChange={(e) => {
        const selectingItem = inputDataState.find(
          (item) => item.initials === e.value
        );
        setSelectedEmployee(selectingItem);
      }}
      options={inputDataState.map((item) => {
        return { value: item.initials, label: item.initials };
      })}
    />
  );
}

export default SearchBar;
