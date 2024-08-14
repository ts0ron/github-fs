from abc import ABC, abstractmethod
from typing import List
from pydantic import BaseModel
from requests import Response
from fastapi import HTTPException
from app.schema.repository_object import RepositoryItemWithContent
from requests import get


# Repository Service Inputs
class RepositoryServiceInput(ABC):
    def __init__(self): pass


class GithubRepositoryServiceInput(RepositoryServiceInput):
    def __init__(self, owner: str, repository: str, path: str = None):
        self.owner = owner
        self.repository = repository
        self.path = path


class RequestMetadata(BaseModel):
    url: str
    query_params: dict | None = None


# Repository Services
class RepositoryService(ABC):
    def __init__(self):
        pass

    @abstractmethod
    def fetch_repository_content(self, meta_data: RepositoryServiceInput) -> \
            RepositoryItemWithContent | List[RepositoryItemWithContent]:
        pass

    def get(self, metadata: RequestMetadata) -> any:
        return get(metadata.url, metadata.query_params)


class GithubRepoService(RepositoryService):
    def __init__(self, metadata: GithubRepositoryServiceInput):
        self.metadata = metadata
        super().__init__()

    def fetch_repository_content(self) -> RepositoryItemWithContent | List[RepositoryItemWithContent]:
        url = f"https://api.github.com/repos/{self.metadata.owner}/{self.metadata.repository}/contents"

        if self.metadata.path is not None:
            url += "/" + self.metadata.path

        request_metadata = RequestMetadata(url=url)

        response: Response = super().get(request_metadata)

        if response.status_code == 404:
            detail = f"""Github repository for owner {self.metadata.owner} and repository {self.metadata.repository} with inner path {self.metadata.path} was not found!"""
            raise HTTPException(status_code=404, detail=detail)
        response_content = response.json()
        if isinstance(response_content, list):
            return [RepositoryItemWithContent(**item) for item in response_content]
        else:
            return RepositoryItemWithContent(**response_content)
