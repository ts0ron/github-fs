from typing import List
import logging
from fastapi import HTTPException, status
from datetime import datetime, timedelta
from app.db.dao import github_node as github_node_dao
from app.schema.mappers.github_service import map_raw_node_to_model_with_update, dict_to_repository_item
from app.schema.repository_object import NodeType, RepositoryItemWithContent, GithubRepositoryNodeModel, \
    RepositoryNodeOutput, RepositoryItem
from app.services.repository_service import GithubRepoService, GithubRepositoryServiceInput


def get_from_db(owner: str, repo: str, path: str, node_type: NodeType) -> None | GithubRepositoryNodeModel:
    # Check in db
    return github_node_dao.find_one(owner, repo, path, node_type)


def get_content_from_github(owner: str,
                            repo: str,
                            path: str = "") -> RepositoryItemWithContent | list[RepositoryItemWithContent]:
    print("Getting the content from github")

    repo_service_input = GithubRepositoryServiceInput(owner=owner, repository=repo, path=path)
    repo_service = GithubRepoService(repo_service_input)

    repo_output: RepositoryItemWithContent | list[RepositoryItemWithContent] = \
        repo_service.fetch_repository_content()

    return repo_output


def is_cache_timeout(cached_node: None | GithubRepositoryNodeModel) -> bool:
    return cached_node is None or datetime.now() > (cached_node.last_updated_at + timedelta(days=1))


def handle_get_github_file_content(owner: str, repo: str, path: str) -> str:
    cached_node: None | GithubRepositoryNodeModel = get_from_db(owner, repo, path, NodeType.FILE)

    if is_cache_timeout(cached_node):
        github_content: RepositoryItemWithContent | list[RepositoryItemWithContent] = get_content_from_github(owner,
                                                                                                              repo,
                                                                                                              path)

        if isinstance(github_content, list):
            raise HTTPException(status_code=status.HTTP_412_PRECONDITION_FAILED,
                                detail="Github get FILE endpoint was triggered for path that holds type DIR")

        repo_response = github_content.content

        item: RepositoryItemWithContent = github_content

        item_for_db = {"owner": owner,
                       "repository": repo,
                       "path": item.path,
                       "name": item.name,
                       "type": NodeType.FILE.name,
                       "content": item.content
                       }

        if cached_node is not None:
            item_for_db["id"] = cached_node.id

        model_node = map_raw_node_to_model_with_update(item_for_db)

        if cached_node is None:
            github_node_dao.save(model_node)
        else:
            github_node_dao.update(model_node)
    else:
        repo_response = cached_node.content

    return repo_response


def handle_get_github_dir_content(owner: str, repo: str, path: str = "") -> RepositoryNodeOutput:
    cached_node: None | GithubRepositoryNodeModel = get_from_db(owner, repo, path, NodeType.DIR)

    if is_cache_timeout(cached_node):
        github_content: RepositoryItemWithContent | list[RepositoryItemWithContent] = get_content_from_github(owner,
                                                                                                              repo,
                                                                                                              path)

        if not isinstance(github_content, list):
            raise HTTPException(status_code=status.HTTP_412_PRECONDITION_FAILED,
                                detail="Github get DIR endpoint was triggered for path that holds type FILE")

        items: List[RepositoryItem] = [dict_to_repository_item(dict(item_with_content)) for item_with_content in github_content]

        if path != "":
            node_type = NodeType.DIR

        node_name: str = ""
        if path is not None and path == "":
            node_name = repo
        else:
            node_name = path.split("/")[-1]

        item_for_db = {"owner": owner,
                       "repository": repo,
                       "path": path,
                       "name": node_name,
                       "type": NodeType.DIR.name,
                       "content": [dict(item) for item in items]
                       }
        if cached_node is not None:
            item_for_db["id"] = cached_node.id

        model_node: GithubRepositoryNodeModel = map_raw_node_to_model_with_update(item_for_db)

        if cached_node is None:
            github_node_dao.save(model_node)
        else:
            github_node_dao.update(model_node)

        # Pulling again from DB, so if it was saved now and not updated, we will have ID in the response.
        entity: None | GithubRepositoryNodeModel = get_from_db(owner, repo, path, NodeType.DIR)

        repo_response = RepositoryNodeOutput(**dict(entity))
    else:
        repo_response = RepositoryNodeOutput(**dict(cached_node))

    return repo_response


def extract_owner_and_repo(repo_url: str):
    # Removing 'https://api.github.com/
    owner_and_repo = repo_url[19:]
    [owner, repo] = owner_and_repo.split("/")
    return owner, repo
