import React from 'react';

const CategoryList = ({ categories, onSelectCategory, selectedCategory }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-white mb-4">Catégories</h3>
        <ul className="space-y-2">
            <li>
                <button
                    onClick={() => onSelectCategory(null)}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${!selectedCategory ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                >
                    Toutes
                </button>
            </li>
            {categories.map(category => (
                <li key={category.id}>
                    <button
                        onClick={() => onSelectCategory(category.id)}
                        className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${selectedCategory === category.id ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    >
                        {category.name}
                    </button>
                </li>
            ))}
        </ul>
    </div>
  );
};

export default CategoryList; 