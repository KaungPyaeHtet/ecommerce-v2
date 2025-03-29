import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`/items/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching item:', error);
        setMessage('Failed to load item details.');
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/items/${id}`, formData);
      if (response.status === 200) {
        setMessage('Item updated successfully!');
        navigate('/items');
      } else {
        setMessage('Failed to update item.');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      setMessage('Error updating item.');
    }
  };

  return (
    <div className="update-item-page">
      <h1 className="update-title">Update Item</h1>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="update-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-textarea"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-input"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image_url">Image URL</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            className="form-input"
            value={formData.image_url}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Update Item</button>
      </form>
    </div>
  );
}

export default UpdateItemPage;
