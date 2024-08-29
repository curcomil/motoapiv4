import "../Pages/Home/OrderPages/styleOrder.css";
import { IoSearch } from "react-icons/io5";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="containerSearch">
      <input
        className="searchInput"
        type="search"
        placeholder="Buscar..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <button className="seachButton" type="button">
        <IoSearch className="text-white m-2" size={20} />
      </button>
    </div>
  );
};
export default SearchBar;
