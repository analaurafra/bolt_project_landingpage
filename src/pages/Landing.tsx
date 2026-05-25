import { useState, useEffect } from 'react';
import { Brain, Heart, Zap, Star, Mail, ChevronDown, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Landing() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-animate]');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75;
        if (isVisible) {
          setVisibleSections((prev) => ({
            ...prev,
            [section.id]: true,
          }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const benefits = [
    {
      id: 'focus',
      icon: Brain,
      title: 'Foco Aprimorado',
      description: 'Melhore sua concentração e mantenha o foco por horas com nossa fórmula exclusiva',
    },
    {
      id: 'memory',
      icon: Zap,
      title: 'Memória Potencializada',
      description: 'Retenha informações com mais facilidade e melhore sua capacidade cognitiva',
    },
    {
      id: 'energy',
      icon: Heart,
      title: 'Energia Sustentável',
      description: 'Sinta energia limpa e duradoura sem os efeitos colaterais de estimulantes',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Marina Silva',
      role: 'Executiva de Tecnologia',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'NeuroBoost AI transformou minha produtividade. Consegui finalizar meus projetos com muito mais clareza mental e energia.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Carlos Mendes',
      role: 'Professor Universitário',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'Como educador, preciso manter total concentração. Este suplemento realmente funciona e me ajuda a estar melhor preparado.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Beatriz Costa',
      role: 'Analista de Dados',
      image: 'https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'Após 2 semanas usando NeuroBoost AI, notei uma melhora significativa na minha memória e na rapidez de raciocínio.',
      rating: 5,
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">NeuroBoost AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#beneficios" className="text-gray-600 hover:text-gray-900 transition">Benefícios</a>
            <a href="#depoimentos" className="text-gray-600 hover:text-gray-900 transition">Depoimentos</a>
            <a href="#preco" className="text-gray-600 hover:text-gray-900 transition">Preço</a>
            <a href="/admin" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">Painel Admin</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                <Zap className="w-4 h-4" />
                <span>Revolucione seu desempenho mental</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Desbloqueie seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Potencial Máximo</span>
              </h1>
              <p className="text-xl text-gray-600">
                NeuroBoost AI é um suplemento natural desenvolvido com ingredientes cientificamente comprovados para aumentar foco, memória e produtividade.
              </p>
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                Compre Agora
              </button>
            </div>
            <div className="relative h-96 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-3xl blur-2xl" />
              <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <img
                  src="/Imagem1.png"
                  alt="NeuroBoost AI Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
          <div className="mt-16 flex justify-center">
            <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" data-animate className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Por que NeuroBoost AI?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Desenvolvido com ingredientes naturais e apoiado por pesquisa científica
            </p>
          </div>
          <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${visibleSections['beneficios'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.id} className="p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-blue-50/30">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" data-animate className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">O que dizem nossos usuários</h2>
            <p className="text-gray-600 text-lg">Milhares de pessoas já transformaram suas vidas com NeuroBoost AI</p>
          </div>
          <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${visibleSections['depoimentos'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-8 rounded-2xl bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="preco" data-animate className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Preço Exclusivo</h2>
            <p className="text-gray-600 text-lg">Acesso completo com garantia de satisfação</p>
          </div>
          <div className={`p-12 rounded-3xl border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 transition-all duration-1000 ${visibleSections['preco'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Plano Premium</h3>
              <p className="text-gray-600">Acesso vitalício + atualizações gratuitas</p>
            </div>
            <div className="mb-8 text-center">
              <span className="text-5xl font-bold text-gray-900">R$ 147</span>
              <span className="text-gray-600 ml-2">por mês</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span>Fórmula Premium Concentrada</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span>Resultados em 7-14 dias</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span>Garantia de 30 dias ou dinheiro de volta</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span>Suporte ao cliente 24/7</span>
              </li>
            </ul>
            <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-lg text-lg font-semibold hover:shadow-lg transition-all duration-300">
              Compre Agora - R$ 147/mês
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-cyan-500">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">Fique Atualizado</h2>
            <p className="text-blue-100">Receba dicas exclusivas de produtividade e novidades sobre NeuroBoost AI</p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-4">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/20 text-white placeholder-blue-100 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
            >
              Inscrever
            </button>
          </form>
          {isSubscribed && (
            <p className="text-center mt-4 text-white animate-fade-in">
              Obrigado! Você foi inscrito com sucesso na nossa newsletter.
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Sobre</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-white transition">Nossa História</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition">Contato</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Termos de Serviço</a></li>
                <li><a href="#" className="hover:text-white transition">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Redes Sociais</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="hover:text-white transition"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="hover:text-white transition"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="hover:text-white transition"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 NeuroBoost AI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
