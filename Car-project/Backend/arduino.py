import asyncio  
import websockets 
import serial_asyncio


class ArduinoBridge:
    def __init__(self, port, baudrate):  
        self.port = port
        self.baudrate = baudrate
        self.read = None
        self.write = None  
        self.clients = [] 
        # self.active = True
        self.tasks = set ()
        self.connected = True

    async def connect_serial(self):
        try:

          self.read, self.write = await serial_asyncio.open_serial_connection(
             url=self.port, baudrate=self.baudrate
        )
          self.connected= True
          print(f" Connected to Arduino on {self.port} at {self.baudrate} baud")

        except Exception as e:
          self.connected = False
          print(f"Arduino not connected: {e}")
        
    async def handle_websocket(self, websocket):
        self.clients.add(websocket)
        if not self.connected:
          await websocket.send ('Arduino not connected')
        return

    async def arduino_to_frontend():
        try:
            line = await self.read.readline()
            if line and self.active:
                    msg = line.decode().strip()
                    print("themsg is:", msg)
                    await websocket.send(msg)
        except asyncio.TimeoutError:
    

    async def frontend_to_arduino():
        async for command in websocket:
            if not self.active:
                    break  
            print("the command is:", command)
            self.write.write((command + "\n").encode())
            await self.write.drain()

        task = asyncio.create_task(asyncio.gather(
              arduino_to_frontend(),
              frontend_to_arduino()
        ))

        self.tasks.add(task)

    async def stop_all(self):
            self.active= False
            for task in list(self.tasks):
                task.cancel()
            for client in list(self.clients):
                await client.close()
    self.tasks.clear()
    self.clients.clear()