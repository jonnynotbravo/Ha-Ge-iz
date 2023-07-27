import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import Footer from "./Footer";
const Admin = ({ setLoggedIn }) => {
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // If the user is not authenticated, update the 'loggedIn' state to false
        setLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, setLoggedIn]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setLoggedIn(false);
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <div className="admin-container">
      <button onClick={handleLogout}>Logout</button>
      <Footer />
    </div>
  );
};

export default Admin;
