import {todos} from "./todos.js";
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';




const printCrntStatus = (todos) => {
    console.log(`현재 상태: todo: ${todos.length}개, doing: ${todos.filter(todo => todo.status == "doing").length}개, done: ${todos.filter(todo=>todo.status == "done").length}개`);
}
const showTodo = (type) => {
    if (type == "all"){
        printCrntStatus(todos);
    } else if (type == "todo"){
        console.log(`todo 리스트: 총 ${todos.length}건: `);
        todos.map((todo) => {
            console.log(`'${todo.name}, ${todo.id}번', `);
        })
    }
}
const addTodo = (name, tag) => {
    const id = Math.floor(Math.random()*10000);
    todos.push({
        name,
        id,
        tags:JSON.parse(tag)
    })
    console.log(`${name} 1개가 추가되었습니다.(id: ${id})`)
}
const deleteTodo = (target_id) => {
    const target_idx = todos.findIndex(todo=> todo.id == target_id);
    const target_name = todos[target_idx].name;
    todos.splice(target_idx,1);
    console.log(`${target_name} todo가 목록에서 삭제되었습니다.`);
}
const updateTodo = (target_id, new_status) => {
    const target_idx = todos.findIndex(todo => todo.id == target_id);
    todos[target_idx].status = new_status;
    console.log(`${todos[target_idx].name} ${new_status}로 상태 변경되었습니다.`);
}

const rl = readline.createInterface({
    input,
    output
})

rl.setPrompt("명령하세요: ");
rl.prompt();
rl.on('line', (line) => {
    const cmd_elems = line.split("$");

    switch(cmd_elems[0]){
        case "show":
            showTodo(cmd_elems[1])
            break;
        case "add":
            addTodo(cmd_elems[1], cmd_elems[2]);
            printCrntStatus(todos);
            break;
        case "delete":
            deleteTodo(cmd_elems[1]);
            printCrntStatus(todos);
            break;
        case "update":
            updateTodo(cmd_elems[1], cmd_elems[2]);
            printCrntStatus(todos);
            break;
    }
    
    rl.prompt();
})

