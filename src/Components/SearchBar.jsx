import { useState, useEffect } from "react";

const Searchbar = ({ products, setProducts }) => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchProducts, setSearchProducts] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Unique categories from original products
  const uniqueCategories = [
    ...new Set(originalProducts.map((product) => product.category)),
  ];

  useEffect(() => {
    // Set original products only once when products are first received
    if (products && products.length > 0 && originalProducts.length === 0) {
      setOriginalProducts(products);
    }
  }, [products, originalProducts]);

  const filterPrompts = (searchtext, categories = selectedCategories) => {
    // Always start filtering from the original products
    let filteredProducts = originalProducts;

    // Filter by categories if any are selected
    if (categories.length > 0) {
      filteredProducts = filteredProducts.filter((item) =>
        categories.includes(item.category)
      );
    }

    // Filter by search text if present
    if (searchtext) {
      const regex = new RegExp(searchtext, "i");
      filteredProducts = filteredProducts.filter(
        (item) =>
          regex.test(item.name) ||
          regex.test(item.description?.content || "") ||
          regex.test(item.category)
      );
    }

    return filteredProducts;
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    console.log("Original products", originalProducts);
    clearTimeout(searchTimeout);
    setSearchProducts(searchValue);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(searchValue);
        setProducts(searchResult);
      }, 500)
    );
  };

  const handleCategoryToggle = (category) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newSelectedCategories);

    // Update products based on selected categories and current search
    const filteredProducts = filterPrompts(
      searchProducts,
      newSelectedCategories
    );
    setProducts(filteredProducts);
  };

  return (
    <form
      className="flex flex-wrap gap-4 mt-12"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        value={searchProducts}
        onChange={handleSearchChange}
        placeholder="search for a product"
        className="searchbar-input"
      />
      <div className="flex flex-wrap gap-2 mt-4">
        {uniqueCategories.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => handleCategoryToggle(category)}
            className={`px-3 py-1 rounded-full text-sm
               ${
                 selectedCategories.includes(category)
                   ? "bg-blue-500 text-white"
                   : "bg-gray-200 text-gray-700"
               }`}
          >
            {category}
          </button>
        ))}
      </div>
    </form>
  );
};

export default Searchbar;

// import { FormEvent, useState } from "react";

// const Searchbar = ({ products, setProducts }) => {
//    const [allProducts, setAllproducts] = useState(products);
//    const [searchProducts, setSearchProducts] = useState("");
//    const [searchTimeout, setSearchTimeout] = useState(null);
//    const [selectedCategories, setSelectedCategories] = useState([]);

//    // Unique categories from all products
//    const uniqueCategories = [...new Set(products.map(product => product.category))];

//    const filterPrompts = (searchtext, categories) => {
//      const regex = new RegExp(searchtext, "i");
//      return allProducts.filter((item) => {
//        const textMatch =
//          regex.test(item.name) ||
//          regex.test(item.description.content);

//        const categoryMatch =
//          categories.length === 0 ||
//          categories.includes(item.category);

//        return textMatch && categoryMatch;
//      });
//    };

//    const handleSearchChange = (e) => {
//      clearTimeout(searchTimeout);
//      setSearchProducts(e.target.value);

//      setSearchTimeout(
//        setTimeout(() => {
//          const searchResult = filterPrompts(e.target.value, selectedCategories);
//          setProducts(searchResult);
//        }, 500)
//      );
//    };

//    const handleCategoryToggle = (category) => {
//      setSelectedCategories(prev =>
//        prev.includes(category)
//          ? prev.filter(cat => cat !== category)
//          : [...prev, category]
//      );

//      // Trigger search with current search text and updated categories
//      const searchResult = filterPrompts(searchProducts,
//        selectedCategories.includes(category)
//          ? prev.filter(cat => cat !== category)
//          : [...selectedCategories, category]
//      );
//      setProducts(searchResult);
//    };

//    return (
//      <div>
//        <form className="flex flex-wrap gap-4 mt-12" onSubmit={(e) => e.preventDefault()}>
//          <input
//            type="text"
//            value={searchProducts}
//            onChange={handleSearchChange}
//            placeholder="Search for a product"
//            className="searchbar-input"
//          />
//        </form>

//        <div className="flex flex-wrap gap-2 mt-4">
//          {uniqueCategories.map(category => (
//            <button
//              key={category}
//              onClick={() => handleCategoryToggle(category)}
//              className={`px-3 py-1 rounded-full text-sm
//                ${selectedCategories.includes(category)
//                  ? 'bg-blue-500 text-white'
//                  : 'bg-gray-200 text-gray-700'}`}
//            >
//              {category}
//            </button>
//          ))}
//        </div>
//      </div>
//    );
// };

// export default Searchbar;
