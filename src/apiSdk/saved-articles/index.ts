import axios from 'axios';
import queryString from 'query-string';
import { SavedArticleInterface, SavedArticleGetQueryInterface } from 'interfaces/saved-article';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSavedArticles = async (
  query?: SavedArticleGetQueryInterface,
): Promise<PaginatedInterface<SavedArticleInterface>> => {
  const response = await axios.get('/api/saved-articles', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSavedArticle = async (savedArticle: SavedArticleInterface) => {
  const response = await axios.post('/api/saved-articles', savedArticle);
  return response.data;
};

export const updateSavedArticleById = async (id: string, savedArticle: SavedArticleInterface) => {
  const response = await axios.put(`/api/saved-articles/${id}`, savedArticle);
  return response.data;
};

export const getSavedArticleById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/saved-articles/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSavedArticleById = async (id: string) => {
  const response = await axios.delete(`/api/saved-articles/${id}`);
  return response.data;
};
