import axios from "axios";


export async function createTask(task){
    try{
        const res = await axios({
            method:"POST",
            data:task,
            url:"http://localhost:3000/task",
            withCredentials:true
        })
        console.log(res);
    }catch(error){
        console.log(error);
    }
}   

export async function getTasks(){
    try{
        const res = await axios({
            method:"GET",
            url:"http://localhost:3000/task",
            withCredentials:true
        })
        console.log(res);
        return res.data;
    }catch(error){
        console.log(error);
    }
}

export async function updateTask(id,task){
    try{
        const res = await axios({
            method:"PUT",
            data:task,
            url:`http://localhost:3000/task/${id}`,
            withCredentials:true
        })
        console.log(res);
    }catch(error){
        console.log(error);
    }
}

export async function deleteTask(id){
    try{
        const res = await axios({
            method:"DELETE",
            url:`http://localhost:3000/task/${id}`,
            withCredentials:true
        })
        console.log(res);
    }catch(error){
        console.log(error);
    }
}