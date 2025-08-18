# import asyncio
# import websockets
# import json
# import random

# async def handler(websocket):
#     print("Frontend connected")
#     try:
#         while True:
#             # Fake sensor data
#             data = {
#                 "volt": round(random.uniform(4.5, 5.0), 2),
#                 "current": round(random.uniform(2.0, 3.5), 2),
#                 "IMU": [
#                     random.randint(-180, 180),
#                     random.randint(-180, 180),
#                     random.randint(-180, 180)
#                 ]
#             }
#             # Send as JSON string
#             await websocket.send(json.dumps(data))
#             await asyncio.sleep(1)  # send every second
#     except websockets.ConnectionClosed:
#         print("Frontend disconnected")

# async def main():
#     # WebSocket server runs on ws://127.0.0.1:8080/ws
#     async with websockets.serve(handler, "127.0.0.1", 8080, ping_interval=None):
#         print("Server running on ws://127.0.0.1:8080/ws")
#         await asyncio.Future()  # run forever

# if __name__ == "__main__":
#     asyncio.run(main())
