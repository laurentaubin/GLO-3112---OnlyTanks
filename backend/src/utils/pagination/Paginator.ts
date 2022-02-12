import MongoDbQuery from "./MongoDbQuery";
import Pagination from "./Pagination";

class Paginator {
  public addToQuery(pagination: Pagination, query: MongoDbQuery) {
    if (pagination.skip) {
      query = query.skip(pagination.skip);
    }

    if (pagination.limit) {
      query = query.limit(Number(pagination.limit));
    }
    return query;
  }
}

export default Paginator;
