import axios from "axios";

export async function createItem(type, item) {
  try {
    const res = await axios({
      method: "POST",
      data: item,
      url: `http://localhost:3000/${type}`,
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getItems(type) {
  try {
    const res = await axios({
      method: "GET",
      url: `http://localhost:3000/${type}`,
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateItem(type, id, item) {
  try {
    const res = await axios({
      method: "PUT",
      data: item,
      url: `http://localhost:3000/${type}/${id}`,
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteItem(type, id) {
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://localhost:3000/${type}/${id}`,
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
}
