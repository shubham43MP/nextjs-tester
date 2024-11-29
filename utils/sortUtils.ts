export enum SortByValues {
    createdAtAsc = "createdAtAsc",
    fileNameAsc = "fileNameAsc",
    fileNameDsc = "fileNameDsc",
  }
  
  export interface FileItem {
    createdAt: string;
    filename: string;
  }
  
  export const sortItems = (items: FileItem[], sortType: SortByValues): FileItem[] => {
    if (sortType === SortByValues.createdAtAsc) {
      return [...items].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
  
    const filenameToSortable = (filename: string): string =>
      filename.replace(/\d+/g, (num) => num.padStart(10, "0"));
  
    if (sortType === SortByValues.fileNameAsc) {
      return [...items].sort((a, b) =>
        filenameToSortable(a.filename).localeCompare(filenameToSortable(b.filename))
      );
    }
  
    if (sortType === SortByValues.fileNameDsc) {
      return [...items].sort((a, b) =>
        filenameToSortable(b.filename).localeCompare(filenameToSortable(a.filename))
      );
    }
  
    return items;
  };