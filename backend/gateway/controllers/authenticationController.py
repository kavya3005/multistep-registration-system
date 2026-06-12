from fastapi import APIRouter
from models.schemas import SignupSchema, SigninSchema
import requests

router = APIRouter()

SPRING_URL = "http://localhost:8001"

@router.post("/authservice/signup")
def signup(user: SignupSchema):

    response = requests.post(
        f"{SPRING_URL}/users/signup",
        json={
            "fullname": user.fullname,
            "email": user.email,
            "password": user.password,
            "phone": user.phone
        }
    )

    return response.json()


@router.post("/authservice/signin")
def signin(user: SigninSchema):

    response = requests.post(
        f"{SPRING_URL}/users/signin",
        json={
            "email": user.email,
            "password": user.password
        }
    )

    return response.json()


@router.get("/authservice/profile")
def profile():
    return {
        "message": "Profile API Working"
    }