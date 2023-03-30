import './style.css';

const tasks = [
  {
    index: 0,
    description: 'Wash the dishes',
    completed: true,
  },
  {
    index: 1,
    description: 'Complete to do list project',
    completed: true,
  },
  {
    index: 2,
    description: 'Wash the dishes',
    completed: true,
  },
];

const list = document.querySelector('.todo-ul');

tasks.forEach((task) => {
  const li = document.createElement('li');
  li.classList.add('nana');
  li.innerHTML = `
        <input type="checkbox">
        ${task.description}
        <i class="fa-solid fa-ellipsis-vertical"></i>
        <hr>
    `;
  list.appendChild(li);
});
