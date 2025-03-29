from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# SQLite3 database setup
DATABASE = "ecommerce.db"

def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price REAL NOT NULL,
        image_url TEXT NOT NULL
    )
    """)
    conn.commit()
    conn.close()

init_db()

# Pydantic model for item
class Item(BaseModel):
    name: str
    description: str
    price: float
    image_url: str

# API Endpoints

@app.post("/items/", response_model=dict)
def create_item(item: Item):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO items (name, description, price, image_url)
    VALUES (?, ?, ?, ?)
    """, (item.name, item.description, item.price, item.image_url))
    conn.commit()
    item_id = cursor.lastrowid
    conn.close()
    return {"id": item_id, "message": "Item created successfully"}

@app.get("/items/", response_model=list)
def get_items():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM items")
    items = cursor.fetchall()
    conn.close()
    return [{"id": row[0], "name": row[1], "description": row[2], "price": row[3], "image_url": row[4]} for row in items]

@app.get("/items/{item_id}", response_model=dict)
def get_item(item_id: int):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM items WHERE id = ?", (item_id,))
    item = cursor.fetchone()
    conn.close()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"id": item[0], "name": item[1], "description": item[2], "price": item[3], "image_url": item[4]}

@app.put("/items/{item_id}", response_model=dict)
def update_item(item_id: int, item: Item):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
    UPDATE items
    SET name = ?, description = ?, price = ?, image_url = ?
    WHERE id = ?
    """, (item.name, item.description, item.price, item.image_url, item_id))
    conn.commit()
    conn.close()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item updated successfully"}

@app.delete("/items/{item_id}", response_model=dict)
def delete_item(item_id: int):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM items WHERE id = ?", (item_id,))
    conn.commit()
    conn.close()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item deleted successfully"}

@app.get("/api/test")
def test_endpoint():
    return {"message": "Hello from FastAPI"}