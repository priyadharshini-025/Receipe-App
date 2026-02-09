import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1";
const API_URL_LIST = "https://www.themealdb.com/api/json/v1/1/list.php?"

export const searchReceipe = async (term) => {
  const res = await axios.get(`${API_URL}/search.php?s=${term}`);
  return res.data.meals || [];
};

export const getMealDetails = async (id) => {
  const res = await axios.get(`${API_URL}/lookup.php?i=${id}`);
  return res.data.meals;
};

export const getCategories = async () => {
  const res = await axios.get(`${API_URL_LIST}c=list`);
  return res.data.meals;
};

export const getIngredients = async () => {
  const res = await axios.get(`${API_URL_LIST}i=list`);
  return res.data.meals;
};