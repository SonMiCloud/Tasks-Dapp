// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract TasksContract{
    uint public taskCounter = 0;
    struct Task{
        uint id;
        string title;
        string description;
        bool done;
        uint createdAt;
    }

    event TaskCreated(
        uint id,
        string title,
        string description,
        bool done,
        uint createdAt
    );
    
    event TaskToggleDone(uint id, bool done);

    mapping (uint => Task) public tasks;

    constructor(){
        createTask('Tarea inicial', 'Tarea que se crea en el constructor');
    }

    function createTask(string memory _title, string memory _description) public {
        taskCounter ++;
        tasks[taskCounter] = Task(taskCounter, _title, _description, false, block.timestamp);

        emit TaskCreated(taskCounter, _title, _description, false, block.timestamp);
    }

    function toggleDone(uint _id) public{
       Task memory _task = tasks[_id];
      _task.done = !(_task.done);
      tasks[_id] = _task;

      emit TaskToggleDone(_id, _task.done);
    }

}