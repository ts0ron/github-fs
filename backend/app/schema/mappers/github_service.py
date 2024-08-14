from app.schema.repository_object import NodeType, \
    GithubRepositoryNodeModel, RepositoryItem
import datetime


def map_raw_node_to_model_with_update(raw_data: dict) -> GithubRepositoryNodeModel:

    raw_data['last_updated_at'] = datetime.datetime.now()

    return GithubRepositoryNodeModel(**raw_data)


def dict_to_repository_item(item: dict) -> RepositoryItem | None:
    if not item:
        return None

    return RepositoryItem(**item)


def from_db_to_model_dict(github_node: dict) -> dict:
    content = github_node['content']

    if isinstance(content, list):
        # If we are here, then the content if for a path of type DIR, we need to transform the list of objects
        # into a list of RepositoryItems
        content: list[RepositoryItem] = [dict(dict_to_repository_item(item)) for item in github_node['content']]
    else:
        # This is a NodeType.FILE, the content is the string of the file's text (or w/e format it is)
        content: str = github_node['content']

    mapped_github_node = {
        "id": str(github_node['_id']),
        "path": github_node['path'],
        "type": resolve_node_type(github_node['type']),
        "last_updated_at": github_node['last_updated_at'],
        "name": github_node['name'],
        "owner": github_node['owner'],
        "repository": github_node['repository'],
        "content": content
    }
    return mapped_github_node


def to_github_node_model(github_node: dict) -> GithubRepositoryNodeModel:
    return GithubRepositoryNodeModel(**github_node)


def resolve_node_type(node_type: str) -> NodeType:
    if node_type == NodeType.FILE.name:
        return NodeType.FILE
    return NodeType.DIR
