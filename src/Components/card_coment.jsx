import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const Card_coment = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(1);
  const apiUrl = import.meta.env.VITE_APIBACK_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getproducts`);
        // Filtrar los productos que tienen comentarios
        const productsWithReviews = response.data.filter(
          (product) => product.reviews && product.reviews.length > 0
        );

        setReviews(productsWithReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [apiUrl]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsToShow(1); // Desktop
      } else if (window.innerWidth >= 768) {
        setItemsToShow(1); // Tablet
      } else {
        setItemsToShow(1); // Mobile
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(reviews.length - itemsToShow, 0)
        : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Math.max(reviews.length - itemsToShow, 0)
        ? 0
        : prevIndex + 1
    );
  };

  const handleViewMore = (id_product) => {
    navigate(`/detail?id=${id_product}`);
  };

  return (
    <div className="flex justify-center items-center w-full h-full p-4">
      <button
        onClick={handlePrev}
        aria-label="Previous"
        className="p-2 bg-transparent text-[#0eff06] rounded-full hover:bg-gray-400"
      >
        <FaChevronLeft
          size="1.5rem"
          className="bg-transparent text-[#0eff06]"
        />
      </button>
      <div className="w-full max-w-md md:max-w-lg lg:max-w-3xl h-auto shadow-lg shadow-[#0eff06] p-4 rounded-lg bg-white">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center w-full space-x-4">
            {reviews.length > 1 ? (
              reviews
                .slice(currentIndex, currentIndex + itemsToShow)
                .map((review, index) => (
                  <div
                    key={index}
                    className="w-full flex flex-col items-center pb-4"
                    style={{ width: `${100 / itemsToShow}%` }}
                  >
                    <img
                      src={review.images}
                      alt={review.productName}
                      className="h-36 w-36 md:h-48 md:w-48 lg:h-56 lg:w-56 object-contain bg-white rounded-full mb-4"
                    />
                    <h2 className="text-[#0eff06] text-xl md:text-2xl font-semibold w-full text-center">
                      {review.reviews[0].username.charAt(0).toUpperCase() +
                        review.reviews[0].username.slice(1)}
                    </h2>

                    <div className="border-b-2 border-[#0eff06] w-full mb-4" />
                    <BiSolidQuoteLeft size="1.5rem" />
                    <p className="text-black text-center mb-4 text-sm md:text-base lg:text-lg">
                      {review.reviews[0].opinion}
                    </p>
                    <BiSolidQuoteRight size="1.5rem" />
                    <div className="flex justify-center mb-4">
                      {[...Array(review.reviews[0].rating)].map((_, i) => (
                        <span
                          key={i}
                          className="mask mask-star-2 bg-green-500 w-4 h-4 md:w-6 md:h-6"
                        ></span>
                      ))}
                    </div>
                    <div className="card-actions justify-end">
                      <button
                        onClick={() => handleViewMore(review.id_product)}
                        className="nav-button hover:drop-shadow-lg flex w-full items-center justify-center rounded-full border border-[#0eff06e9] bg-[#0eff06] bg-gradient-to-tr from-[#0eff06] to-[#78c048]/70 px-5 py-2 md:px-7 md:py-2.5 text-sm md:text-base font-bold text-slate-800 ring-lime-600 ring-offset-2 ring-offset-slate-700 drop-shadow-[0px_1px_2px_rgb(0,0,0,0.3)] active:ring-1"
                      >
                        Ver Producto
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          className="ml-2"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-black">No reviews available.</p>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={handleNext}
        aria-label="Next"
        className="p-2 bg-transparent text-[#0eff06] rounded-full hover:bg-gray-400"
      >
        <FaChevronRight
          size="1.5rem"
          className="bg-transparent text-[#0eff06]"
        />
      </button>
    </div>
  );
};
