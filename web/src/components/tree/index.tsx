import {NodeType} from "../../model/repository";
import {Dispatch, SetStateAction} from "react";

export interface TreeNodeProps {
  name: string,
  path: string,
  owner: string,
  repository: string
  type: NodeType,
  setAction: Dispatch<SetStateAction<string | null>>
}