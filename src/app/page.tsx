"use client";

import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import { useUsers } from "@/hooks/useUsers";
import { Pagination } from "@/components/Pagination";
import Users from "@/components/Users";
import { User } from "@/types";
import { AlertTriangle } from "lucide-react";

export default function Home() {
  const [params, setParams] = useState({
    pageSize: 12,
    page: 1,
    search: "",
  });
  const { users, loading, error, refetch, totalCount } = useUsers(params);
  const { isDark, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredUsers = users.filter((user) => {
    if (!searchTerm) return true;
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 flex flex-col w-full justify-between">
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-8 w-full flex-col md:flex-row gap-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Directory</h1>
        <div className="flex items-center gap-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </div>
      </header>
      <main className="max-w-7xl mx-auto w-full h-full flex-1">
        {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-48 w-full"/>
              ))}
            </div>
          )
        }

        {error && (
            <div className="text-center py-12">
              <AlertTriangle className="w-24 h-24 mx-auto text-red-400 mb-4" />
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={refetch}
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Try again
              </button>
            </div>
          )
        }
        {filteredUsers && !loading && (
          <div className="flex w-full h-full mx-auto justify-center">
           <Users users={filteredUsers as User[]} />
          </div>
        )}
        {filteredUsers.length > params.pageSize -1 && !loading && mounted && (
          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={params.page}
              totalPages={Math.ceil(totalCount / params.pageSize)}
              onPageChange={(page) => {
                setParams(prev => ({ ...prev, page }));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}
      </main>

      <footer className="justify-end max-w-7xl mx-auto text-xs mt-5 py-2">
        <p>copyright@2025</p>
      </footer>
    </div>
  );
}
