import React, { useState } from "react";

const Addproduct = () => {
  const [loading, setLoading] = useState(false);




  if (loading) {
    <p>Loading...</p>;
  } else {

    return (
      <div>
        <p>Add product</p>
      </div>
    );
  }
};

export default Addproduct;
