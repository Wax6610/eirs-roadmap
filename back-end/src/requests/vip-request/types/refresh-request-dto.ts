export interface RefreshRequestDto {
  number: string[]; // Список ВСП
  template: number; // ID Шаблона
  replace: boolean; // Нужно ли перезаписать старые запросы
  remote: boolean; //Отправмть запрос на удаленнную группу ?
}
