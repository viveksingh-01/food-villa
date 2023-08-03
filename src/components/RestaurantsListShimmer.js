import React from 'react';

export default function RestaurantsListShimmer() {
  return (
    <div className="bg-gray-50 flex flex-wrap justify-evenly">
      {Array(10)
        .fill()
        .map((i, index) => {
          return <div key={index} className="w-80 h-96 card m-4 mb-12"></div>;
        })}
    </div>
  );
}
