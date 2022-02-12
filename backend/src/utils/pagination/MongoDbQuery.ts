interface MongoDbQuery {
  find: () => MongoDbQuery;
  limit: (number: number) => MongoDbQuery;
  skip: (number: number) => MongoDbQuery;
}

export default MongoDbQuery;
