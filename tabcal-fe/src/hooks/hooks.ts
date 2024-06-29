import { useEffect, useState } from "react"

const useDevice = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  // const [device, setDevice]  = useState<string>("mobile")

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      // if (window.innerWidth < 480) {
      //   setDevice("mobile")
      // } else if (window.innerWidth < 768) {
      //   setDevice("tablet")
      // } else {
      //   setDevice("desktop")
      // }
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // return device;
  return screenSize
};

export default useDevice;