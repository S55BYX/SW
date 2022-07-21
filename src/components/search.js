import React from "react";

export default function Search(props) {
  function handleChange(e) {
    return props.setInput(e.target.value);
  }

  return (
    <>
      <form className="form" onSubmit={props.searchSW}>
        <label className="label">Search Planet</label>
        <input
          placeholder="Search for a planet"
          onChange={handleChange}
          value={props.input}
          className="input"
        ></input>
        {props.input && (
          <button onClick={() => props.setInput("")} className="button">
            Clear
          </button>
        )}
      </form>
    </>
  );
}
