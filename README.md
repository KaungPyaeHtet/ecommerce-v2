# Ecommerce V2

Ecommerce V2 is a full-stack web application built with a React frontend and a FastAPI backend. It provides a simple platform for managing and displaying items in an ecommerce store.

## Features

- **Frontend**: Built with React, providing a user-friendly interface.
- **Backend**: Powered by FastAPI, offering RESTful APIs for CRUD operations.
- **Database**: SQLite3 for lightweight and easy-to-use data storage.
- **CORS Support**: Configured to allow communication between the frontend and backend.

## Backend Setup

1. **Install Dependencies**:
   Ensure you have Python installed, then install the required packages:

   ```bash
   pip install fastapi uvicorn pydantic
   ```

2. **Run the Backend**:
   Start the FastAPI server:

   ```bash
   uvicorn main:app --reload
   ```

3. **API Endpoints**:
   - `POST /items/`: Create a new item.
   - `GET /items/`: Retrieve all items.
   - `GET /items/{item_id}`: Retrieve a specific item by ID.
   - `PUT /items/{item_id}`: Update an item by ID.
   - `DELETE /items/{item_id}`: Delete an item by ID.
   - `GET /api/test`: Test endpoint.

## Frontend Setup

1. **Install Dependencies**:
   Navigate to the frontend directory and install dependencies:

   ```bash
   npm install
   ```

2. **Run the Frontend**:
   Start the React development server:

   ```bash
   npm run dev
   ```

3. **Access the Application**:
   Open your browser and navigate to `http://localhost:5173`.

## Database

The application uses an SQLite3 database (`ecommerce.db`) to store item data. The database is initialized automatically when the backend starts.

## Project Structure

```
ecommerce_v2/
├── backend_v2/
│   ├── main.py          # FastAPI backend
│   └── ecommerce.db     # SQLite3 database
├── frontend_v2/         # React frontend
└── README.md            # Project documentation
```

## License

This project is licensed under the MIT License. See the full license text below:

```
MIT License

Copyright (c) 2025 Kaung Pyae Htet

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
