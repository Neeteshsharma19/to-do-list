function formatTimeTo12Hour(time) {
  if (!time) return '';
  const [hourStr, minute] = time.split(':');
  let hour = parseInt(hourStr);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

function createTaskElement(taskText, taskDate, taskTime, completed = false) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const formattedTime = formatTimeTo12Hour(taskTime);
  span.textContent = `${taskText} (${taskDate} ${formattedTime})`;
  span.dataset.text = taskText;
  span.dataset.date = taskDate;
  span.dataset.time = taskTime;
  if (completed) span.classList.add('completed');

  const completeBtn = document.createElement('button');
  completeBtn.textContent = '✔';
  completeBtn.onclick = () => {
    span.classList.toggle('completed');
    saveTasks();
  };

  const editBtn = document.createElement('button');
  editBtn.textContent = '✎';
  editBtn.onclick = () => {
    taskInput.value = taskText;
    dateInput.value = taskDate;
    timeInput.value = taskTime;
    li.remove();
    saveTasks();
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑';
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.append(span, completeBtn, editBtn, deleteBtn);
  return li;
}
addBtn.onclick = () => {
  const taskText = taskInput.value.trim();
  const taskDate = dateInput.value;
  const taskTime = timeInput.value;
  if (!taskText) return alert('Please enter a task.');
  if (!taskDate) return alert('Please select a date.');

  const taskElement = createTaskElement(taskText, taskDate, taskTime);
  taskList.appendChild(taskElement);

  saveTasks();

  taskInput.value = '';
  dateInput.value = '';
  timeInput.value = '';
};
