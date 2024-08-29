import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductCard } from "../../Components/Product_card";
import { Footer } from "../../Components/footer";
import { Navlink } from "../../Components/Navbar_";

const ProductsPage = () => {
  const [productsData, setProductsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [openCategories, setOpenCategories] = useState({});
  const apiUrl = import.meta.env.VITE_APIBACK_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/getproducts`)
      .then((response) => {
        const productsData = response.data;
        setProductsData(productsData);
        setLoading(false);

        // Extract unique categories and subcategories
        const categoryMap = {};
        productsData.forEach((product) => {
          if (!categoryMap[product.category]) {
            categoryMap[product.category] = new Set();
          }
          categoryMap[product.category].add(product.subcategory);
        });

        const categories = Object.keys(categoryMap).map((category) => ({
          name: category,
          subcategories: Array.from(categoryMap[category]),
        }));
        setCategories(categories);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setLoading(false);
      });
  }, []);

  const handleSubcategoryClick = (category, subcategory) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleCategory = (categoryName) => {
    setOpenCategories((prevState) => ({
      ...prevState,
      [categoryName]: !prevState[categoryName],
    }));
  };

  const filteredProducts = productsData.filter((product) => {
    return (
      (selectedCategory ? product.category === selectedCategory : true) &&
      (selectedSubcategory ? product.subcategory === selectedSubcategory : true)
    );
  });

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Navlink />
      <div className="bg-gradient-to-b from-[#0f4c0d] to-black min-h-screen py-20">
        <div className="text-[#0eff06] text-4xl font-bold mb-4 flex justify-center py-4">
          Productos
        </div>
        <div className="flex flex-auto flex-col lg:flex-row">
          <div className="lg:hidden mb-4 px-4">
            <button
              onClick={toggleDropdown}
              className="bg-[#0eff06] text-black py-2 px-4 rounded-lg w-full"
            >
              {dropdownVisible ? "Cerrar Categorías" : "Abrir Categorías"}
            </button>
          </div>
          <div
            className={`menu border-2 border-[#0eff06] rounded-xl lg:h-1/5 lg:w-1/5 p-2 m-4 flex flex-col ${
              dropdownVisible ? "block" : "hidden lg:block"
            }`}
          >
            <h2 className="text-2xl font-bold mb-2 text-[#0eff06] text-center">
              Categorías
            </h2>
            {categories.map((category, index) => (
              <details
                key={index}
                className="dropdown text-white w-full lg:h-9"
              >
                <summary
                  className="m-1 hover:bg-[#0eff06] hover:text-black mx-1 p-2 rounded-lg w-full text-left"
                  onClick={() => toggleCategory(category.name)}
                >
                  {category.name}
                </summary>
                <ul
                  className={`bg-base-100 rounded-box z-[1] p-2 shadow transition-max-height duration-300 ease-in-out overflow-hidden w-full ${
                    openCategories[category.name] ? "max-h-screen" : "max-h-0"
                  }`}
                >
                  {category.subcategories.map((subcategory, subIndex) => (
                    <li
                      key={subIndex}
                      className="cursor-pointer rounded hover:bg-[#c1ff06] hover:text-black p-2"
                      onClick={() =>
                        handleSubcategoryClick(category.name, subcategory)
                      }
                    >
                      {subcategory}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 content-stretch w-full px-4 md:px-10 lg:px-10">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                images={product.images}
                productName={product.productName}
                stock={product.stock}
                price={product.price}
                id_product={product._id}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProductsPage;
