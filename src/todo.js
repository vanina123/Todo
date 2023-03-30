let tasks = [];
const list = document.querySelector('.todo-ul');

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
          <input type="checkbox">
         <input type="text" value="${task.description}" class="tsk">
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
      save();
      render();
    });
  });
}

const form = document.getElementById('arrow1');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputField = document.getElementById('todo-input');
  const inputVal = inputField.value.trim(); // Trim whitespace from the input

  // Check if the input is not empty
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
