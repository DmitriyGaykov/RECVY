export const isToday = (date: Date): boolean => {
  const today = new Date(); // Получаем текущую дату

  // Сравниваем день, месяц и год заданной даты с текущей датой
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};
