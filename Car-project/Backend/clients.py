# import asyncio
# import websockets

# async def fake_arduino():
#     uri = "ws://127.0.0.1:8080/ws"   # change port if your server.py uses another one
#     async with websockets.connect(uri) as ws:
#         print("✅ Fake Arduino connected to backend!")

#         try:
#             while True:
#                 # Wait for a command from backend/frontend
#                 msg = await ws.recv()
#                 print(f"📩 Received from server: {msg}")

#                 # Handle fake responses
#                 if msg == "M":
#                     response = "✅ Manual mode ON"
#                 elif msg == "E":
#                     response = "❌ Manual mode OFF"
#                 elif msg == "F":
#                     response = "🚗 Moving Forward"
#                 elif msg == "B":
#                     response = "🚗 Moving Backward"
#                 elif msg == "L":
#                     response = "↪️ Turning Left"
#                 elif msg == "R":
#                     response = "↩️ Turning Right"
#                 else:
#                     response = f"🤖 Unknown command: {msg}"

#                 # Send the response back to server
#                 await ws.send(response)
#                 print(f"📤 Sent back to server: {response}")

#         except websockets.exceptions.ConnectionClosedError:
#             print("⚠️ Connection closed by server")

# if __name__ == "__main__":
#     asyncio.run(fake_arduino())
