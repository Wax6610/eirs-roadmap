export default interface FilterModel {
  [key: string]: FilterText;
}

interface FilterText {
  filterType: "set" | 'text';
  values: string|null;
}
