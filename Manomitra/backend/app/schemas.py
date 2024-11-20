from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    username: str
    email: str
    date_of_birth: datetime
    gender: str
    occupation: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

class MoodBase(BaseModel):
    score: int
    notes: Optional[str] = None

class MoodCreate(MoodBase):
    pass

class Mood(MoodBase):
    id: int
    user_id: int
    timestamp: datetime

    class Config:
        orm_mode = True

class ContentBase(BaseModel):
    type: str
    content: str
    author: Optional[str] = None
    source: Optional[str] = None

class ContentCreate(ContentBase):
    pass

class Content(ContentBase):
    id: int

    class Config:
        orm_mode = True

class YogasanaBase(BaseModel):
    name: str
    description: str
    benefits: str
    difficulty: str

class YogasanaCreate(YogasanaBase):
    pass

class Yogasana(YogasanaBase):
    id: int

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None