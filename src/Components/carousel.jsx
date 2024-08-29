import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_APIBACK_URL;

const Carousel = () => {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(1); // Default for mobile

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getproducts`);
        setItems(response.data);
      } catch (error) {
        console.error("Error al obtener datos: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateItemsToShow = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsToShow(3); // Desktop
      } else if (width >= 768) {
        setItemsToShow(2); // Tablet
      } else {
        setItemsToShow(1); // Mobile
      }
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);

    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : items.length - itemsToShow
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < items.length - itemsToShow ? prev + 1 : 0
    );
  };

  const visibleItems = items.slice(currentIndex, currentIndex + itemsToShow);

  return (
    <div className="relative flex justify-center items-center w-10/20 h-auto shadow-lg shadow-[#0eff06] p-4 rounded-lg bg-transparent">
      <button
        onClick={handlePrev}
        aria-label="Previous"
        className="p-2 bg-transparent text-[#0eff06] rounded-full hover:bg-gray-400"
      >
        <FaChevronLeft size="1.5rem" className="text-[#0eff06]" />
      </button>
      <div className="flex overflow-hidden w-full">
        {visibleItems.map((item, index) => {
          const id = item._id.toString();

          return (
            <div
              className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2"
              key={index}
            >
              <div className="bg-white rounded-xl shadow-md">
                <Link to={`/detail?id=${id}`}>
                  <img
                    className="w-full h-48 object-cover rounded-xl"
                    src={item.images}
                    alt={`Image ${index}`}
                  />
                </Link>
              </div>
              <h2 className="text-white text-center">{item.productName}</h2>
            </div>
          );
        })}
      </div>
      <button
        onClick={handleNext}
        aria-label="Next"
        className="p-2 bg-transparent text-[#0eff06] rounded-full hover:bg-gray-400"
      >
        <FaChevronRight size="1.5rem" className="text-[#0eff06]" />
      </button>
    </div>
  );
};

export default Carousel;
