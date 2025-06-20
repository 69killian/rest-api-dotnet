import { useQuery } from '@tanstack/react-query';

// Fonction pour récupérer toutes les catégories
const fetchCategories = async () => {
  const response = await fetch('/api/category');
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des catégories');
  }
  return response.json();
};

// Hook pour récupérer toutes les catégories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
}; 