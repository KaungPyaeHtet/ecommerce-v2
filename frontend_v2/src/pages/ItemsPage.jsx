import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ItemsPage.css'; // Import a CSS file for styling

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [hoveredImage, setHoveredImage] = useState(null); // State for hover preview
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 }); // State for mouse position

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/items/'); // Fetch items from the backend
        setItems(response.data); // Store all items
      } catch (error) {
        console.error('Error fetching items:', error);
        setError('Failed to fetch data from the server.');
      }
    };
    fetchItems();
  }, []);

  const handleMouseMove = (e) => {
    setHoverPosition({ x: e.pageX, y: e.pageY });
  };

  return (
    <div className="items-page">
      {hoveredImage && (
        <div
          className="hover-preview"
          style={{ top: hoverPosition.y + 10, left: hoverPosition.x + 10 }} // Position near the cursor
        >
          <img src={hoveredImage.image_url} alt="Preview" />
          <p className="hover-preview-name">{hoveredImage.name}</p> {/* Add name below the image */}
        </div>
      )}
      <h1 className="items-title">Items</h1>
      {error && <p className="error-message">{error}</p>}
      {items.length > 0 ? (
        <ul className="items-list">
          {items.map((item) => (
            <li
              key={item.id}
              className="item-card"
              onMouseEnter={() => setHoveredImage({ image_url: item.image_url, name: item.name })}
              onMouseLeave={() => setHoveredImage(null)}
              onMouseMove={handleMouseMove}
            >
              <img className="item-preview" src={item.image_url} alt={item.name} /> {/* Add image */}
              <h3 className="item-name">{item.name}</h3>
              <p className="item-description">{item.description}</p> {/* Add description */}
              <p className="item-price">Price: ${item.price}</p>
              <Link to={`/items/${item.id}`} className="item-link">View Details</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-items-message">No items found or failed to load items.</p>
      )}
    </div>
  );
}

export default ItemsPage;
