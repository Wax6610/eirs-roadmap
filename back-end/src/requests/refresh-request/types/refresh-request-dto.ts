export interface RefreshRequestDto {
  number: number[]; // Список серийных номеров
  template: number; // ID Шаблона
  replace: boolean; // Нужно ли перезаписать старые запросы
  remote: boolean; //Отправмть запрос на удаленнную группу ?
}
