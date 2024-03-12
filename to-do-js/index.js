const LIST_ITEM_COMPLETED_CLASS = 'list-item-completed';
const ACTIVE_CLASS = 'active';
const addForm = document.getElementById('addForm');
const todoInput = document.getElementById('todoInput');
const list = document.getElementById('list');
const listItemTemplate = document.getElementById('listItemTemplate');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const filterBtns = document.getElementById('filterBtns');
const leftCounter = document.getElementById('leftCounter');
const filters = {
    all: 'all',
    active: 'active',
    completed: 'completed'
};
let currFilter = filters.all;
let todos = [];

init();

list.addEventListener('click', onListClick);
clearCompletedBtn.addEventListener('click', onClearCompletedBtnClick);
filterBtns.addEventListener('click', onFilterBtnsClick);
addForm.addEventListener('submit', submitAddForm);

function onListClick(e) {
    const currItemElement = e.target.closest('.list-item');
    if(currItemElement) {
        const key = currItemElement.dataset.itemId;
    
        if(e.target.classList.contains('delete-btn')) {
            todos = todos.filter(todo => todo.id != key);
            localStorage.setItem('todos', JSON.stringify(todos));
            currItemElement.remove();
            updateCounter();
        } else {
            const currItem = todos.find(todo => todo.id == key);
            currItem.progress = currItem.progress === 'active' ? 'completed' : 'active';
            currItemElement.classList.toggle(LIST_ITEM_COMPLETED_CLASS);
    
            if(currFilter !== currItem.progress && currFilter !== 'all')
                currItemElement.remove();
    
            localStorage.setItem('todos', JSON.stringify(todos));
            updateCounter();
        }
    }
}

function onClearCompletedBtnClick() {
    todos = todos.filter(todo => todo.progress === 'active');
    localStorage.setItem('todos', JSON.stringify(todos));
    list.innerHTML = '';
    let items = (currFilter == filters.completed) ? filterList(filters.completed) : todos;
    items.map(renderTodo);
}

function onFilterBtnsClick(e) {
    const target = e.target;
    const btnIsActive = target.classList.contains(ACTIVE_CLASS);

    if(target.classList.contains('filter-btn') && !btnIsActive) {
        if(target.classList.contains('all-btn')) {
            currFilter = filters.all;
            renderFilter(target);
        } else if(target.classList.contains('active-todos-btn')) {
            currFilter = filters.active;
            renderFilter(target);
        } else if(target.classList.contains('completed-todos-btn')) {
            currFilter = filters.completed;
            renderFilter(target);
        }
    }
}

function submitAddForm(e) {
    e.preventDefault();
    const input = todoInput.value.trim();

    if(input) {
        const newTodoObj = createNewTodoObject(input);
        todos.push(newTodoObj);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodo(newTodoObj);
        addForm.reset();
        updateCounter();
    }
}

function createNewTodoObject(input) {
    return {
        id: new Date().valueOf(),
        value: input,
        progress: 'active'
    };
}

function init() {
    const todosStr = localStorage.getItem('todos');

    if(todosStr) {
        todos = JSON.parse(todosStr);
        todos.map(renderTodo);
        updateCounter();
    }
}

function filterList() {
    list.innerHTML = '';
    let itemsList;

    if(currFilter === filters.all)
        itemsList = todos;
    else if(currFilter === filters.active)
        itemsList = todos.filter(todo => todo.progress === 'active');
    else if(currFilter === filters.completed)
        itemsList = todos.filter(todo => todo.progress === 'completed');

    return itemsList;
}

function renderFilter(currBtn) {
    const itemsList = filterList();
    itemsList.map(renderTodo);
    filterBtns.getElementsByClassName('active')[0].classList.remove(ACTIVE_CLASS);
    currBtn.classList.add(ACTIVE_CLASS);
}

function renderTodo(todo) {
    const clone = listItemTemplate.content.cloneNode(true);
    clone.getElementById('itemContent').textContent = todo.value;
    const li = clone.querySelector('li');
    li.dataset.itemId = todo.id;

    if(todo.progress === 'completed')
        li.classList.add(LIST_ITEM_COMPLETED_CLASS);

    list.appendChild(clone);
}

function updateCounter() {
    leftCounter.innerText = todos.filter(todo => todo.progress === 'active').length;
}