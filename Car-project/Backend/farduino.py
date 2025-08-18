# import asyncio  
# import websockets 
# import serial_asyncio


# class ArduinoBridge:
#     def __init__(self, port, baudrate):  
#         self.port = port
#         self.baudrate = baudrate
#         self.read = None
#         self.write = None
#         self.clients = [] 
#         self.active = False
#         self.tasks = set()
#         self.connected = True   

#     async def connect_serial(self):
        
#         print("⚠️ Skipping real Arduino connection (using fake client)")
#         self.connected = True
        
#     async def handle_websocket(self, websocket):
#         self.clients.append(websocket)   

#         if not self.connected:
#             await websocket.send('Arduino not connected')
#             return

#         async def arduino_to_frontend():
#             while self.active:
#                 try:
                    
#                     await asyncio.sleep(2)
#                     msg = "FAKE_SENSOR:123"
#                     print("the msg is:", msg)
#                     await websocket.send(msg)
#                 except asyncio.TimeoutError:
#                     continue
