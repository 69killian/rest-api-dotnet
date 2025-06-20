import React, { useState } from 'react';
import ArticleList from './ArticleList';
import ArticleModal from './ArticleModal';
import { useArticles, useCategories, useCreateArticle, useUpdateArticle, useDeleteArticle } from '../hooks/useArticles';
import { useCategories as useCategoriesHook } from '../hooks/useCategories';

const Dashboard = () => {
    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState(null);

    // TanStack Query hooks
    const { data: articles = [], isLoading: articlesLoading, error: articlesError } = useArticles();
    const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useCategoriesHook();
    
    const createArticleMutation = useCreateArticle();
    const updateArticleMutation = useUpdateArticle();
    const deleteArticleMutation = useDeleteArticle();

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
        try {
            if (editingArticle) {
                await updateArticleMutation.mutateAsync({
                    id: editingArticle.id,
                    ...articleData
                });
            } else {
                await createArticleMutation.mutateAsync(articleData);
            }
            handleCloseModal();
        } catch (error) {
            console.error("Erreur lors de la sauvegarde de l'article:", error);
            alert(error.message || "Une erreur est survenue lors de la sauvegarde.");
        }
    };

    const handleDeleteArticle = async (articleId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
            try {
                await deleteArticleMutation.mutateAsync(articleId);
            } catch (error) {
                console.error("Erreur lors de la suppression de l'article:", error);
                alert(error.message || "Une erreur est survenue lors de la suppression.");
            }
        }
    };

    // Gestion des erreurs
    if (articlesError) {
        return (
            <div className="min-h-screen bg-[#0f0f1a] text-white p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-red-400">Erreur lors du chargement des articles: {articlesError.message}</p>
                </div>
            </div>
        );
    }

    if (categoriesError) {
        return (
            <div className="min-h-screen bg-[#0f0f1a] text-white p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-red-400">Erreur lors du chargement des catégories: {categoriesError.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f0f1a] text-white p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Statistics Cards */}
                <div className="flex gap-8 mb-10 justify-center">
                    <div className="bg-[#232336] rounded-2xl shadow-xl p-8 flex flex-col items-center w-56 border border-purple-700">
                        <span className="text-5xl font-extrabold text-purple-400 drop-shadow">
                            {articlesLoading ? "..." : articles.length}
                        </span>
                        <span className="mt-3 text-lg text-gray-300">Articles</span>
                    </div>
                    <div className="bg-[#232336] rounded-2xl shadow-xl p-8 flex flex-col items-center w-56 border border-indigo-700">
                        <span className="text-5xl font-extrabold text-indigo-400 drop-shadow">
                            {categoriesLoading ? "..." : categories.length}
                        </span>
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
                    isLoading={articlesLoading}
                />
            </div>

            <ArticleModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveArticle}
                article={editingArticle}
                categories={categories}
                isLoading={createArticleMutation.isPending || updateArticleMutation.isPending}
            />
        </div>
    );
};

export default Dashboard; 