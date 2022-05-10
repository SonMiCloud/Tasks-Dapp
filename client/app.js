App = {
    contracts:[],

    init: async () => {
    console.log("Loaded");
    await App.loadEthereum();
    await App.loadContracts();
    App.render();
    await App.renderTasks();
    },

    loadEthereum: async () => {
        if (window.ethereum) {
        App.web3Provider = window.ethereum;
        accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        App.account = accounts[0];
        } /*else if (web3) {
        web3 = new Web3(window.web3.currentProvider);
        } */else {
        console.log( "No ethereum browser is installed. Try it installing MetaMask ");
        }
    },
  
    loadContracts: async () => {
        try {
          const res = await fetch("TasksContract.json");
          const tasksContractJSON = await res.json();
          App.contracts.TasksContract = TruffleContract(tasksContractJSON);
          App.contracts.TasksContract.setProvider(App.web3Provider);
    
          App.tasksContract = await App.contracts.TasksContract.deployed();
        } catch (error) {
          console.error(error);
        }
      },

      render: () => {
           document.getElementById('account').innerText = App.account;
      },

      renderTasks: async () => {
        const taskCounter = await App.tasksContract.taskCounter();
        const taskCounterNumber = taskCounter.toNumber();
        console.log(taskCounterNumber);

        var html = "";

        for (let i=1; i<= taskCounterNumber; i++){
          const task =  await App.tasksContract.tasks(i);
          const idTask = task[0].toNumber();
          const titleTask = task[1];
          const descriptionTask = task[2];
          const doneTask = task[3];
          const createdTask = task[4];
          
          let taskElement = `<div class="card bg-dark rounded-0 mb-2">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span>${titleTask}</span>
            <div class="form-check form-switch">
            <input class="form-check-input" data-id="${idTask}" type="checkbox" onchange="App.toggleDone(this)" 
            ${doneTask === true && "checked"
            }>
            </div>
          </div>
          <div class="card-body">
            <span>${descriptionTask}</span>
            <p class="text-mute">${new Date(createdTask * 1000).toLocaleString()}</p>
          </div>
         </div>`;
        html += taskElement;
        
      }
  
      document.getElementById('taskList').innerHTML = html;
      },
      toggleDone: async (element) => {
        const taskId = element.dataset.id;

        await App.tasksContract.toggleDone(taskId, {from:App.account});

      },

      createTask: async(title, description) => {
          const result = await App.tasksContract.createTask(title, description, {from:App.account});
          console.log(result);

      }
    
    
    
    
    };

    
App.init();