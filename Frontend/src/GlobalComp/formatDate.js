function formatDate(dateString) {
  let date;
  if (!isNaN(dateString)) {
    date = new Date(Number(dateString));
  } else {
    date = new Date(dateString);
  }

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear() % 100;

  return `${day}/${month}/${year}`;
}

export default formatDate;
