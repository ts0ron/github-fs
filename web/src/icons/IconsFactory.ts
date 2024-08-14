import {
  AccountTree,
  Article,
  Code, Css,
  DataObject,
  Folder,
  Html,
  Javascript,
  PictureAsPdf,
  QuestionMark,
  Refresh,
  Search
} from "@mui/icons-material";
import {CircularProgress} from "@mui/material";

export default class IconsFactory {

  static Views = {
    FS: AccountTree
  };

  static Actions = {
    Refresh: Refresh,
  };

  static Status = {
    Loading: CircularProgress,
  }

  static Components = {
    ScreenSearch: Search,
  };

  static Filters = {}

  static FileIcon = {
    Folder: Folder,
    Text: Article,
    Pdf: PictureAsPdf,
    JavaScript: Javascript,
    Json: DataObject,
    Markdown: Code,
    HTML: Html,
    CSS: Css,
    Unknown: QuestionMark
  };

  static resolveFileIcon(type: string) {
    switch (type) {
      case "pdf":
        return IconsFactory.FileIcon.Pdf;
      case "json":
        return IconsFactory.FileIcon.Json;
      case "md":
        return IconsFactory.FileIcon.Markdown;
      case "html":
        return IconsFactory.FileIcon.Markdown;
      case "css":
        return IconsFactory.FileIcon.CSS;
      case "js":
      case "jsx":
        return IconsFactory.FileIcon.JavaScript;
      default:
        return IconsFactory.FileIcon.Text;
    }
  }

}

