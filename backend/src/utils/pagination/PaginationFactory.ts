import Pagination from "./Pagination";

class PaginationFactory {
  public create(limit?: string, skip?: string): Pagination {
    return {
      limit: limit ? Number(limit) : undefined,
      skip: skip ? Number(skip) : undefined
    };
  }
}

export default PaginationFactory;
