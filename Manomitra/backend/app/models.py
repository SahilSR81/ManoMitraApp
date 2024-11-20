from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(100))
    created_at = Column(DateTime, default=datetime.utcnow)
    date_of_birth = Column(DateTime)
    gender = Column(String(10))
    occupation = Column(String(100))

    moods = relationship("Mood", back_populates="user")

class Mood(Base):
    __tablename__ = "moods"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    score = Column(Integer)
    timestamp = Column(DateTime, default=datetime.utcnow)
    notes = Column(String(500))

    user = relationship("User", back_populates="moods")

class Content(Base):
    __tablename__ = "contents"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String(50))  # quote, joke, exercise, story, music
    content = Column(String(1000))
    author = Column(String(100))
    source = Column(String(200))

class Yogasana(Base):
    __tablename__ = "yogasanas"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    description = Column(String(500))
    benefits = Column(String(500))
    difficulty = Column(String(20))