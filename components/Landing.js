import "../flow/config";
import { useAuth } from "../contexts/AuthContext";
import Profile from "./Profile";
import { useState, useEffect } from "react";
import HomePage from "./HomePage.js";
import Link from "next/link";

function Landing() {
  const [currentPage, setCurrentPage] = useState("LogOut");
  const { currentUser, profileExists, logOut, logIn, signUp, createProfile } =
    useAuth();

  const AuthedState = () => {
    useEffect(function () {
      setCurrentPage((currentValue) => "Home");
    }, []);
    if (currentPage === "Home") {
      return (
        <div>
          <HomePage />
        </div>
      );
    } else {
      return (
        <>
          <div>{profileExists && <Profile />}</div>
          <div>
            <div>Logged in as: {currentUser?.addr ?? "No Address"}</div>
            <h2>Controls</h2>
            <button onClick={createProfile}>Create Profile</button>
          </div>
        </>
      );
    }
  };

  const UnauthenticatedState = () => {
    return (
      <div className="landing-bottons">
        <button onClick={logIn}>Log In</button>
        <button onClick={signUp}>Sign Up</button>
      </div>
    );
  };

  const Messages = () => {
    if (!currentUser?.loggedIn) {
      return "Rewarding the Hardworkers";
    }
    // else {
    //   if (profileExists) {
    //     return "Your Profile lives on the blockchain.";
    //   } else {
    //     return "Create a profile on the blockchain.";
    //   }
    // }
  };

  return (
    <div className="landing-container">
      {currentPage !== "LogOut" ? (
        <nav className="nav">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
      ) : (
        ""
      )}
      {currentPage !== "LogOut" ? (
        <button
          className="logout-button"
          onClick={() => {
            logOut();
            setCurrentPage("LogOut");
          }}
        >
          Log Out
        </button>
      ) : (
        ""
      )}
      <div className="landing">
        <div className="landing-text">
          {currentPage !== "LogOut" ? "" : <h1>Daily Dose</h1>}
          <p>
            <Messages />
          </p>
        </div>
        <div>
          {currentUser?.loggedIn ? <AuthedState /> : <UnauthenticatedState />}
        </div>
      </div>
    </div>
  );
}

export default Landing;
