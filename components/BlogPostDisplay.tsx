
import React, { useState, useEffect } from 'react';
import type { BlogPost } from '../types';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';

interface BlogPostDisplayProps {
  post: BlogPost;
}

const BlogPostDisplay: React.FC<BlogPostDisplayProps> = ({ post }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const fullText = `# ${post.title}\n\n${post.body}`;
    navigator.clipboard.writeText(fullText)
      .then(() => {
        setIsCopied(true);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy text to clipboard.');
      });
  };
  
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="relative bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md ring-1 ring-slate-900/5 dark:ring-slate-200/5">
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800 transition-colors"
        aria-label="Copy to clipboard"
      >
        {isCopied ? <CheckIcon className="h-5 w-5 text-green-500" /> : <ClipboardIcon className="h-5 w-5" />}
      </button>

      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 pr-12">
        {post.title}
      </h1>
      <div 
        className="prose prose-slate dark:prose-invert max-w-none whitespace-pre-wrap" 
        dangerouslySetInnerHTML={{ __html: post.body.replace(/\n/g, '<br />') }}
      />
    </div>
  );
};

export default BlogPostDisplay;
