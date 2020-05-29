import React, { useEffect } from "react";
import Loader from "react-loader-spinner";
const LoaderSection = () => {
  useEffect(() => {
    //selects loader to toggle hidden class
    const loader = document.querySelector(".loaderWrapper");
    //select HTML body to toggle Y-Axis Overflow
    const HTMLbody = document.querySelector("html");
    //toggles Y-Axis Overflow
    HTMLbody.style.overflowY = "hidden";
    //declares 1 second timer
    const timer = setTimeout(() => {
      loader.classList.toggle("hidden");
      HTMLbody.style.overflowY = "visible";
    }, 1500);

    // cleaup function - removes timer reference from memory
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div id="loader" className="loaderWrapper">
      <Loader
        type="Oval"
        color="#FF00F9"
        height={100}
        width={100}
        // timeout={3000} //3 secs
      />
      <div className="backdrop"></div>
    </div>
  );
};

export default LoaderSection;
