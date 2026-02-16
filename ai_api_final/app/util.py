from fastapi import UploadFile
from pathlib import Path
import random

BASE_DIR = Path(__file__).resolve().parent.parent

if not (BASE_DIR / "storage").exists():
    (BASE_DIR / "storage").mkdir()

MEDIA_DIR = BASE_DIR / "storage"


def save_upload_file(upload_file: UploadFile):
    file = upload_file.file
    filename = upload_file.filename
    rand_number= random.randint(1, 1000000)
    new_filename = f"{rand_number}_{filename}"

    file_location = f"{MEDIA_DIR}/{new_filename}"
    url = f"storage/{rand_number}_{filename}"

    with open(file_location, "wb") as buffer:
        buffer.write(file.read())

    return url, new_filename
