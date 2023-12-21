interface PageInterval {
  startRow: number;
  endRow: number;
  limit: number;
}

export function getPageIntervalToFetchData(page: number): PageInterval {
  const LIMIT_TO_FETCH = 10;
  const startRow = (page - 1) * LIMIT_TO_FETCH;
  const endRow = startRow + LIMIT_TO_FETCH;

  return {
    endRow,
    startRow,
    limit: LIMIT_TO_FETCH,
  };
}
