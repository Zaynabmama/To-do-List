document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');
    const addTaskForm = document.getElementById('addTaskForm');
    const descriptionInput = document.getElementById('descriptionInput');
    const assignmentInput = document.getElementById('assignmentInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const searchInput = document.getElementById('searchInput');
  
    let tasks = [
        {
          description: "Finish project design",
          assignmentTo: "Zaynab Mama",
          dueDate: "2024-05-30",
          status: "past due",
          action: false
        },
        {
          description: "Review client feedback",
          assignmentTo: "Sarah Ahmad",
          dueDate: "2023-08-05",
          status: "completed",
          action: true
        },
        {
            description: "Review client feedback",
            assignmentTo: "Mariam ib",
            dueDate: "2024-08-05",
            status: "pending",
            action: false
          },
        {
          description: "Prepare presentation slides",
          assignmentTo: "Bassel Metlej",
          dueDate: "2024-27-06",
          status: "pending",
          action: false
        }
      ];
      //function saveTasksToLocalStorage(){
      //  localStorage.setItem("data",container.innerHTML)
     // }
  
    function Tasks(filteredTasks = null) {
      taskList.innerHTML = '';
      const tasksToRender = filteredTasks ? filteredTasks : tasks;
      tasksToRender.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${task.description}</td>
          <td>${task.assignmentTo}</td>
          <td>${task.dueDate}</td>
          <td class="status ${getStatusClass(task.status)}">${task.status}</td>
          <td><input type="checkbox" ${task.status === 'completed' ? 'checked' : ''}></td>
        `;
        row.dataset.index = index;
  
        if (task.status === 'completed') {
          row.classList.add('completed');
        } else if (isPastDue(task.dueDate)) {
          row.querySelector('.status').classList.add('status-past-due');
        }
  
        taskList.appendChild(row);
  
        
        row.querySelector('input[type="checkbox"]').addEventListener('change', () => {
          if (row.querySelector('input[type="checkbox"]').checked) {
            tasks[index].status = 'completed';
            row.classList.add('status-completed');
            row.querySelector('.status').textContent = 'completed';
          } else {
            tasks[index].status = 'pending';
            row.classList.remove('completed');
           
            row.querySelector('.status').textContent = 'pending';
          }
        });
      });
    }
  
    function isPastDue(dueDateString) {
      const dueDate = new Date(dueDateString);
      const today = new Date();
      return dueDate < today;
    }
  
    function getStatusClass(status) {
      if (status === 'completed') {
        return 'status-completed';
      } else if (isPastDue(status.dueDate)) {
        return 'status-past-due';
      } else {
        return '';
      }
    }
  
  
    addTaskForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const newTask = {
        description: descriptionInput.value.trim(),
        assignmentTo: assignmentInput.value.trim(),
        dueDate: dueDateInput.value,
        status: 'pending'
      };
  
      if (newTask.description && newTask.assignmentTo && newTask.dueDate) {
        tasks.push(newTask);
        Tasks();
        descriptionInput.value = '';
        assignmentInput.value = '';
        dueDateInput.value = '';
      } else {
        alert('Please fill out all fields.');
      }
    });
  
    searchInput.addEventListener("input", function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTasks = tasks.filter(function(task) {
          return (
            task.description.toLowerCase().includes(searchTerm) ||
            task.assignmentTo.toLowerCase().includes(searchTerm) ||
            task.dueDate.includes(searchTerm)
          );
        });
        Tasks(filteredTasks);
      });
  
    Tasks(); 


 
  
 // function addTask(task) {
  //  const tasks = getTasksFromLocalStorage();
  //  tasks.push({ text: task, completed: false });
    //saveTasksToLocalStorage(tasks);
  //}
  

  
  });
  