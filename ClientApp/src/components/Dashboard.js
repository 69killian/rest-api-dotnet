import React, { useState, useEffect } from 'react';
import ArticleList from './ArticleList';
import ArticleModal from './ArticleModal';

const Dashboard = () => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState(null);

    // Data fetching
    const fetchArticles = async () => {
        try {
            const response = await fetch('/api/article');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setArticles(data || []);
        } catch (error) {
            console.error("Erreur lors de la récupération des articles:", error);
            setArticles([]);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/category');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setCategories(data || []);
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories:", error);
            setCategories([]);
        }
    };

    useEffect(() => {
        fetchArticles();
        fetchCategories();
    }, []);

    // Modal handling
    const handleOpenModal = (article = null) => {
        setEditingArticle(article);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingArticle(null);
        setIsModalOpen(false);
    };

    // CRUD operations
    const handleSaveArticle = async (articleData) => {
        const isEditing = !!editingArticle;
        const url = isEditing ? `/api/article/${editingArticle.id}` : '/api/article';
        const method = isEditing ? 'PUT' : 'POST';

        const payload = {
            title: articleData.title,
            content: articleData.content,
            categoryId: Number(articleData.categoryId)
        };

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                 const errorBody = await response.text();
                 console.error("Erreur de sauvegarde:", errorBody);
                 throw new Error('La sauvegarde a échoué');
            }
            
            await fetchArticles(); // Re-fetch all articles to get the latest list
            handleCloseModal();

        } catch (error) {
            console.error("Erreur lors de la sauvegarde de l'article:", error);
            alert("Une erreur est survenue lors de la sauvegarde.");
        }
    };

    const handleDeleteArticle = async (articleId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
            try {
                const response = await fetch(`/api/article/${articleId}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('La suppression a échoué');
                
                await fetchArticles(); // Re-fetch
            } catch (error) {
                console.error("Erreur lors de la suppression de l'article:", error);
                alert("Une erreur est survenue lors de la suppression.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f1a] text-white p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Statistics Cards */}
                <div className="flex gap-8 mb-10 justify-center">
                    <div className="bg-[#232336] rounded-2xl shadow-xl p-8 flex flex-col items-center w-56 border border-purple-700">
                        <span className="text-5xl font-extrabold text-purple-400 drop-shadow">{articles.length}</span>
                        <span className="mt-3 text-lg text-gray-300">Articles</span>
                    </div>
                    <div className="bg-[#232336] rounded-2xl shadow-xl p-8 flex flex-col items-center w-56 border border-indigo-700">
                        <span className="text-5xl font-extrabold text-indigo-400 drop-shadow">{categories.length}</span>
                        <span className="mt-3 text-lg text-gray-300">Catégories</span>
                    </div>
                </div>

                {/* Create Article Button */}
                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 border border-purple-500"
                    >
                        ➕ Créer un article
                    </button>
                </div>

                {/* Article List */}
                <ArticleList 
                    articles={articles}
                    onEdit={handleOpenModal}
                    onDelete={handleDeleteArticle}
                    search={search}
                    setSearch={setSearch}
                    filterCategory={filterCategory}
                    setFilterCategory={setFilterCategory}
                    categories={categories}
                />
            </div>

            <ArticleModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveArticle}
                article={editingArticle}
                categories={categories}
            />
        </div>
    );
};

export default Dashboard; 