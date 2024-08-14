import ApiService from "../apiservice";
import {RepositoryMetadata} from "../../views/fileexplorer";
import {FileSystemItem, FileSystemNode} from "../../model/repository";
import {AxiosResponse} from "axios";


class fsService extends ApiService {

  private DIR_URL = "/dir";
  private FILE_URL = "/file";

  constructor() {
    super({baseUrl: "/fs", "name": "file-system-service"});
  }

  getFile(metadata: RepositoryMetadata) {
    return this.fetchWithAuth<RepositoryMetadata, FileSystemNode<string>>(this.FILE_URL, {
      params: metadata
    })
      .then(res => {
        console.log("The file is", res)
        return res.data
      })
  }

  getDirectory(metadata: RepositoryMetadata): Promise<FileSystemNode<FileSystemItem[]>> {
    if (!metadata.owner || !metadata.repository) {
      return Promise.reject("Owner and repository are required")
    }
    return this.fetchWithAuth<RepositoryMetadata, FileSystemNode<FileSystemItem[]>>(this.DIR_URL, {params: metadata})
      .then(res => {
        return res.data
      })
  }
}

const INSTANCE = new fsService();
export default INSTANCE;