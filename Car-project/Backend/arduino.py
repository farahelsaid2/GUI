import asyncio  
import websockets 
import serial_asyncio


class ArduinoBridge:
    def __init__(self, port="COM3", baudrate=9600):  
        self.port = port
        self.baudrate = baudrate
        self.read = None
        self.write = None

    async def connect_serial(self):

        self.read, self.write = await serial_asyncio.open_serial_connection(
            url=self.port, baudrate=self.baudrate
        )
        print(f" Connected to Arduino on {self.port} at {self.baudrate} baud")

    async def handle_websocket(self, websocket):
        
        async def arduino_to_frontend():
            while True:
                line = await self.read.readline()
                if line:
                    msg = line.decode().strip()
                    print("the msg is:", msg)
                    await websocket.send(msg)

        async def frontend_to_arduino():
            async for command in websocket:
                print("the command is:", command)
                self.write.write((command + "\n").encode())
                await self.write.drain()

        await asyncio.gather(
            arduino_to_frontend(),
            frontend_to_arduino()
        )

    async def start_server(self):
    
        async with websockets.serve(self.handle_websocket, "localhost", 8080):
            print(" WebSocket server running at ws://localhost:8080")
            await asyncio.Future()  


async def main():
    bridge = ArduinoBridge("COM3")  
    await bridge.connect_serial()
    await bridge.start_server()

if __name__ == "__main__":
    asyncio.run(main())

        
   