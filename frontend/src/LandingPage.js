// LandingPage.js
import React from "react";

const LandingPage = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-4">Welcome to Virtual Vogue</h1>
      <p className="lead">
        Your personal outfit manager. Create and save outfits with ease.
      </p>
      <a href="/login" className="btn btn-primary">
        Log In
      </a>
    </div>
  );
};

export default LandingPage;
