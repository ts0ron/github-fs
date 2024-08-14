from app.db.config.db import github_nodes
from app.schema.repository_object import GithubRepositoryNodeModel, NodeType
from app.schema.mappers.github_service import to_github_node_model, from_db_to_model_dict


def transform_id_to_db(entity: dict) -> dict:
    if entity['id'] is not None and entity['id']:
        entity['_id'] = entity['id']
    if entity['id'] is None or entity['id']:
        del entity['id']
    return entity


def save(entity: GithubRepositoryNodeModel):
    entity_dict = dict(entity)

    return github_nodes.insert_one(transform_id_to_db(entity_dict))


def update(entity: GithubRepositoryNodeModel):
    entity_dict = dict(entity)

    transformed_entity = transform_id_to_db(entity_dict)

    return github_nodes.update_one({"_id": transformed_entity['_id']}, {"$set": transformed_entity})


def find_one(owner: str, repo: str, path: str, node_type: NodeType) -> GithubRepositoryNodeModel:
    res = github_nodes.find_one({"owner": owner, "repository": repo, "path": path, "type": node_type.name})
    if res is None:
        return None
    return to_github_node_model(from_db_to_model_dict(res))
