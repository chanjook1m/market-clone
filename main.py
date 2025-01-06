from fastapi import FastAPI, UploadFile, Form, Response
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from typing import Annotated
import sqlite3 

con = sqlite3.connect('db.db', check_same_thread=False)
cur = con.cursor()

app = FastAPI()

@app.get('/items')
async def get_items():
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute('SELECT * FROM items')
    items = cur.fetchall()
    return JSONResponse(jsonable_encoder(dict(item) for item in items))

@app.post("/items")
async def create_item(image: UploadFile, title: Annotated[str,Form()], price: Annotated[int, Form()], description: Annotated[str,Form()], place: Annotated[str,Form()], insertAt: Annotated[str, Form()]):
    image_bytes = await image.read()
    cur.execute(f"""
    INSERT INTO items (title,image, price, description, place, insertAt) VALUES ( '{title}', '{image_bytes.hex()}',{price}, '{description}', '{place}', {insertAt})
                """)
    
    con.commit()
    return '200'

@app.get('/images/{image_id}')
async def get_image(image_id: int):
    cur = con.cursor()
    cur.execute(f'SELECT image FROM items WHERE id = {image_id}')
    image_bytes = cur.fetchone()[0]
    return Response(content=bytes.fromhex(image_bytes) )
    

app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
