// src/components/Properties/PropertyList.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProperties } from '../../redux/actions/propertyActions';

const PropertyList = () => {
  const dispatch = useDispatch();
  const properties = useSelector(state => state.properties.properties);

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  return (
    <div className="property-list">
      {properties.map(property => (
        <div key={property._id} className="property-card">
          <h2>{property.title}</h2>
          <p>{property.description}</p>
          <p>{property.price}</p>
          <p>{property.location}</p>
          <div className="image-container">
            {/* Map over property.images to render each image */}
            {property.images.map((image, index) => (
              <img key={index} src={`/uploads/${image}`} alt={`Image ${index}`} className="property-image" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
