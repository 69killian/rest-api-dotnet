import React from "react";

const ArticleList = ({ articles, onEdit, onDelete, search, setSearch, filterCategory, setFilterCategory, categories }) => {
  // Vérification que articles existe et est un tableau
  if (!articles || !Array.isArray(articles)) {
    return (
      <div className="bg-[#232336] rounded-2xl shadow-xl p-8">
        <div className="text-center py-8 text-gray-400">
          Chargement des articles...
        </div>
      </div>
    );
  }

  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.content.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      !filterCategory || a.categoryId === Number(filterCategory);
    return matchesSearch && matchesCategory;
  });

  if (filteredArticles.length === 0) {
    return (
      <div className="bg-[#232336] rounded-2xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="🔍 Rechercher un article..."
            className="flex-1 px-4 py-2 rounded-lg bg-[#181824] text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="px-4 py-2 rounded-lg bg-[#181824] text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-700"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Toutes les catégories</option>
            {categories && categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="text-center py-8 text-gray-400">
          Aucun article trouvé.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#232336] rounded-2xl shadow-xl p-8">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="🔍 Rechercher un article..."
          className="flex-1 px-4 py-2 rounded-lg bg-[#181824] text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-4 py-2 rounded-lg bg-[#181824] text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-700"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Toutes les catégories</option>
          {categories && categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-purple-700">
              <th className="py-3 px-4 text-purple-400 text-lg">Titre</th>
              <th className="py-3 px-4 text-purple-400 text-lg">Catégorie</th>
              <th className="py-3 px-4 text-purple-400 text-lg">Contenu</th>
              <th className="py-3 px-4 text-purple-400 text-lg">Créé le</th>
              <th className="py-3 px-4 text-purple-400 text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map((a) => (
              <tr key={a.id} className="border-b border-gray-800 hover:bg-[#1e1e2f] transition">
                <td className="py-2 px-4 font-semibold">{a.title}</td>
                <td className="py-2 px-4">{a.category && a.category.name ? a.category.name : "-"}</td>
                <td className="py-2 px-4 max-w-xs truncate">{a.content}</td>
                <td className="py-2 px-4 text-sm text-gray-400">{new Date(a.createdAt).toLocaleString()}</td>
                <td className="py-2 px-4">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => onEdit(a)}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded text-sm transition-colors duration-200"
                    >
                      Modifier
                    </button>
                    <button 
                      onClick={() => onDelete(a.id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm transition-colors duration-200"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArticleList; 