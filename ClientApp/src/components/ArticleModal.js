import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ArticleModal = ({ isOpen, onClose, onSave, article, categories, isLoading }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (isOpen) {
      if (article) {
        reset({
          title: article.title,
          content: article.content,
          categoryId: article.categoryId
        });
      } else {
        reset({
          title: '',
          content: '',
          categoryId: categories.length > 0 ? categories[0].id : ''
        });
      }
    }
  }, [isOpen, article, categories, reset]);

  if (!isOpen) {
    return null;
  }

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-[#232336] p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-purple-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {article ? 'Modifier l\'article' : 'Créer un nouvel article'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-purple-400 text-sm font-bold mb-2">
              Titre
            </label>
            <input
              type="text"
              id="title"
              {...register('title', { required: 'Le titre est requis' })}
              className="shadow appearance-none border border-gray-700 rounded-lg w-full py-2 px-3 bg-[#181824] text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="content" className="block text-purple-400 text-sm font-bold mb-2">
              Contenu
            </label>
            <textarea
              id="content"
              rows="5"
              {...register('content', { required: 'Le contenu est requis' })}
              className="shadow appearance-none border border-gray-700 rounded-lg w-full py-2 px-3 bg-[#181824] text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.content && (
              <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="category" className="block text-purple-400 text-sm font-bold mb-2">
              Catégorie
            </label>
            <select
              id="category"
              {...register('categoryId', { required: 'La catégorie est requise' })}
              className="shadow appearance-none border border-gray-700 rounded-lg w-full py-2 px-3 bg-[#181824] text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-400 text-sm mt-1">{errors.categoryId.message}</p>
            )}
          </div>
          
          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200 disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200 disabled:opacity-50"
            >
              {isLoading ? 'Enregistrement...' : (article ? 'Enregistrer les modifications' : 'Créer')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleModal; 