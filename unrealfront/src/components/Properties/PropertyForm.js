import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProperty } from '../../redux/actions/propertyActions';

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    amenities: '',
    images: []
  });

  const { title, description, price, location, amenities, images } = formData;

  const dispatch = useDispatch();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onFileChange = e => setFormData({ ...formData, images: e.target.files });

  const onSubmit = e => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('price', price);
    data.append('location', location);
    data.append('amenities', amenities);

    for (let i = 0; i < images.length; i++) {
      data.append('images', images[i]);
    }

    dispatch(addProperty(data));
    alert("Data Uploaded Successfully")
    setFormData({
      title: '',
      description: '',
      price: '',
      location: '',
      amenities: '',
      images: []
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Title</label>
        <input type="text" name="title" value={title} onChange={onChange} />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={description} onChange={onChange}></textarea>
      </div>
      <div>
        <label>Price</label>
        <input type="number" name="price" value={price} onChange={onChange} />
      </div>
      <div>
        <label>Location</label>
        <input type="text" name="location" value={location} onChange={onChange} />
      </div>
      <div>
        <label>Amenities</label>
        <input type="text" name="amenities" value={amenities} onChange={onChange} />
      </div>
      <div>
        <label>Images</label>
        <input type="file" name="images" multiple onChange={onFileChange} />
      </div>
      <button type="submit">Add Property</button>
    </form>
  );
};

export default PropertyForm;
