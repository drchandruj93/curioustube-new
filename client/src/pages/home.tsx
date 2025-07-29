import { useState } from "react";
import Header from "@/components/Header";
import ArticleList from "@/components/ArticleList";
import SubscriptionModal from "@/components/SubscriptionModal";
import ReadingProgress from "@/components/ReadingProgress";

export default function Home() {
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

  return (
    <div className="bg-black text-white min-h-screen">
      <ReadingProgress />
      
      <Header onSubscribeClick={() => setIsSubscribeModalOpen(true)} />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Podcast Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Podcast</h2>
          <div className="flex flex-wrap gap-4 text-gray-400">
            <a href="#" className="hover:text-white transition-colors underline">
              Apple
            </a>
            <a href="#" className="hover:text-white transition-colors underline">
              Email
            </a>
            <a href="#" className="hover:text-white transition-colors underline">
              Spotify
            </a>
            <a href="#" className="hover:text-white transition-colors underline">
              YouTube
            </a>
          </div>
        </section>
        
        {/* Articles List */}
        <ArticleList />
        
        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="text-gray-400 hover:text-white transition-colors underline">
            Read More
          </button>
        </div>
      </main>

      <SubscriptionModal 
        isOpen={isSubscribeModalOpen}
        onClose={() => setIsSubscribeModalOpen(false)}
      />
    </div>
  );
}
