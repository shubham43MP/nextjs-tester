import { NextRequest } from 'next/server';
import data from './data.json';

enum SortByValues {
  createdAtAsc = 'createdAtAsc',
  fileNameAsc = 'fileNameAsc',
  fileNameDsc = 'fileNameDsc'
}

export const sortItems = (items: any, sortType: SortByValues) => {
  if (sortType === SortByValues.createdAtAsc) {
    return items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  const filenameToSortable = (filename) =>
    filename.replace(/\d+/g, (num) => num.padStart(10, "0"));

  if (sortType === SortByValues.fileNameAsc) {
    return items.sort((a, b) =>
      filenameToSortable(a.filename).localeCompare(
        filenameToSortable(b.filename)
      )
    );
  }

  if (sortType === SortByValues.fileNameDsc) {
    return items.sort((a, b) =>
      filenameToSortable(b.filename).localeCompare(
        filenameToSortable(a.filename)
      )
    );
  }

  return items;
};

export function GET(req: NextRequest, res) {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('sortBy') as SortByValues
  const response = sortItems(data.data, query)
  console.log({ response })
  return Response.json({ data: data.data })
}