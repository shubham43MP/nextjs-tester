"use client";

import { useEffect, useState } from "react";
import { FileItem, SortByValues, sortItems } from "../../utils/sortUtils";

export default function Home() {
  const [items, setItems] = useState<FileItem[]>([]); 
  const [sortType, setSortType] = useState<SortByValues>(SortByValues.createdAtAsc);

  useEffect(() => {
    const fetchItems = async () => {
      const url = `/api/data?sortBy=${sortType}`;
      const response = await fetch(url);

      if (!response.ok) {
        console.error("Failed to fetch items");
        return;
      }

      const jsonResp = await response.json();
      setItems(jsonResp.data as FileItem[]);
    };

    fetchItems();
  }, [sortType]);

  const handleSortChange = (type: SortByValues) => {
    setSortType(type);
    const sortedItems = sortItems([...items], type);
    setItems(sortedItems);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-6">Item Sorter</h1>
      <div className="mb-6">
        <select
          value={sortType}
          onChange={(e) => handleSortChange(e.target.value as SortByValues)}
          className="bg-gray-800 border border-gray-700 text-white py-2 px-4 rounded-md"
        >
          <option value={SortByValues.createdAtAsc}>Sort by Created At</option>
          <option value={SortByValues.fileNameAsc}>Sort by Filename Asc</option>
          <option value={SortByValues.fileNameDsc}>Sort by Filename Desc</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-24 w-full px-4 max-w-5xl">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col"
          >
            <p className="text-lg font-semibold">{item.filename}</p>
            <p className="text-sm text-gray-400">{item.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
