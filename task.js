

import TaskManager from "./taskManager.js"
export default class Task{
    constructor(taskId, name, descrip, assign, stat, date){
        this.taskId = taskId,
        this.name = name,
        this.descrip = descrip,
        this.assign = assign,
        this.stat = stat,
        this.date =date
    }
    addToHTML()
    {   
        const addHtml = `
        <div  class="itemBox"  class="list-group" >
            <a id="${this.taskId}" id= "anchor" href="#" class="list-group-item list-group-item-action "  >
                <div id = "taskNameTag" class="d-flex w-100 justify-content-between" style="display: flex-end background-color: rgb(159, 133, 159)">
                    <h5 id="h5" class="mb-1">${this.name}</h5>
                    <button class="edit btn btn-danger btn-sm"  value="${this.taskId}" style = "background-color: gainsboro;color: blue;display:flex; border-color:gainsboro;">           
                    Edit</button>
                    <button class="delete btn btn-danger btn-sm" value="${this.taskId}" style = "background-color: gainsboro;color: red; border-color:gainsboro;">
                    X</button>
                </div>
                <div>
                    <p class="mb-1"><small>${this.descrip}</small></p>
                </div>
                <div class="d-flex">
                    <small class= "text-muted">
                        Due by ${this.date}    ${this.assign}   <span style="${this.stat === "Done" ? "color: green": "color:black"}"> ${this.stat} </span>   
                    </small>
                </div>
            </a>  
            
        </div>
    `;
    return addHtml;
    }
}