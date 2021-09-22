import React from "react";

{
  /* Набор стандартных обработчиков для элементов формы
обычно hadnler - это эксземпляр useState,
 который сохранит значение, переданое из формы
*/
}

export const handleChangeSwitch = (handler: any) => (
  event: React.ChangeEvent<HTMLInputElement>,
  checked: boolean
) => {
  handler(checked);
};

export const handleChangeSelect = (handler: any) => (
  event: React.ChangeEvent<{ value: unknown }>
) => {
  handler(event.target.value);
};

export const handleChangeDate = (handler: any) => (date: any) => {
  handler(date);
};

export const handleAutocomplete = (handler: any) => (
  event: any,
  newValue: any
) => {
  handler(newValue);
};

export const handleChangeText = (handler: any) => (
  event: React.ChangeEvent<HTMLInputElement>
) => handler(event.target.value);
