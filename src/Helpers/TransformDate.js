export default function (date) {
  let SelectedDate = new window.Date(date);
  let fullYear = SelectedDate.getFullYear();
  let month = (SelectedDate.getMonth() + 1).toString().padStart(2, "0");
  let Day = SelectedDate.getDate().toString().padStart(2, "0");

  return `${fullYear}-${month}-${Day}`;
}
