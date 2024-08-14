FROM python:3.12.2

# 
WORKDIR /code

# 
COPY ./requirements.txt /code/requirements.txt

# 
# RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
RUN pip install fastapi "uvicorn[standard]"
RUN pip install "pydantic[email]"
RUN pip install "passlib[bcrypt]"
RUN pip install bcrypt==4.0.1
RUN python -m pip install requests
RUN pip install pymongo
RUN pip install pyjwt
RUN pip install python-multipart

# 
COPY ./app /code/app

EXPOSE 8000

WORKDIR /code/app

CMD ["uvicorn", "app.main:app", "--reload", "--host", "0.0.0.0"]
