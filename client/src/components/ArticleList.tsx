import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Article } from "@shared/schema";
import { format } from "date-fns";

export default function ArticleList() {
  const [expandedArticles, setExpandedArticles] = useState<Set<string>>(new Set());

  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  const toggleArticle = (articleId: string) => {
    const newExpanded = new Set(expandedArticles);
    if (newExpanded.has(articleId)) {
      newExpanded.delete(articleId);
    } else {
      newExpanded.add(articleId);
    }
    setExpandedArticles(newExpanded);
  };

  if (isLoading) {
    return (
      <div className="space-y-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border-b border-gray-800 pb-12">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-800 rounded w-24 mb-4"></div>
              <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-800 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-800 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No articles published yet.</p>
      </div>
    );
  }

  return (
    <section className="space-y-12">
      {articles.map((article) => {
        const isExpanded = expandedArticles.has(article.id);
        
        return (
          <article key={article.id} className="border-b border-gray-800 pb-12">
            <div className="mb-4">
              <time className="text-gray-400 text-sm">
                {format(new Date(article.publishedAt), "MMM d yyyy")}
              </time>
            </div>
            
            <div className="article-content">
              {!isExpanded ? (
                <div className="article-preview">
                  <p className="text-white leading-relaxed mb-4">
                    {article.preview}
                  </p>
                  <button 
                    onClick={() => toggleArticle(article.id)}
                    className="text-gray-400 hover:text-white transition-colors underline cursor-pointer"
                  >
                    More
                  </button>
                </div>
              ) : (
                <div className="article-full">
                  {article.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-white leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                  <button 
                    onClick={() => toggleArticle(article.id)}
                    className="text-gray-400 hover:text-white transition-colors underline cursor-pointer"
                  >
                    Less
                  </button>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}
