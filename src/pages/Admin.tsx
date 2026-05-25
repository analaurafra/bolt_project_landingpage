import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { UserForm } from '../components/UserForm';
import { UsersList } from '../components/UsersList';
import type { User } from '../lib/supabase';
import { ArrowLeft } from 'lucide-react';

export function Admin() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUserAdded = useCallback((user: User) => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8 font-semibold transition">
            <ArrowLeft className="w-5 h-5" />
            Voltar para Landing Page
          </Link>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>Desenvolvido com Supabase</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Painel de Administração
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Cadastre usuários facilmente com nosso formulário moderno. Todos os dados são armazenados de forma segura no Supabase.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex justify-center">
              <UserForm onUserAdded={handleUserAdded} />
            </div>

            <div className="flex justify-center">
              <UsersList refreshTrigger={refreshTrigger} />
            </div>
          </div>

          <footer className="mt-16 text-center text-sm text-gray-400">
            <p>Desenvolvido com React, TypeScript, Tailwind CSS e Supabase</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
