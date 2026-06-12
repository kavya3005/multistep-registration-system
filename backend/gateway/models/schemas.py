from pydantic import BaseModel, EmailStr


class SignupSchema(BaseModel):
    fullname: str
    email: EmailStr
    phone: str
    password: str


class SigninSchema(BaseModel):
    email: EmailStr
    password: str