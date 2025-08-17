# handles the websockets connections (just listen and function away from content of message)
import asyncio
import websockets
from clients import handle_clients
from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",  
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      
    allow_credentials=True,
    allow_methods=["*"],         
    allow_headers=["*"],         
)

ws_server = None

#Start websockets server
async def start_ws():
    global ws_server
    ws_server = await websockets.serve(handle_clients, '127.0.0.1',8080)
    print("Server is running")



@app.get('/start')
async def start_server():
    asyncio.create_task(start_ws()) 
    return {"message": "Server is starting....."}

@app.get('/end')
async def end_server():
    global ws_server
    if ws_server:
        ws_server.close()          
        await ws_server.wait_closed()  
        ws_server = None
        return {"message": "Server is shut down"}
    else:
        return {"message": "Server wasn't running"}



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

 
