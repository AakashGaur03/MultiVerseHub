function formatDate(dateString) {
  console.log(dateString)
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

function formatDateinHumanredable(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export { formatDate, formatDateinHumanredable };
