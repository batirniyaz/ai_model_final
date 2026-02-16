import datetime

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, String, TIMESTAMP
import pytz

from app.db import Base

TASHKENT_TZ = pytz.timezone("Asia/Tashkent")

def now_tashkent():
    return datetime.datetime.now(TASHKENT_TZ)


class Image(Base):
    __tablename__ = "image"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    image_path: Mapped[str] = mapped_column(String(255), nullable=False)
    image_name: Mapped[str] = mapped_column(String(255), nullable=False)
    prediction: Mapped[str] = mapped_column(String(255), nullable=False)
    prediction_result: Mapped[str] = mapped_column(String(255), nullable=False)

    created_at: Mapped[datetime.datetime] = mapped_column(TIMESTAMP(timezone=True),default=now_tashkent)
    updated_at: Mapped[datetime.datetime] = mapped_column(TIMESTAMP(timezone=True),default=now_tashkent,onupdate=now_tashkent)
