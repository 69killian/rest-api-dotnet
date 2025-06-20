import React, { useState, useEffect } from 'react';

const ArticleModal = ({ isOpen, onClose, onSave, article, categories }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setContent(article.content);
      setCategoryId(article.categoryId);
    } else {
      setTitle('');
      setContent('');
      setCategoryId(categories.length > 0 ? categories[0].id : '');
    }
  }, [article, isOpen, categories]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !categoryId) {
        alert("Veuillez remplir tous les champs.");
        return;
    }
    onSave({ title, content, categoryId });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-[#232336] p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-purple-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">{article ? 'Modifier l\'article' : 'Créer un nouvel article'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-purple-400 text-sm font-bold mb-2">Titre</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border border-gray-700 rounded-lg w-full py-2 px-3 bg-[#181824] text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-purple-400 text-sm font-bold mb-2">Contenu</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="5"
              className="shadow appearance-none border border-gray-700 rounded-lg w-full py-2 px-3 bg-[#181824] text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="category" className="block text-purple-400 text-sm font-bold mb-2">Catégorie</label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="shadow appearance-none border border-gray-700 rounded-lg w-full py-2 px-3 bg-[#181824] text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
            >
              {article ? 'Enregistrer les modifications' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleModal; 