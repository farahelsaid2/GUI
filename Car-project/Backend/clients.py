# clients.py
async def handle_clients(websocket, path):
    # your code to handle incoming messages
    async for message in websocket:
        print("Received:", message)
        await websocket.send(f"Echo: {message}")
