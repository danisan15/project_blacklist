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
        <option value="1">Plan Basico - Gratis</option>
        <option value="2">Plan Premium - $10</option>
        <option value="3">Plan Top - $30</option>
      </select>
    </div>
  );
};

export default DropdownBar;
