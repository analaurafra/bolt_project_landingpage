import { useState, type FormEvent } from 'react';
import { UserPlus, Send } from 'lucide-react';
import { supabase, type User } from '../lib/supabase';

interface UserFormProps {
  onUserAdded: (user: User) => void;
}

export function UserForm({ onUserAdded }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const age = parseInt(formData.age, 10);

      if (isNaN(age) || age <= 0 || age >= 150) {
        throw new Error('Por favor, insira uma idade válida entre 1 e 149');
      }

      if (!formData.name.trim()) {
        throw new Error('Nome é obrigatório');
      }

      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        throw new Error('Por favor, insira um email válido');
      }

      const { data, error: insertError } = await supabase
        .from('users')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            age,
          },
        ])
        .select()
        .single();

      if (insertError) {
        if (insertError.code === '23505') {
          throw new Error('Este email já está cadastrado');
        }
        throw new Error('Falha ao cadastrar usuário. Tente novamente.');
      }

      if (data) {
        onUserAdded(data);
        setFormData({ name: '', email: '', age: '' });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro inesperado');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-3 shadow-lg">
          <UserPlus className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Cadastro de Usuário</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Nome Completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="João Silva"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Endereço de Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="joao@exemplo.com"
            required
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-semibold text-gray-700 mb-2">
            Idade
          </label>
          <input
            id="age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            disabled={isSubmitting}
            min="1"
            max="149"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="25"
            required
          />
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-xl">
            <p className="text-sm text-emerald-700 font-medium">Usuário cadastrado com sucesso!</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:from-orange-600 hover:to-amber-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Cadastrando...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Cadastrar Usuário</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
