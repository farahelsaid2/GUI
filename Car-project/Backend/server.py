# handles the websockets connections (just listen and function away from content of message)
import asyncio
from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from arduino import ArduinoBridge
from contextlib import asynccontextmanager
from fastapi import WebSocket, WebSocketDisconnect
import websockets





async def main():
    bridge = ArduinoBridge(port="COM5", baudrate=9600)
    await bridge.connect_serial()

    async with websockets.serve(bridge.handle_websocket, "127.0.0.1", 8080):
        print("🚀 WebSocket server started on ws://127.0.0.1:8080")
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())

# bridge.active = False

# @asynccontextmanager
# async def lifespan(app):
#     print("Server starting...")
#     yield
#     print("Server shutting down...")

# app = FastAPI(lifespan=lifespan)
# origins = [
#     "http://localhost:5173",
#     "http://127.0.0.1:5173", 
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,      
#     allow_credentials=True,
#     allow_methods=["*"],         
#     allow_headers=["*"],         
# )

# @app.get('/start')
# async def start_communication():
#     if bridge.active:
#         return {"message": "Communication already started"}
#     bridge.active = True
#     try:
#        await bridge.connect_serial()
#        return {"message": "Communication started"}
#     except Exception:
#         return{'Arduino not connected'}

    

# @app.get('/end')
# async def end_communication():
#     if not bridge.active:
#         return {"message": "Communication already stopped"}
#     bridge.active = False
#     for client in list(bridge.clients):
#         await client.close()
#     bridge.clients.clear()
#     return {"message": "Communication stopped successfully"}

# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()
#     if not bridge.active:
#         await websocket.send_text("Server is not active. Please start communication first.")
#         await websocket.close()
#         return
#     try:
#         await bridge.handle_websocket(websocket)
#     except WebSocketDisconnect:
#         print("Client disconnected")




# if __name__ == "__main__":
#     uvicorn.run(app, host="127.0.0.1", port=8080) 

 
# from fastapi import FastAPI, WebSocket
# import uvicorn

# app = FastAPI()

# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     # Accept connection
#     await websocket.accept()
#     try:
#         while True:
#             # Receive message from client
#             data = await websocket.receive_text()
#             print("Received:", data)

#             # Send message back to client
#             await websocket.send_text(f"You said: {data}")
#     except Exception as e:
#         print("Connection closed:", e)

# if __name__ == "__main__":
#  uvicorn.run(app, host="127.0.0.1", port=8080) 
