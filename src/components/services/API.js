import axios from 'axios';

const URL = 'https://6460e7b0491f9402f49a6505.mockapi.io/homechecker/notes';

export async function getNotes() {
  try {
    const response = await axios.get(URL);

    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function addNotes(obj) {
  try {
    const response = await axios.post(URL,obj);

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteNotes(id) {
  try {
    const response = await axios.delete(`${URL}/${id}`);

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function modifyNotes(id, object) {
  try {
    const response = await axios.put(`${URL}/${id}`, object);

    return response;
  } catch (error) {
    console.log(error);
  }
}

// post
