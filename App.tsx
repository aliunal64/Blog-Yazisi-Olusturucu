
import React, { useState } from 'react';
import type { BlogCriteria, BlogPost } from './types';
import { generateBlogPost } from './services/geminiService';
import InputGroup from './components/InputGroup';
import BlogPostDisplay from './components/BlogPostDisplay';
import GenerateIcon from './components/icons/GenerateIcon';

const App: React.FC = () => {
  const [criteria, setCriteria] = useState<BlogCriteria>({
    topic: '',
    audience: '',
    tone: '',
    length: '',
    extraRequests: '',
  });
  const [generatedPost, setGeneratedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCriteria(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedPost(null);

    try {
      const post = await generateBlogPost(criteria);
      setGeneratedPost(post);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const SkeletonLoader: React.FC = () => (
    <div className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md ring-1 ring-slate-900/5 dark:ring-slate-200/5 animate-pulse">
      <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-6"></div>
      <div className="space-y-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mt-4"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            AI Blog Yazarı
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            İçerik kriterlerinizi girin, yapay zeka sizin için profesyonel bir blog yazısı taslağı oluştursun.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          {/* Input Form Section */}
          <div className="bg-white dark:bg-slate-800/50 p-6 md:p-8 rounded-xl shadow-lg ring-1 ring-slate-900/5 dark:ring-slate-200/5 mb-8 lg:mb-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputGroup id="topic" label="Konu" value={criteria.topic} onChange={handleInputChange} placeholder="Blog yazısının ana konusu" required />
              <InputGroup id="audience" label="Hedef Kitle" value={criteria.audience} onChange={handleInputChange} placeholder="Örn: Pazarlama uzmanları, yeni başlayanlar..." required />
              <InputGroup id="tone" label="Üslup" value={criteria.tone} onChange={handleInputChange} placeholder="Örn: Samimi, resmi, esprili..." required />
              <InputGroup id="length" label="Uzunluk" value={criteria.length} onChange={handleInputChange} placeholder="Örn: 300 kelime, 3 paragraf..." required />
              <InputGroup id="extraRequests" label="Ek İstekler" value={criteria.extraRequests} onChange={handleInputChange} placeholder="Örn: SEO anahtar kelimeleri, özel bir bölüm..." as="textarea" rows={4} />
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Oluşturuluyor...
                  </>
                ) : (
                  <>
                    <GenerateIcon className="h-5 w-5" />
                    Blog Yazısı Oluştur
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Output Section */}
          <div className="min-h-[400px]">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                <strong className="font-bold">Hata: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            {isLoading && <SkeletonLoader />}
            
            {generatedPost && !isLoading && <BlogPostDisplay post={generatedPost} />}

            {!isLoading && !generatedPost && !error && (
               <div className="flex flex-col items-center justify-center h-full text-center bg-slate-100 dark:bg-slate-800/50 rounded-xl p-8 border-2 border-dashed border-slate-300 dark:border-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 dark:text-slate-500 mb-4"><path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M2 15h10"/><path d="m5 12-3 3 3 3"/></svg>
                <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Blog Yazınız Burada Görüntülenecek</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Formu doldurun ve "Oluştur" düğmesine tıklayın.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
