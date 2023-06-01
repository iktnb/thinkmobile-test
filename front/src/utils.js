export function formatDateTime(dateTimeStr) {
  if (!dateTimeStr) return "No time";
  const dateObj = new Date(dateTimeStr);
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  return `${month}/${day} ${hours}:${minutes}`;
}
