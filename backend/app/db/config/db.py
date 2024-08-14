from pymongo import MongoClient
from pymongo.collection import Collection as MongoCollection
import os


mongo_url = os.environ["MONGO_URL"]
print("Going to connect to MongoDB client with URI", mongo_url)

client = MongoClient(mongo_url)

db = client.management

users: MongoCollection = db["users"]
users.create_index("email", unique=True)

github_nodes: MongoCollection = db["github_nodes"]
github_nodes.create_index(keys=["owner", "repository", "path"], unique=True)
