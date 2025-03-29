import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css'; // Import CSS for styling

function HomePage() {
  const [items, setItems] = useState([]);
  const [spotlight, setSpotlight] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/items/'); // Fetch items from the backend
        setItems(response.data); // Store all items
        if (response.data.length > 0) {
          const randomItem = response.data[Math.floor(Math.random() * response.data.length)];
          setSpotlight(randomItem); // Spotlight a random item
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="home-page">
      <h1 className="home-title">Welcome to Our Store</h1>
      {spotlight ? (
        <div className="spotlight">
          <h2>Spotlight Item</h2>
          <div className="spotlight-card">
            <img className="spotlight-image" src={spotlight.image_url} alt={spotlight.name} />
            <h3 className="spotlight-name">{spotlight.name}</h3>
            <p className="spotlight-description">{spotlight.description}</p> {/* Add description */}
            <p className="spotlight-price">Price: ${spotlight.price}</p>
            <Link to={`/items/${spotlight.id}`} className="spotlight-link">View Details</Link>
          </div>
        </div>
      ) : (
        <p>Loading spotlight item...</p>
      )}
    </div>
  );
}

export default HomePage;
