import React from 'react';

export default function RestaurantsListShimmer() {
  return (
    <div className="restaurant-list">
      {Array(10)
        .fill()
        .map((i, index) => {
          return <div key={index} className="card-skeleton"></div>;
        })}
    </div>
  );
}
