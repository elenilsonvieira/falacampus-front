import React, { useState, useEffect } from 'react';
import './Loader.css';

const Loader = ({ request }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await request();
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
