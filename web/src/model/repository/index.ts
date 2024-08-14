import React from 'react'

export enum NodeType {
    FILE = "file",
    DIRECTORY = "dir",
}

export interface FileSystemItem {
    name: string,
    path: string,
    type: NodeType
}

export interface FileSystemNode<T> {
    id: string,
    name: string,
    path: string,
    type: NodeType,
    content: T
    last_updated_at: Date
}
