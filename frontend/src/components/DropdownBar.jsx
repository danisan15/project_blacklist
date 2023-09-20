import React, { useState } from "react";
import styles from "./Forms.module.css";

const DropdownBar = ({ handleChange }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    handleChange(event.target.value);
  };

  return (
    <div className={styles.dropDownBar}>
      <label htmlFor="dropdown">Elija un plan: </label>
      <select
        id="dropdown"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="free">Plan Free</option>
        <option value="premium">Plan Premium - $10</option>
        <option value="top">Plan Top - $30</option>
      </select>
    </div>
  );
};

export default DropdownBar;
