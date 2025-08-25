// import { Link } from "react-router-dom";
// import { useState } from "react";

// const Form = ({ type, product, setProduct, submitting, handleSubmit }) => {
//   const [imageInputs, setImageInputs] = useState(product.productImage || []);

//   const handleAddImage = () => {
//     setImageInputs([...imageInputs, { URL: "" }]); // Add a new empty image URL
//   };

//   const handleRemoveImage = (index) => {
//     const updatedImages = imageInputs.filter((_, i) => i !== index);
//     setImageInputs(updatedImages);
//     setProduct({ ...product, productImage: updatedImages });
//   };

//   const handleImageChange = (index, value) => {
//     const updatedImages = [...imageInputs];
//     updatedImages[index].URL = value;
//     setImageInputs(updatedImages);
//     setProduct({ ...product, productImage: updatedImages });
//   };

//   return (
//     <section className="w-full max-w-full flex-start flex-col">
//       <h1 className="head_text text-left">
//         <span className="blue_gradient">{type} Product</span>
//       </h1>
//       <p className="desc text-left max-w-md">
//         {type} and share amazing prompts with the world, and let your
//         imagination run wild with any AI-powered platform
//       </p>

//       <form
//         onSubmit={handleSubmit}
//         className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
//       >
//         {/* Product Name */}
//         <label>
//           <span className="font-satoshi font-semibold text-base text-gray-700">
//             Name of the Product
//           </span>
//           <input
//             type="text"
//             value={product.name}
//             onChange={(e) => setProduct({ ...product, name: e.target.value })}
//             placeholder="Write your product name here"
//             required
//             className="form_input"
//           />
//         </label>

//         {/* Product Price */}
//         <label>
//           <span className="font-satoshi font-semibold text-base text-gray-700">
//             Price
//           </span>
//           <input
//             type="number"
//             value={product.price}
//             onChange={(e) => setProduct({ ...product, price: e.target.value })}
//             placeholder="Write your product price here"
//             required
//             className="form_input "
//           />
//         </label>

//         {/* Product Description */}
//         <label>
//           <span className="font-satoshi font-semibold text-base text-gray-700">
//             Description
//           </span>
//           <textarea
//             value={product.description.content}
//             onChange={(e) =>
//               setProduct({
//                 ...product,
//                 description: {content: e.target.value},
//               })
//             }
//             placeholder="Write your product description here"
//             required
//             className="form_textarea"
//           />
//         </label>

//         {/* Product Category */}
//         <label>
//           <span className="font-satoshi font-semibold text-base text-gray-700">
//             Category{" "}
//             <span className="font-normal">
//               (example: clothing, grocery, etc.)
//             </span>
//           </span>
//           <input
//             value={product.category}
//             onChange={(e) =>
//               setProduct({ ...product, category: e.target.value })
//             }
//             type="text"
//             placeholder="Category"
//             required
//             className="form_input"
//           />
//         </label>

//         {/* Dynamic Image Inputs */}
//         <label>
//           <span className="font-satoshi font-semibold text-base text-gray-700">
//             Product Images
//           </span>
//           <div className="flex flex-col gap-3 mt-2">
//             {imageInputs.map((image, index) => (
//               <div key={index} className="flex items-center gap-3">
//                 <input
//                   type="text"
//                   value={image.URL}
//                   onChange={(e) => handleImageChange(index, e.target.value)}
//                   placeholder={`Image URL ${index + 1}`}
//                   required
//                   className="form_input flex-1"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveImage(index)}
//                   className="text-red-500 text-sm font-semibold"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={handleAddImage}
//               className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md"
//             >
//               Add Image
//             </button>
//           </div>
//         </label>

//         {/* Submit and Cancel Buttons */}
//         <div className="flex-end mx-3 mb-5 gap-4">
//           <Link to="/" className="text-gray-500 text-sm">
//             Cancel
//           </Link>
//           <button
//             type="submit"
//             disabled={submitting}
//             className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
//           >
//             {submitting ? `${type}ing...` : type}
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default Form;

import { Link } from "react-router-dom";
import { useState } from "react";

const Form = ({ type, product, setProduct, submitting, handleSubmit }) => {
  const [imageInputs, setImageInputs] = useState(
    product.productImage || [{ URL: "", alt: "" }] // Initialize with an array of objects containing URL and alt
  );

  const handleAddImage = () => {
    setImageInputs([...imageInputs, { URL: "", alt: "" }]); // Add a new empty object with URL and alt
  };

  const handleRemoveImage = (index) => {
    const updatedImages = imageInputs.filter((_, i) => i !== index);
    setImageInputs(updatedImages);
    setProduct({ ...product, productImage: updatedImages });
  };

  const handleImageChange = (index, field, value) => {
    const updatedImages = [...imageInputs];
    updatedImages[index][field] = value; // Update either URL or alt
    setImageInputs(updatedImages);
    setProduct({ ...product, productImage: updatedImages });
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Product</span>
      </h1>
      <p className="desc text-left max-w-md">
         Turn your unused items into cash! {type} easily and quickly within IIIT Hyderabad. 🚀💰
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        {/* Product Name */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Name of the Product
          </span>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            placeholder="Write your product name here"
            required
            className="form_input"
          />
        </label>

        {/* Product Price */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Price
          </span>
          <input
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            placeholder="Write your product price here"
            required
            className="form_input "
          />
        </label>

        {/* Product Description */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Description
          </span>
          <textarea
            value={product.description.content}
            onChange={(e) =>
              setProduct({
                ...product,
                description: { content: e.target.value },
              })
            }
            placeholder="Write your product description here"
            required
            className="form_textarea"
          />
        </label>

        {/* Product Category */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Category{" "}
            <span className="font-normal">
              (example: clothing, grocery, etc.)
            </span>
          </span>
          <input
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            type="text"
            placeholder="Category"
            required
            className="form_input"
          />
        </label>

        {/* Dynamic Image Inputs */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Product Images
          </span>
          <div className="flex flex-col gap-3 mt-2">
            {imageInputs.map((image, index) => (
              <div key={index} className="flex flex-wrap gap-3">
                <input
                  type="text"
                  value={image.URL}
                  onChange={(e) =>
                    handleImageChange(index, "URL", e.target.value)
                  }
                  placeholder={`Image URL ${index + 1}`}
                  required
                  className="form_input flex-1"
                />
                <input
                  type="text"
                  value={image.alt}
                  onChange={(e) =>
                    handleImageChange(index, "alt", e.target.value)
                  }
                  placeholder={`Alt text for Image ${index + 1}`}
                  required
                  className="form_input flex-1"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="text-red-500 text-sm font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddImage}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md"
            >
              Add Image
            </button>
          </div>
        </label>

        {/* Submit and Cancel Buttons */}
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link to="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
