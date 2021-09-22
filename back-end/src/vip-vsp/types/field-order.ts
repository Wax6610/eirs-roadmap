export interface Field {
  field: string;
  header: string;
}

export const importKey = 'vsp';
export const importFields: Field[] = [
  {
    field: 'tb',
    header: 'ТБ',
  },

  {
    field: 'type',
    header: 'ТИП',
  },

  {
    field: 'vsp',
    header: 'ВСП',
  },

  {
    field: 'city',
    header: 'Город',
  },
  {
    field: 'address',
    header: 'Адрес и комментарий',
  },
  {
    field: 'schedule',
    header: 'график работы',
  },

  {
    field: 'screenNumber',
    header:
      'Кол-во ТВ панелей в клиентских зонах (переговорные, зона ожидания)',
  },

  {
    field: 'nettopNumber',
    header: 'Кол-во уже установленных в офисе net top (если нет, то 0)',
  },

  {
    field: 'visitTime',
    header: 'Желаемое время визита инвентаризатора',
  },

  {
    field: 'mol',
    header: 'Должность МОЛ (если МОЛ не относится к штату ВИП ВСП, то указать)',
  },
  { field: 'comment', header: 'Комментарий' },
];
