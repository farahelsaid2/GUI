# handles the websockets connections (just listen and function away from content of message)
import asyncio
from arduino import ArduinoBridge
import websockets

    
async def main():
    
    bridge = ArduinoBridge(port="COM4", baudrate=9600)
    await bridge.connect_serial()
    try:
      bridge_server = await websockets.serve(bridge.handle_websocket, "127.0.0.1", 8080)
      print("WebSocket server started on ws://127.0.0.1:8080")
    except Exception as e :
       print (f"Not connected: {e}")
    await asyncio.Future()

    
    


if __name__ == "__main__":
    asyncio.run(main())

