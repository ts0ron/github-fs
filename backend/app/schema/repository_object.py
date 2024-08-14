import datetime
from enum import Enum
from pydantic import BaseModel


class NodeType(Enum):
    DIR = "dir"
    FILE = "file"


# Repository Content Item - described item response from the repository (content of a DIR path)
# TODO: IN USE
class RepositoryItem(BaseModel):
    name: str
    path: str
    type: str


# This is for purpose of repository response when getting content of a path.
class RepositoryItemWithContent(RepositoryItem):
    content: str | None = None


# TODO: IN USE
class BaseRepositoryNodeModel(BaseModel):
    id: str | None = None
    path: str
    type: str
    name: str
    last_updated_at: datetime.datetime
    content: str | list[dict]


# TODO: IN USE
class RepositoryNodeOutput(BaseRepositoryNodeModel):
    pass


# TODO: IN USE
class GithubRepositoryNodeModel(BaseRepositoryNodeModel):
    owner: str
    repository: str
