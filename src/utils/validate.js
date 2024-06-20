export const checkValidData = (title, assignee, date) => {
  const isTitleValid =
    title.trim().length <= 15 && /^[\w\s\-_\/]+$/.test(title);

  const isAssigneeValid =
    assignee.trim().length <= 15 && /^[A-Za-z0-9\s]+$/.test(assignee);

  const isValidDate =
    new Date(date).getMonth() + 1 >= new Date().getMonth() + 1 &&
    new Date(date).getDate() >= new Date().getDate() &&
    new Date(date).getFullYear() >= new Date().getFullYear();

  if (!isTitleValid)
    return "Task Title is not valid! Length should be less than 15 and only (_-/) special characters are allowed ";
  if (!isAssigneeValid)
    return "Assignee is not valid! Length should be less than 15 and no special characters are allowed";

  if (!isValidDate) return "No past date allowed! Please enter correct date!";

  return null;
};
