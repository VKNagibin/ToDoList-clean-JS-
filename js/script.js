const createBtn = document.querySelector('.create-task-btn');
const input = document.querySelector('.new-task-input');

const uncompletedList = document.querySelector('.uncompleted-task');
const completedList = document.querySelector('.completed-task');

let toDoData = [];

function onLoad() {
    if (localStorage.getItem('toDoData')) {

        toDoData = JSON.parse(localStorage.getItem('toDoData'));
        console.log(toDoData);
        toDoData.forEach((item) => {
            if (item.completed) {
                completedList.insertAdjacentHTML('beforeend', item.li);
            } else {
                uncompletedList.insertAdjacentHTML('beforeend', item.li);
            }
        }); 
        render();

    }
};

const render = function() {
    uncompletedList.innerHTML = '';
    completedList.innerHTML = '';

    if (toDoData.length == 0) {
        localStorage.clear();
    } else {
    toDoData.forEach(function(item, index, arr) {
        const li = document.createElement('li');
        li.innerHTML = `<div class="task-wrapper">
                            <p>${item.text}</p>
                            <div class="buttons-wrapper">
                                <button class="delete-task">Delete task</button>
                                <button class="isCompleted">Done!</button>
                            </div>
                        </div>`;  
        if (item.completed) {
            completedList.append(li);
        } else {
            uncompletedList.append(li);
        }
        item.li = li.innerHTML;

        li.querySelector('.isCompleted').addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        });

        li.querySelector('.delete-task').addEventListener('click', function() {
            arr.splice(index, 1);
            render();
        })
        localStorage.toDoData = (JSON.stringify(toDoData));
    
       
    });
}
}

const createBtnClick = function(e) {
    
    e.preventDefault();

    if (!input.value == '') {

        const newToDo = {
            text: input.value,
            completed: false
        }
    
        toDoData.push(newToDo);
    
        input.value = '';
    
        render();
        
    }

};

createBtn.addEventListener('click', createBtnClick);
document.querySelector('script').addEventListener('load', onLoad);

// localStorage.clear();


