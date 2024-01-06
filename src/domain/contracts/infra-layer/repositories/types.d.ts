export type FindAllOutput<Entity> = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  items: Array<Entity>;
  page: number;
  pageCount: number;
  take: number;
  total: number;
};
