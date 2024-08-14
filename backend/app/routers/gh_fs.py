from fastapi import APIRouter, Query, Depends
from typing import Annotated
from app.handlers.gh_fs import handle_get_github_file_content, handle_get_github_dir_content
from app.schema.repository_object import RepositoryNodeOutput
from app.dependencies.auth import get_current_user

router = APIRouter(
    prefix="/fs",
    dependencies=[Depends(get_current_user)]
)


@router.get("/dir")
def get_repo_dir_content(owner: Annotated[str, Query()], repository: Annotated[str, Query()],
                         path: Annotated[str, Query()] = "") -> RepositoryNodeOutput:
    return handle_get_github_dir_content(owner, repository, path)


@router.get("/file")
def get_repo_file_content(owner: Annotated[str, Query()], repository: Annotated[str, Query()],
                          path: Annotated[str, Query()]) -> str:
    return handle_get_github_file_content(owner, repository, path)
