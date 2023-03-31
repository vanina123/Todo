let tasks = [];
const list = document.querySelector('.todo-ul');
const clearAll = document.querySelector('.clear');

function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function get() {
  tasks = localStorage.getItem('tasks');
  if (tasks !== null) {
    tasks = JSON.parse(tasks);
  } else {
    tasks = [];
  }
}

function render() {
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('nana');
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <input type="text" value="${task.description}" class="tsk ${task.completed ? 'checked' : ''}">
      <div class="pen1">
        <li><i class="uil uil-trash"></i></li>
      </div>
      <hr>
    `;
    list.appendChild(li);

    // Add event listener to the delete icon
    const deleteIcon = li.querySelector('.uil-trash');
    deleteIcon.addEventListener('click', () => {
      tasks.splice(index, 1);
      updateIndexes();
      save();
      render();
    });

    // Add event listener to the input field
    const inputField = li.querySelector('.tsk');
    inputField.addEventListener('input', () => {
      tasks[index].description = inputField.value;
      save();
    });

    // Add event listener to the checkbox
    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      tasks[index].completed = checkbox.checked;
      inputField.classList.toggle('checked');
      save();
    });
  });
}

function updateIndexes() {
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
}

const form = document.getElementById('arrow1');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputField = document.getElementById('todo-input');
  const inputVal = inputField.value.trim();

  if (inputVal !== '') {
    const newTask = {
      index: tasks.length + 1,
      description: inputVal,
      completed: false,
    };
    tasks.push(newTask);
    save();
    render();
    form.reset();
  }
});

get();
render();

// Add event listener to the "Clear all completed" button
clearAll.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  save();
  render();
});
