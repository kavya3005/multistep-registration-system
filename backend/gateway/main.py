from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers import *

app = FastAPI(
    title="Multi Step Registration API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# ROUTERS


app.include_router(router)
@app.get("/")
def home():
    return {"message": "Backend Running Successfully"}