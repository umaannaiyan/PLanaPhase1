import Task from "./task";
import { TestScheduler } from "jest";

const task = new Task(
        "task1",
        "Groceries",
        "Please buy milk and youghurt",
        "uma",
        "done",
        "2020-08-20"
);

test("object creation", () => {
    expect(task.taskId).toBe("task1");
    expect(task.name).toBe("Groceries");
    expect(task.descrip).toBe("Please buy milk and youghurt");
    expect(task.assign).toBe("uma");
    expect(task.stat).toBe("done");
    expect(task.date).toBe("2020-08-20");
});

test("check html whether it conatins taskid", () => {
    
    const addToHTML = task.addToHTML();
    expect(addToHTML).toContain("task1");
    expect(addToHTML).toContain("Groceries");
    expect(addToHTML).toContain("Please buy milk and youghurt");
    expect(addToHTML).toContain("uma");
    expect(addToHTML).toContain("done");
    expect(addToHTML).toContain("2020-08-20");
});

test("Should be able to add Task element to Dom", () =>{
    const element = task.addToHTML();
    document.body.append(element);
    expect(document.body.children.length).toBe(1);
})


    
