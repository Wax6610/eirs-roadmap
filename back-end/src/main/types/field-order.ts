export interface Field {
  field: string;
  header: string;
  isNull?: boolean;
}

export const importKey = 'number';
export const importFields: Field[] = [
  {
    field: 'number',
    header: 'Id',
  },

  {
    field: 'name',
    header: 'Название',
  },

  {
    field: 'path',
    header: 'Путь',
  },

  {
    field: 'status',
    header: 'Статус',
  },

  {
    field: 'lastSeen',
    header: 'Последний раз в сети',
    isNull: true,
  },

  {
    field: 'playerVersion',
    header: 'Версия плеера',
  },
  {
    field: 'code',
    header: 'Код подключения',
  },

  {
    field: 'tags',
    header: 'Теги',
  },

  {
    field: 'address',
    header: 'Адрес',
  },
  {
    field: 'description',
    header: 'Описание',
  },

  {
    field: 'created',
    header: 'Создано',
    isNull: true,
  },

  {
    field: 'updated',
    header: 'Обновлено',
    isNull: true,
  },

  {
    field: 'connnected',
    header: 'Подключено',
    isNull: true,
  },
  {
    field: 'os',
    header: 'Версия OS',
  },
  {
    field: 'cpu',
    header: 'CPU',
  },
  {
    field: 'ram',
    header: 'RAM всего',
  },

  {
    field: 'pcName',
    header: 'Название ПК',
  },

  {
    field: 'userName',
    header: 'Имя пользователя',
  },

  {
    field: 'externalIp',
    header: 'Внешний IP',
  },
  {
    field: 'innerIp',
    header: 'Вутренний IP',
  },
  {
    field: 'timezone',
    header: 'Часовой пояс',
  },
  {
    field: 'attributes',
    header: 'Доп.атрибуты',
  },
  {
    field: 'cycle',
    header: 'Циклы',
  },
];
