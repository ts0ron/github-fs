import { AccountTree, Article, Folder, Javascript, PictureAsPdf, QuestionMark, Refresh, Search } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

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

  static Filters = {
  }

  static FileIcon = {
    Folder: Folder,
    Text: Article,
    Pdf: PictureAsPdf,
    JavaScript: Javascript,
    Unknown: QuestionMark
  };

}

