import cv2
from fastapi import FastAPI
from fastapi.responses import StreamingResponse, Response
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"] for your React dev
    allow_methods=["*"],
    allow_headers=["*"],
)



cap = cv2.VideoCapture(0)

def generate_frames():
    while True:
        ret, frame = cap.read()
        if not ret:
            continue
        _, buffer = cv2.imencode(".jpg", frame)
        frame_bytes = buffer.tobytes()
        yield (b"--frame\r\n"
               b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n")
@app.get('/ss')        
async def screenshot():
    flag, image = cap.read()
    if not flag:
        return {f"Failed to screenshot"}
    _,buffer = cv2.imencode('.jpg',image)
    return Response(buffer.tobytes(), media_type="image/jpeg") 
    
    

@app.get("/video")
async def video_feed():
    return StreamingResponse(generate_frames(), media_type="multipart/x-mixed-replace; boundary=frame")







    
