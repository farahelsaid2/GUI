import asyncio  
import websockets 
import serial_asyncio
import json

class ArduinoBridge:
    def __init__(self, port, baudrate):  
        self.port = port
        self.baudrate = baudrate
        self.read = None
        self.write = None  
        self.clients = set ()
        self.tasks = set()
        self.connected = True
        self.active = True

    async def connect_serial(self):
        try:
            self.read, self.write = await serial_asyncio.open_serial_connection(
                url=self.port, baudrate=self.baudrate
            )
            self.connected = True
            print(f"Connected to Arduino on {self.port} at {self.baudrate} baud")

        except Exception as e:
            self.connected = False
            print(f"Arduino not connected: {e}")
        
    async def handle_websocket(self, websocket):
        self.clients.add(websocket)
        if not self.connected:
           await websocket.send('Arduino not connected')
           return

        print("Frontend connected to WebSocket")
        await self.start_bridge(websocket)

        try:
          await websocket.wait_closed()
        finally:
          self.clients.remove(websocket)
          print("Frontend disconnected")


    async def arduino_to_frontend(self, websocket):
        try:
          while self.active:
            line = await self.read.readline()
            if line:
                msg = line.decode().strip()  
                try:
                    _ = json.loads(msg)
                except:
                    print("Invalid JSON:", msg)
                    continue
                await websocket.send(msg)
        except asyncio.CancelledError:
          pass
 

    async def frontend_to_arduino(self, websocket):
        async for command in websocket:
            if not self.active:
                break  
            print("the command is:", command)
            self.write.write((command + "\n").encode())
            await self.write.drain()

    async def start_bridge(self, websocket):
        task = asyncio.gather(
            self.arduino_to_frontend(websocket),
            self.frontend_to_arduino(websocket)
        )
        self.tasks.add(task)

    async def stop_all(self):
        self.active = False
        for task in list(self.tasks):
            task.cancel()
        for client in list(self.clients):
            await client.close()
        self.tasks.clear()
        self.clients.clear()