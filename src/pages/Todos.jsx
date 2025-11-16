import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

const TodoApp = () => {
  const [filter, setFilter] = useState('All');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [todos, setTodos] = useState([
    { id: 1, title: 'delectus aut autem', completed: false },
    { id: 2, title: 'quis ut nam facilis et officia qui', completed: false },
    { id: 3, title: 'fugiat veniam minus', completed: false },
    { id: 4, title: 'et porro tempora', completed: true },
    { id: 5, title: 'laboriosam mollitia et enim quasi adipisci quia provident illum', completed: false },
    { id: 6, title: 'qui ullam ratione quibusdam voluptatem quia omnis', completed: false },
    { id: 7, title: 'illo expedita consequatur quia in', completed: false },
    { id: 8, title: 'quo adipisci enim quam ut ab', completed: true },
    { id: 9, title: 'molestiae perspiciatis ipsa', completed: false },
    { id: 10, title: 'illo est ratione doloremque quia maiores aut', completed: true },
    { id: 11, title: 'vero rerum temporibus dolor', completed: true },
    { id: 12, title: 'ipsa repellendus fugit nisi', completed: true },
    { id: 13, title: 'et doloremque nulla', completed: false },
  ]);

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Waiting') return !todo.completed;
    if (filter === 'Done') return todo.completed;
    return true;
  });

  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedTodos = filteredTodos.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {/* <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">C</div>
            <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">S</div>
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">I</div>
            <div className="w-12 h-12 bg-cyan-400 rounded-lg flex items-center justify-center text-white font-bold text-xl">2</div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">U</div>
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">S</div>
          </div>
          <div className="bg-black text-white px-6 py-2 rounded-lg inline-block font-bold text-sm">
            FRONT END SOFTWARE DEVELOPMENT
          </div>
        </div> */}

        {/* Filter and Items per page */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Show only</span>
              <div className="flex gap-2">
                {['All', 'Waiting', 'Done'].map(filterType => (
                  <button
                    key={filterType}
                    onClick={() => {
                      setFilter(filterType);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      filter === filterType
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filterType} {filterType === 'Waiting' && '⏱️'}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">5 items per page</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded-lg px-3 py-1"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-4 py-3 text-left w-20">ID</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-right w-48">Completed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedTodos.map((todo, index) => (
                  <tr
                    key={todo.id}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-4 py-3">
                      <div className="w-8 h-8 bg-gray-500 rounded flex items-center justify-center text-white font-medium">
                        {todo.id}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{todo.title}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleTodo(todo.id)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            todo.completed
                              ? 'bg-green-600 text-white'
                              : 'bg-yellow-500 text-white'
                          }`}
                        >
                          {todo.completed ? 'done' : 'Waiting ⏱️'}
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-600">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Last
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="flex justify-center gap-2 mb-4">
            <span className="bg-gray-800 text-white px-3 py-1 rounded text-sm">SPU</span>
            <span className="text-gray-600">-</span>
            <span className="bg-gray-800 text-white px-3 py-1 rounded text-sm">CSI</span>
            <span className="text-gray-600">-</span>
            <span className="bg-gray-800 text-white px-3 py-1 rounded text-sm">205</span>
          </div>
          <div className="flex justify-center gap-4">
            <a href="#" className="text-blue-600 hover:text-blue-700">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" className="text-cyan-500 hover:text-cyan-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="#" className="text-red-600 hover:text-red-700">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="#" className="text-gray-800 hover:text-gray-900">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
            </a>
            <a href="#" className="text-pink-600 hover:text-pink-700">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;