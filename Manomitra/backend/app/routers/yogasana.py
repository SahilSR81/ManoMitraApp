from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, models, database
from ..utils import get_current_user

router = APIRouter()

@router.get("/yogasanas", response_model=list[schemas.Yogasana])
async def get_yogasanas(db: Session = Depends(database.get_db), current_user: schemas.User = Depends(get_current_user)):
    yogasanas = db.query(models.Yogasana).all()
    return yogasanas

@router.get("/yogasanas/{yogasana_id}", response_model=schemas.Yogasana)
async def get_yogasana(yogasana_id: int, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(get_current_user)):
    yogasana = db.query(models.Yogasana).filter(models.Yogasana.id == yogasana_id).first()
    if yogasana is None:
        raise HTTPException(status_code=404, detail="Yogasana not found")
    return yogasana

@router.post("/yogasanas", response_model=schemas.Yogasana)
async def create_yogasana(yogasana: schemas.YogasanaCreate, db: Session = Depends(database.get_db), current_user: schemas.User = Depends(get_current_user)):
    db_yogasana = models.Yogasana(**yogasana.dict())
    db.add(db_yogasana)
    db.commit()
    db.refresh(db_yogasana)
    return db_yogasana