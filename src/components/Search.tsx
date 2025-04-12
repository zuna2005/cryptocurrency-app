import { useState } from "react";
import SearchIcon from "../assets/search.svg";

function Search({ onSearch }: { onSearch: (input: string) => void }) {
  const [input, setInput] = useState("");

  function handleSearch() {
    setInput("");
    onSearch(input);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="input-group w-50">
      <input
        type="text"
        className="form-control"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter coin symbol"
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
      >
        <img src={SearchIcon} onClick={handleSearch} />
      </button>
    </div>
  );
}

export default Search;
