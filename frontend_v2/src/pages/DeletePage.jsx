import React, { useState } from 'react';
import axios from 'axios';
import './DeletePage.css';

function DeletePage() {
  const [itemId, setItemId] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/items/${itemId}`);
      if (response.status === 200) {
        setMessage('Item deleted successfully!');
      } else {
        setMessage('Failed to delete item.');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      setMessage('Error deleting item.');
    }
  };

  return (
    <div className="delete-page">
      <h1>Delete Item</h1>
      <input
        type="text"
        placeholder="Enter Item ID"
        value={itemId}
        onChange={(e) => setItemId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DeletePage;
