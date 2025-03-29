import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import './ItemDetailPage.css'; // Import CSS for styling

function ItemDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/items/${id}`);
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItem();
  }, [id]);

  if (!item) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="item-detail-page">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button> {/* Back button */}
      <div className="item-card">
        <img className="item-image" src={item.image_url} alt={item.name} />
        <div className="item-info">
          <h1 className="item-title">{item.name}</h1>
          <p className="item-description">{item.description}</p>
          <p className="item-price">Price: ${item.price}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailPage;
