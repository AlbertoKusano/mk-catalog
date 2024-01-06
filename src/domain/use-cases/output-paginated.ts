export abstract class OutputPaginated<T> {
  abstract get hasNextPage(): boolean;
  abstract get hasPreviousPage(): boolean;
  abstract get items(): Array<T>;
  abstract get page(): number;
  abstract get take(): number;
  abstract get total(): number;
}
