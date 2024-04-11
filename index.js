const todoButton = document.querySelector('.todo-btn');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const completedFilterBtn = document.querySelector('.completed-filter');
console.log(completedFilterBtn);

const getTodoListFromLocalStorage = () => {
  let todoListArr;
  if (localStorage.getItem('todoList')) {
    todoListArr = JSON.parse(localStorage.getItem('todoList'));
  } else {
    todoListArr = [];
  }
  return todoListArr;
};

const init = () => {
  let todoListArr;
  if (localStorage.getItem('todoList')) {
    todoListArr = JSON.parse(localStorage.getItem('todoList'));
  } else {
    todoListArr = [];
  }

  todoList.innerHTML = ``;
  todoListArr.forEach((todo) => {
    const newTodo = document.createElement('div');
    newTodo.classList.add('todo');

    const newTodoListItem = document.createElement('li');
    newTodoListItem.innerText = todo.text;
    if (todo.completed) newTodoListItem.classList.add('mark-complete');

    const newTodoBtnContainer = document.createElement('div');
    newTodoBtnContainer.classList.add('todo-btn-container');

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('trash-btn');

    completeBtn.innerHTML = `<i class="fa fa-check"></i>`;
    deleteBtn.innerHTML = `<i class="fa fa-trash"></i>`;

    newTodoBtnContainer.appendChild(completeBtn);
    newTodoBtnContainer.appendChild(deleteBtn);

    newTodo.appendChild(newTodoListItem);
    newTodo.appendChild(newTodoBtnContainer);

    todoList.appendChild(newTodo);
  });
};

document.addEventListener('DOMContentLoaded', init);

todoButton.addEventListener('click', (event) => {
  //   Prevent Default Behaviour of Btn
  event.preventDefault();

  //   Extracting todo value
  const todoText = todoInput.value;

  //   Check for empty list item
  if (!todoText) return;

  // Save to local storage
  saveTodoListToLocalStorage(todoText);

  const newTodo = document.createElement('div');
  newTodo.classList.add('todo');

  const newTodoListItem = document.createElement('li');
  newTodoListItem.innerText = todoText;

  const newTodoBtnContainer = document.createElement('div');
  newTodoBtnContainer.classList.add('todo-btn-container');

  const completeBtn = document.createElement('button');
  completeBtn.classList.add('complete-btn');

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('trash-btn');

  completeBtn.innerHTML = `<i class="fa fa-check"></i>`;
  deleteBtn.innerHTML = `<i class="fa fa-trash"></i>`;

  newTodoBtnContainer.appendChild(completeBtn);
  newTodoBtnContainer.appendChild(deleteBtn);

  newTodo.appendChild(newTodoListItem);
  newTodo.appendChild(newTodoBtnContainer);

  todoList.appendChild(newTodo);

  todoInput.value = '';
});

const updateList = (todoListArr) => {
  todoList.innerHTML = ``;
  todoListArr.forEach((todo) => {
    const newTodo = document.createElement('div');
    newTodo.classList.add('todo');

    const newTodoListItem = document.createElement('li');
    newTodoListItem.innerText = todo.text;
    if (todo.completed) newTodoListItem.classList.add('mark-complete');

    const newTodoBtnContainer = document.createElement('div');
    newTodoBtnContainer.classList.add('todo-btn-container');

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('trash-btn');

    completeBtn.innerHTML = `<i class="fa fa-check"></i>`;
    deleteBtn.innerHTML = `<i class="fa fa-trash"></i>`;

    newTodoBtnContainer.appendChild(completeBtn);
    newTodoBtnContainer.appendChild(deleteBtn);

    newTodo.appendChild(newTodoListItem);
    newTodo.appendChild(newTodoBtnContainer);

    todoList.appendChild(newTodo);
  });
};

const saveTodoListToLocalStorage = (todo) => {
  let todoListArr;

  if (localStorage.getItem('todoList')) {
    todoListArr = JSON.parse(localStorage.getItem('todoList'));
  } else {
    todoListArr = [];
  }
  todoListArr.push({ text: todo, completed: false });

  // console.log(todoListArr);
  localStorage.setItem('todoList', JSON.stringify(todoListArr));
};

todoList.addEventListener('click', (e) => {
    const item = e.target;
    if (
      item.classList.contains('complete-btn') ||
      item.classList.contains('fa-check')
    ) {
      const todoListItem = item.parentElement.previousElementSibling;
      const todoText = todoListItem.textContent.trim();
      markComplete(todoText);
    } else if (
      item.classList.contains('trash-btn') ||
      item.classList.contains('fa-trash')
    ) {
      const todoListItem = item.parentElement.previousElementSibling;
      const todoText = todoListItem.textContent.trim();
      deleteTodo(todoText);
    }
  });
  

const markComplete = (todoText) => {
    let todoListArr = getTodoListFromLocalStorage();
  
    const updatedTodoList = todoListArr.map((todo) => {
      if (todo.text === todoText) {
        return { text: todo.text, completed: !todo.completed };
      }
      return todo;
    });
  
    localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
    init();
};
  

const deleteTodo = (todoText) => {
  let todoListArr;
  if (localStorage.getItem('todoList')) {
    todoListArr = JSON.parse(localStorage.getItem('todoList'));
  } else {
    todoListArr = [];
  }

  const updatedTodoList = todoListArr.filter((todo) => {
    return todo.text !== todoText;
  });

  localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
  init();
};

// Select all filter buttons
const allFilterBtn = document.querySelector('.all-filter');
const remainingFilterBtn = document.querySelector('.remaining-filter');

// Event listener for completed filter button
completedFilterBtn.addEventListener('click', () => {
  let todoListArr = getTodoListFromLocalStorage();
  const completedTodoList = todoListArr.filter((todo) => {
    return todo.completed === true;
  });
  updateList(completedTodoList);
});

// Event listener for all filter button
allFilterBtn.addEventListener('click', () => {
  let todoListArr = getTodoListFromLocalStorage();
  updateList(todoListArr);
});

// Event listener for remaining filter button
remainingFilterBtn.addEventListener('click', () => {
  let todoListArr = getTodoListFromLocalStorage();
  const remainingTodoList = todoListArr.filter((todo) => {
    return todo.completed === false;
  });
  updateList(remainingTodoList);
});


// Add event listners for all-filter and remaining-filter
// BLUE -> ALL, RED -> PENDING TODOS
/**
 * 1. Select
 * 2. Add Event Listners for Each of Them
 */

// JSON Format -> JSON.stringify, JSON.parse
// const list = ['ljsndg', 'jsg', 'ksnbgs'];
// console.log(JSON.stringify(list));

// const obj = {
//   name: 'Aditya',
//   age: 23,
//   lastName: 'Agrawal',
//   address: {
//     city: 'Bangalore',
//     state: 'Karnataka',
//   },
// };
// console.log(obj);
// console.log(JSON.stringify(obj));
