const TasksContract = artifacts.require("TasksContract");

contract ("TasksContract", () => {
    before(async () => {
       this.tc = await TasksContract.deployed()
    })

    it ('migrate deployed succesfully', async() => {
        const address = await this.tc.address;
        assert.notEqual = (address, null);
        assert.notEqual = (address, undefined);
        assert.notEqual = (address, 0x0);
        assert.notEqual = (address, "");
    })

    it('get tasks list', async() => {
        const counter = await this.tc.taskCounter();
        const task = await this.tc.tasks(counter);

        assert.equal = (counter, task.id.toNumber());
        assert.equal = ('Tarea inicial', task.title);
        assert.equal = ('Tarea que se crea en el constructor', task.descrition);
        assert.equeal = (false, task.done);
    })

    it ('task toggle successfully', async() => {
        const result = await this.tc.toggleDone(1);

        assert.equal = (true, result.logs[0].args.done);

    })
})

