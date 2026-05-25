import { useEffect, useState } from 'react';
import { Users, Mail, Calendar, RefreshCw, User as UserIcon } from 'lucide-react';
import { supabase, type User } from '../lib/supabase';

interface UsersListProps {
  refreshTrigger: number;
}

export function UsersList({ refreshTrigger }: UsersListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw new Error('Falha ao buscar usuários');
      }

      setUsers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-3 shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Usuários Cadastrados</h2>
            <p className="text-sm text-gray-600">{users.length} usuário{users.length !== 1 ? 's' : ''} cadastrado{users.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <button
          onClick={fetchUsers}
          disabled={loading}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          title="Atualizar lista"
        >
          <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl mb-6">
          <p className="text-sm text-red-700 font-medium">{error}</p>
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="text-center py-12">
          <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg font-medium">Nenhum usuário cadastrado ainda</p>
          <p className="text-gray-400 text-sm mt-2">Cadastre o primeiro usuário usando o formulário acima</p>
        </div>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {users.map((user, index) => (
            <div
              key={user.id}
              className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-xl p-6 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-white font-bold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-gray-900 truncate">{user.name}</h3>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm truncate">{user.email}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <UserIcon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-medium">{user.age} anos</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span className="text-xs">{formatDate(user.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
