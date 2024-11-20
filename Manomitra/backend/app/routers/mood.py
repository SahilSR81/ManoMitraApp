from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, models, database
from ..utils import get_current_user

router = APIRouter()

@router.post("/moods", response_model=schemas.Mood)
def create_mood(mood: schemas.MoodCreate, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(get_current_user)):
    db_mood = models.Mood(**mood.dict(), user_id=current_user.id)
    db.add(db_mood)
    db.commit()
    db.refresh(db_mood)
    return db_mood

@router.get("/moods", response_model=list[schemas.Mood])
def read_moods(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(get_current_user)):
    moods = db.query(models.Mood).filter(models.Mood.user_id == current_user.id).offset(skip).limit(limit).all()
    return moods

@router.get("/moods/{mood_id}", response_model=schemas.Mood)
def read_mood(mood_id: int, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(get_current_user)):
    mood = db.query(models.Mood).filter(models.Mood.id == mood_id, models.Mood.user_id == current_user.id).first()
    if mood is None:
        raise HTTPException(status_code=404, detail="Mood not found")
    return mood