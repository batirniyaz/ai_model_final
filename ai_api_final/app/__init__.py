from fastapi import APIRouter

from app.api import router as main_router

router = APIRouter()
router.include_router(main_router, prefix="/api", tags=["Api"])