import React, { useState, useEffect } from 'react';
import './Loader.css';
const test = async () => {}

const Loader = ({ request }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await test();
      setIsLoading(false);
    }
    fetchData();
  }, [request]);

  return (
    <>
      {isLoading && <div className="loader-container"><div className="loader"></div></div>}
    </>
  );
}

export default Loader;
