import { NextRequest } from 'next/server';
import data from './data.json';
import { SortByValues, sortItems } from '@/utils/sortUtils';

export function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('sortBy') as SortByValues
  const response = sortItems(data.data, query)
  return Response.json({ data: response })
}