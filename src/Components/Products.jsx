import React, { useState } from "react";

const categories = {
  Slider_superior: [
    "Dinamo",
    "Honda",
    "Italika",
    "Mbmotors",
    "Suzuki",
    "Veloci",
    "Vento",
    "Yamaha",
    "Universal",
  ],
  Slider_inferior: [
    "Dinamo",
    "Honda",
    "Italika",
    "Mbmotors",
    "Suzuki",
    "Veloci",
    "Vento",
    "Yamaha",
    "Universal",
  ],
  Slider_trasero: [
    "Dinamo",
    "Honda",
    "Italika",
    "Mbmotors",
    "Suzuki",
    "Veloci",
    "Vento",
    "Yamaha",
    "Universal",
  ],
  Parrilla_carga: [
    "Dinamo",
    "Honda",
    "Italika",
    "Mbmotors",
    "Suzuki",
    "Veloci",
    "Vento",
    "Yamaha",
    "Universal",
  ],
  Parrilla_respaldo: [
    "Dinamo",
    "Honda",
    "Italika",
    "Mbmotors",
    "Suzuki",
    "Veloci",
    "Vento",
    "Yamaha",
    "Universal",
  ],
  Porta_alforjas: [
    "Dinamo",
    "Honda",
    "Italika",
    "Mbmotors",
    "Suzuki",
    "Veloci",
    "Vento",
    "Yamaha",
    "Universal",
  ],
  Protector_de_faro: [
    "Dinamo",
    "Honda",
    "Italika",
    "Mbmotors",
    "Suzuki",
    "Veloci",
    "Vento",
    "Yamaha",
    "Universal",
  ],
};

export const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Sliders");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const productsPerPage = 4;

  const filteredProducts = productsData.filter(
    (product) =>
      product.category === selectedCategory &&
      (selectedSubcategory === "" ||
        product.subcategory === selectedSubcategory)
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-auto text-white">
      <div className="">
        <h2 className="text-[#0eff06] text-4xl font-bold mb-4 flex justify-center py-4">
          Productos
        </h2>
      </div>
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row">
        <button
          className="lg:hidden bg-[#0eff06] text-black p-2 rounded mb-4 mx-4"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? "Cerrar Categorías" : "Abrir Categorías"}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`flex justify-start bg-black text-white rounded-lg p-4 w-full lg:w-64 border-2 border-[#0eff06] mb-4 lg:mb-0 lg:block ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4 text-[#0eff06] text-center">
          Categorías
        </h2>
        <div className="border-b border-[#0eff06]">
          <ul className="menu bg-base-200 w-full lg:w-56 rounded-box">
            {Object.keys(categories).map((category) => (
              <li key={category}>
                <div
                  className={`cursor-pointer py-2 px-4 rounded hover:bg-[#0eff06] hover:text-black ${
                    selectedCategory === category
                      ? "bg-[#0eff06] text-black"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedSubcategory("");
                    setCurrentPage(1);
                    setIsSidebarOpen(false); // Close the sidebar on selection in small screens
                  }}
                >
                  {category}
                </div>

                {selectedCategory === category &&
                  categories[category].length > 0 && (
                    <ul className="ml-4 mt-2">
                      {categories[category].map((subcategory) => (
                        <li
                          key={subcategory}
                          className={`cursor-pointer py-1 px-4 rounded hover:bg-[#0eff06] hover:text-black ${
                            selectedSubcategory === subcategory
                              ? "bg-[#0eff06] text-black"
                              : ""
                          }`}
                          onClick={() => {
                            setSelectedSubcategory(subcategory);
                            setCurrentPage(1);
                            setIsSidebarOpen(false); // Close the sidebar on selection in small screens
                          }}
                        >
                          {subcategory}
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Products */}
      <div className="w-full px-10 lg:px-10">
        <h2 className="text-2xl font-bold mb-4 text-[#0eff06] text-center">
          {selectedCategory}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center lg:grid-cols-3 gap-4">
          {currentProducts.map((product) => (
            <div
              key={product.productid}
              className="bg-white text-black rounded-lg shadow-lg p-4"
            >
              <img
                src={product.images}
                alt={product.productName}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
              <p className="text-green-500 font-bold">
                Precio: ${product.price} MXN
              </p>
              <h3 className="font-bold text-lg mb-2">{product.productName}</h3>
              <p className="text-red-500">{product.stock} Disponibles</p>
              <button className="mt-4 w-full bg-gray-900 hover:bg-[#0eff06] text-white hover:text-black py-2 rounded-lg">
                Ver más
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-end mt-8">
        <button
          className="bg-gray-900 hover:bg-[#0eff06] text-white hover:text-black py-2 px-4 rounded-lg mr-2"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <button
          className="bg-gray-900 hover:bg-[#0eff06] text-white hover:text-black py-2 px-4 rounded-lg"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
