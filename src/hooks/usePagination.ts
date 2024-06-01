import type { VehicleData } from '~/redux/reducers/vehicleSlice';
import { useState } from 'react';

const usePagination = (
  inventory: VehicleData[] | null,
  itemsPerPage: number,
) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const maxPage =
    inventory && inventory.length > 0
      ? Math.ceil(inventory.length / itemsPerPage)
      : 0;

  const currentInventory = () => {
    if (inventory && inventory.length > 0) {
      const begin = (currentPage - 1) * itemsPerPage;
      const end = begin + itemsPerPage;
      return inventory.slice(begin, end);
    }
  };

  const next = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  };

  const prev = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const jump = (page: number) => {
    const pageNumber = Math.max(1, page);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setCurrentPage((_currentPage) => Math.min(pageNumber, maxPage));
  };

  return { next, prev, jump, currentInventory, currentPage, maxPage };
};

export default usePagination;
