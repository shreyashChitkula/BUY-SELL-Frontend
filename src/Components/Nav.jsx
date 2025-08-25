// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { useUserState } from "../utils/UserState";

// const Nav = () => {
//   const navigate = useNavigate();
//   const { logoutUser, isLoggedIn, getUser } = useUserState();
//   const user = getUser();
//   const [toggleDropdown, setToggleDropdown] = useState(false);
//   const signOutHandler = () => {
//     logoutUser();
//     navigate("/");
//   };

//   return (
//     <nav className="flex-between w-full mb-16 pt-3">
//       <Link to="/" className="flex gap-2 flex-center ">
//         <img
//           src="/icons/logo.webp"
//           alt="logo"
//           width="50"
//           height="50"
//           className="object-contain rounded-full"
//         />

//         <p className="logo_text"> Buy & Sell</p>
//       </Link>
//       {/* Desktop Navigation */}
//       <div className="sm:flex hidden">
//         {isLoggedIn() ? (
//           <div className="flex gap-3 md:gap-5">
//             <Link to="/create-sell" className="black_btn">
//               Sell
//             </Link>

//             <button
//               type="button"
//               className="outline_btn"
//               onClick={signOutHandler}
//             >
//               Sign Out
//             </button>

//             <Link to="/profile">
//               <img
//                 // src={session?.user.image}
//                 src={user.profileImage || "/icons/profile.webp"}
//                 width={40}
//                 height={40}
//                 className="rounded-full"
//                 alt="profile"
//               />
//             </Link>
//           </div>
//         ) : (
//           <>
//             {
//               <div className="flex gap-3 md:gap-5">
//                 <button
//                   type="button"
//                   // key={provider.name}
//                   onClick={() => {
//                     navigate("/signIn");
//                   }}
//                   className="black_btn"
//                 >
//                   Sign in
//                 </button>

//                 <button
//                   type="button"
//                   // key={provider.name}
//                   onClick={() => {
//                     navigate("/signUp");
//                   }}
//                   className="outline_btn"
//                 >
//                   Sign Up
//                 </button>
//               </div>
//             }
//           </>
//         )}
//       </div>
//       {/* Mobile Navigation */}
//       <div className="sm:hidden flex relative">
//         {isLoggedIn() ? (
//           <div className="flex">
//             <img
//               src={user.profileImage || "/icons/profile.webp"}
//               width="37"
//               height="37"
//               className="rounded-full"
//               alt="profile"
//               onClick={() => setToggleDropdown(!toggleDropdown)}
//             />

//             {toggleDropdown && (
//               <div className="dropdown">
//                 <Link
//                   to="/profile"
//                   className="dropdown_link"
//                   onClick={() => setToggleDropdown(false)}
//                 >
//                   My Profile
//                 </Link>
//                 <Link
//                   to="/create-sell"
//                   className="dropdown_link"
//                   onClick={() => setToggleDropdown(false)}
//                 >
//                   Sell
//                 </Link>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setToggleDropdown(false);
//                     signOutHandler();
//                     // signOut();
//                   }}
//                   className="mt-5 w-full black_btn"
//                 >
//                   Sign Out
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <>
//             {
//               <div className="flex">
//                 <img
//                   src="/images/Hamburger.webp"
//                   width="37"
//                   height="37"
//                   className="rounded-full"
//                   alt="profile"
//                   onClick={() => setToggleDropdown(!toggleDropdown)}
//                 />

//                 {toggleDropdown && (
//                   <div className="dropdown">
//                     <button
//                       type="button"
//                       // key={provider.name}
//                       onClick={() => {
//                         navigate("/signIn");
//                       }}
//                       className="black_btn"
//                     >
//                       Sign in
//                     </button>

//                     <button
//                       type="button"
//                       // key={provider.name}
//                       onClick={() => {
//                         navigate("/signUp");
//                       }}
//                       className="outline_btn"
//                     >
//                       Sign Up
//                     </button>
//                   </div>
//                 )}
//               </div>
//             }
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Nav;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUserState } from "../utils/UserState";

const Nav = () => {
  const navigate = useNavigate();
  const { logoutUser, isLoggedIn, getUser } = useUserState();
  const user = getUser();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const signOutHandler = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link to="/" className="flex gap-2 flex-center ">
        <img
          src="/icons/logo.webp"
          alt="logo"
          width="50"
          height="50"
          className="object-contain rounded-full"
        />

        <p className="logo_text"> Buy & Sell</p>
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {isLoggedIn() ? (
          <div className="flex gap-3 md:gap-5">
            <Link to="/create-sell" className="black_btn">
              Sell
            </Link>

            <Link to="/cart" className="black_btn">
              My Cart
            </Link>

            <button
              type="button"
              className="outline_btn"
              onClick={signOutHandler}
            >
              Sign Out
            </button>

            <Link to="/profile">
              <img
                src={user.profileImage || "/icons/profile.webp"}
                width={40}
                height={40}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {
              <div className="flex gap-3 md:gap-5">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/signIn");
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigate("/signUp");
                  }}
                  className="outline_btn"
                >
                  Sign Up
                </button>
              </div>
            }
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {isLoggedIn() ? (
          <div className="flex">
            <img
              src={user.profileImage || "/icons/profile.webp"}
              width="37"
              height="37"
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  to="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/create-sell"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Sell
                </Link>
                <Link
                  to="/cart"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Cart
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOutHandler();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {
              <div className="flex">
                <img
                  src="/images/Hamburger.webp"
                  width="37"
                  height="37"
                  className="rounded-full"
                  alt="profile"
                  onClick={() => setToggleDropdown(!toggleDropdown)}
                />

                {toggleDropdown && (
                  <div className="dropdown">
                    <button
                      type="button"
                      onClick={() => {
                        navigate("/signIn");
                      }}
                      className="black_btn"
                    >
                      Sign in
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        navigate("/signUp");
                      }}
                      className="outline_btn"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            }
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
