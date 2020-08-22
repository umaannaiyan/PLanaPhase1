import Task from "./task.js"  
 

export default class TaskManager{
    constructor(task){
    
        //   this.taskList = JSON.parse(localStorage.getItem("Banana")) || [];   
          this.currentId= parseInt(localStorage.getItem('CurrentID')) || 1;
          localStorage.setItem('CurrentID', this.currentId);       
}
addTask(name,descrip,assign,stat,date){
    const task = new Task(
       `task${this.currentId++}`,
        name,
        descrip,
        assign,
        stat,
        date
    );
    
    localStorage.setItem('CurrentID', this.currentId);
    let myNewTasks = JSON.parse(localStorage.getItem("Banana")) || [];
    myNewTasks.push(task);
    localStorage.setItem('Banana', JSON.stringify(myNewTasks));
}
    
deleteTask(id){
    
    let myTaskList = JSON.parse(localStorage.getItem("Banana"));
    myTaskList=myTaskList.filter(m => m.taskId !== id);
    localStorage.setItem("Banana", JSON.stringify(myTaskList));
            
}
updateTask(taskId,name,descrip,assign,stat,date){

    let myTaskList = JSON.parse(localStorage.getItem("Banana")); 
    console.log(myTaskList.length);
    for(let i=0;i< myTaskList.length;i++){
        if(myTaskList[i].taskId === taskId){
            myTaskList[i].name = name,
            myTaskList[i].descrip = descrip,
            myTaskList[i].assign = assign,
            myTaskList[i].stat = stat,
            myTaskList[i].date = date;
            localStorage.setItem("Banana", JSON.stringify(myTaskList));
            break;
     }
    }
}
assignTask(taskId, assign){}
}