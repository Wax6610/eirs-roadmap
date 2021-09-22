import { MainView } from '../main-view.entity';

export default interface GetViewRequest<T> {
  startRow: number;
  endRow: number;
  filterModel: FilterModel<T>;
  sortModel: SortModel<T>[];
}

interface SortModel<T> {
  colId: keyof T;
  sort: 'asc' | 'desc';
}

interface FilterModel<T> {
  [key: string]: {
    filter: string;
    filterType: 'text';
    type: 'contains';
  };
}
