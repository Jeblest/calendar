import axios from "axios";

export async function createTask(task) {
  try {
    const res = await axios({
      method: "POST",
      data: task,
      url: "http://localhost:3000/task",
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getTasks() {
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:3000/task",
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateTask(id, task) {
  try {
    const res = await axios({
      method: "PUT",
      data: task,
      url: `http://localhost:3000/task/${id}`,
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTask(id) {
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://localhost:3000/task/${id}`,
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function createGoal(goal) {
    try {
      const res = await axios({
        method: 'POST',
        data: goal,
        url: 'http://localhost:3000/goal', // Update the URL for goals
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  export async function getGoals() {
    try {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:3000/goal', // Update the URL for goals
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  
  export async function updateGoal(id, goal) {
    try {
      const res = await axios({
        method: 'PUT',
        data: goal,
        url: `http://localhost:3000/goal/${id}`, // Update the URL for goals
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  export async function deleteGoal(id) {
    try {
      const res = await axios({
        method: 'DELETE',
        url: `http://localhost:3000/goal/${id}`, // Update the URL for goals
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  }
  
