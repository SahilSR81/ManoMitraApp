from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, mood, content, user, yogasana
from app.database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include routers
app.include_router(auth.router)
app.include_router(mood.router)
app.include_router(content.router)
app.include_router(user.router)
app.include_router(yogasana.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Manomitra API"}