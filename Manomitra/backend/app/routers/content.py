from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, models, database
from ..utils import get_current_user
import random

router = APIRouter()

@router.get("/content/{content_type}", response_model=list[schemas.Content])
async def get_content(content_type: str, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(get_current_user)):
    if content_type == "yogasanas":
        yogasanas = db.query(models.Yogasana).all()
        if not yogasanas:
            raise HTTPException(status_code=404, detail="No yogasanas found")
        return [schemas.Content(id=y.id, type="yogasana", content=y.name, author=None,
                                source=f"Benefits: {y.benefits}") for y in yogasanas]
    
    contents = db.query(models.Content).filter(models.Content.type == content_type).all()
    if not contents:
        raise HTTPException(status_code=404, detail=f"No {content_type} content found")
    return random.sample(contents, min(5, len(contents)))