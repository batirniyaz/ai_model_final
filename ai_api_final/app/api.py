from typing import Annotated

from fastapi import APIRouter, UploadFile, File, Depends
from fastapi.responses import FileResponse

from app.util import save_upload_file
from app.func import predict
from app.model import Image
from app.db import get_async_session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

router = APIRouter()


@router.post("/predict")
async def prediction(db: Annotated[AsyncSession, Depends(get_async_session)], upload_file: UploadFile = File(...)):
    url, filename = save_upload_file(upload_file)
    predicted, text = predict(url)

    img_db = Image(
        image_path=url,
        image_name=filename,
        prediction=predicted,
        prediction_result=text
    )

    db.add(img_db)
    await db.commit()
    await db.refresh(img_db)

    return img_db


@router.get("/images")
async def get_images(db: Annotated[AsyncSession, Depends(get_async_session)]):
    result = await db.execute(select(Image))
    images = result.scalars().all()
    return images


@router.get("/images/{image_name}")
async def get_image(image_name: str):
    file_path = f"storage/{image_name}"
    return FileResponse(file_path)

