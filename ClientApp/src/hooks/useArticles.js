import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fonction pour récupérer tous les articles
const fetchArticles = async () => {
  const response = await fetch('/api/article');
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des articles');
  }
  return response.json();
};

// Fonction pour créer un article
const createArticle = async (articleData) => {
  const response = await fetch('/api/article', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(articleData),
  });
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || 'Erreur lors de la création de l\'article');
  }
  return response.json();
};

// Fonction pour mettre à jour un article
const updateArticle = async ({ id, ...articleData }) => {
  const response = await fetch(`/api/article/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(articleData),
  });
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || 'Erreur lors de la mise à jour de l\'article');
  }
  return response.json();
};

// Fonction pour supprimer un article
const deleteArticle = async (id) => {
  const response = await fetch(`/api/article/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la suppression de l\'article');
  }
  return response.json();
};

// Hook pour récupérer tous les articles
export const useArticles = () => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles,
  });
};

// Hook pour créer un article
export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

// Hook pour mettre à jour un article
export const useUpdateArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

// Hook pour supprimer un article
export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
}; 