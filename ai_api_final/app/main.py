from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db import create_db_and_tables
from app import router


@asynccontextmanager
async def lifespan(main_app: FastAPI):
    await create_db_and_tables()

    yield


app = FastAPI(
    title="Malaria Detection API",
    version="0.1",
    summary="This is a FastAPI application for malaria detection using CNN.",
    lifespan=lifespan,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router)
