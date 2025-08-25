// import ProductCard from "./ProductCard";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const Profile = ({ name, desc, id, handleEdit, handleDelete }) => {
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/api/products/listProducts/${id}`)
//       .then((res) => {
//         console.log("products", res.data);
//         setProducts(res.data);
//       });
//   }, []);
//   return (
//     <section className="w-full">
//       <h1 className="head_text text-left">
//         <span className="blue_gradient">{name} Profile</span>
//       </h1>
//       <p className="desc text-left">{desc}</p>
//       {/* <div className='mt-10 prompt_layout'>
//         {data.map((post) => (
//           <ProductCard
//             key={post._id}
//             post={post}
//             handleEdit={() => handleEdit && handleEdit(post)}
//             handleDelete={() => handleDelete && handleDelete(post)}
//           />
//         ))}
//       </div> */}
//       {/* {JSON.stringify(id)}; */}

//       <section className="trending-section">
//         <h2 className="section-text">{name} Listed Products</h2>

//         <div className="flex flex-wrap gap-x-8 gap-y-16">
//           {products?.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))}
//         </div>
//       </section>
//     </section>
//   );
// };

// export default Profile;

import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { useUserState } from "../utils/UserState";
import axios from "axios";
import { Link } from "react-router-dom";

export const UserDetails = ({ user }) => {
  const [updateDetails, setUpdateDetails] = useState(false);
  const { loggedIn, ...dbUser } = user;
  const [updatedUser, setUpdatedUser] = useState(dbUser);
  const [loading, setLoading] = useState(false);
  const { registerUser, getUser } = useUserState();

  const currentUser = getUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        "http://localhost:3000/api/users/profile",
        updatedUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle successful response
      if (response.status === 200) {
        console.log("User updated successfully:", response.data);
        alert("Profile updated successfully!");
        setUpdateDetails(false);
        registerUser({ ...response.data.user, loggedIn: true });
        // Optionally update the state with new user details from response if necessary
        // setUpdatedUser(response.data);
      }
    } catch (error) {
      // Handle errors
      console.error("Error updating user:", error);
      alert("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile relative">
      {/* Edit Icon  */}
      {currentUser.id == user.id ? (
        <div
          className="edit-icon"
          onClick={() => setUpdateDetails(!updateDetails)}
        >
          <img
            title="Edit Details"
            src="/images/edit-details.webp"
            className="w-full h-full object-cover rounded-full border border-gray-300 shadow-md scale-150"
            alt="Edit"
          />
        </div>
      ) : (
        <></>
      )}

      {/* Profile Picture */}
      {!updateDetails ? (
        <div className="w-28 h-28">
          <img
            src={user.profileImage || "/icons/profile.webp"} // Default profile photo if not provided
            alt="User Profile"
            className="w-full h-full object-cover rounded-full border border-gray-300 shadow-md"
          />
        </div>
      ) : (
        <></>
      )}

      {/* User Info */}
      <div className="flex flex-col">
        {!updateDetails ? (
          <>
            <h2 className="text-2xl blue_gradient font-semibold text-gray-800">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Contact: {user.contactNumber}</p>
            <p className="text-gray-600">Age: {user.age}</p>
          </>
        ) : (
          <>
            <form
              className="mt-6 flex flex-row flex-center  gap-x-2"
              onSubmit={handleSubmit}
            >
              <div>
                <div className="relative">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={updatedUser.profileImage}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        profileImage: e.target.value,
                      })
                    }
                    className="peer h-10 w-full border-b-2  border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                    placeholder="First Name"
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Profile Image
                  </label>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-y-4">
                <div className="flex flex-row gap-x-4">
                  <div className="relative">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={updatedUser.firstName}
                      onChange={(e) =>
                        setUpdatedUser({
                          ...updatedUser,
                          firstName: e.target.value,
                        })
                      }
                      className="peer h-10 w-full border-b-2  border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                      placeholder="First Name"
                    />
                    <label
                      htmlFor="firstName"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      First Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={updatedUser.lastName}
                      onChange={(e) =>
                        setUpdatedUser({
                          ...updatedUser,
                          lastName: e.target.value,
                        })
                      }
                      className="peer h-10 w-full  border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                      placeholder="First Name"
                    />
                    <label
                      htmlFor="lastName"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Last Name
                    </label>
                  </div>
                </div>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={updatedUser.email}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        email: e.target.value,
                      })
                    }
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                    placeholder="john.doe@iiit.ac.in"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email(IIIT Email only)
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="text"
                    value={updatedUser.contactNumber}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        contactNumber: e.target.value,
                      })
                    }
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                    placeholder="1234567890"
                  />
                  <label
                    htmlFor="contactNumber"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Contact Number
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="age"
                    name="age"
                    type="number"
                    value={updatedUser.age}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        age: e.target.value,
                      })
                    }
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                    placeholder="-1"
                  />
                  <label
                    htmlFor="age"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Age
                  </label>
                </div>
                <button
                  type="submit"
                  className="mt-10 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export const ProductListings = ({
  listedProducts,
  soldProducts,
  orderedProducts,
}) => {
  const [activeTab, setActiveTab] = useState("listed");
  console.log(
    "listedProducts",
    listedProducts,
    "soldProducts",
    soldProducts,
    "OrderedProducts",
    orderedProducts
  );

  // useEffect(() => {
  // // Fetch listed products
  // axios.get(`http://localhost:3000/api/products/listProducts/${userId}`)
  //   .then((res) => {
  //     setListedProducts(res.data);
  //   })
  //   .catch((err) => console.error("Error fetching listed products:", err));

  // // Fetch sold products
  // axios.get(`http://localhost:3000/api/products/soldProducts/${userId}`)
  //   .then((res) => {
  //     setSoldProducts(res.data);
  //   })
  //   .catch((err) => console.error("Error fetching sold products:", err));

  // // Fetch ordered products
  // axios.get(`http://localhost:3000/api/products/orderedProducts/${userId}`)
  //   .then((res) => {
  //     setOrderedProducts(res.data);
  //   })
  //   .catch((err) => console.error("Error fetching ordered products:", err));
  // }, []);

  const renderProductList = (products) => (
    <div className="flex flex-wrap gap-x-8 gap-y-16">
      {products?.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p className="text-gray-500 w-full text-center">No products found</p>
      )}
    </div>
  );

  return (
    <div className="relative mt-10">
      {/* Tabs */}
      <div className="flex border-b mb-6">
        {[
          { key: "listed", label: "Listed Products" },
          { key: "sold", label: "Sold Products" },
          { key: "ordered", label: "Ordered Products" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 ${
              activeTab === tab.key
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === "sold" && (
        <Link
          to="/deliveries"
          className="absolute top-0 right-0 mt-2 mr-2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg"
        >
          Deliveries
        </Link>
      )}
      {activeTab === "ordered" && (
        <Link
          to="/orders"
          className="absolute top-0 right-0 mt-2 mr-2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg"
        >
          Active Orders
        </Link>
      )}

      {/* Product Lists */}
      {activeTab === "listed" && renderProductList(listedProducts)}
      {activeTab === "sold" && renderProductList(soldProducts)}
      {activeTab === "ordered" && renderProductList(orderedProducts)}
    </div>
  );
};

const Profile = ({ name, desc, id, handleEdit, handleDelete }) => {
  const [listedProducts, setListedProducts] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const { getUser } = useUserState();
  const user = getUser();

  // Fetch user details and products
  useEffect(() => {
    // Fetch user products
    console.log(user);
    axios
      .get(`http://localhost:3000/api/products/listProducts/${id}`)
      .then((res) => {
        console.log("products", res.data);
        setListedProducts(res.data.listedProducts);
        setSoldProducts(res.data.soldItems);
        setOrderedProducts(res.data.orderedItems);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [id]);

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="green_gradient">
          {user.firstName} {user.lastName} Profile
        </span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {/* User Details */}
      {user && <UserDetails user={user} />}

      {/* User Products */}
      {/* <section className="trending-section mt-10">
          <h2 className="section-text">{name} Listed Products</h2>
          <div className="flex flex-wrap gap-x-8 gap-y-16">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section> */}
      <ProductListings
        listedProducts={listedProducts}
        soldProducts={soldProducts}
        orderedProducts={orderedProducts}
      />
    </section>
  );
};

export default Profile;
