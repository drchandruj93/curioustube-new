import { type Article, type InsertArticle, type Subscriber, type InsertSubscriber } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Article methods
  getArticles(): Promise<Article[]>;
  getArticle(id: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: string, article: Partial<InsertArticle>): Promise<Article | undefined>;
  deleteArticle(id: string): Promise<boolean>;
  
  // Subscriber methods
  getSubscribers(): Promise<Subscriber[]>;
  getSubscriber(email: string): Promise<Subscriber | undefined>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  unsubscribeEmail(email: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private articles: Map<string, Article>;
  private subscribers: Map<string, Subscriber>;

  constructor() {
    this.articles = new Map();
    this.subscribers = new Map();
    
    // Initialize with some sample articles
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleArticles: Article[] = [
      {
        id: "1",
        title: "The Power of Compound Growth",
        preview: "When you truly understand compound growth, you realize that patience isn't just a virtue—it's a superpower. Most people dramatically underestimate the power of consistency over time.",
        content: "When you truly understand compound growth, you realize that patience isn't just a virtue—it's a superpower. Most people dramatically underestimate the power of consistency over time. They want immediate results, but true wealth, wisdom, and fulfillment come from decades of disciplined action.\n\nThis applies to every area of life. In investing, small amounts invested consistently over decades become massive fortunes. In learning, reading just 30 minutes daily compounds into profound expertise. In relationships, small acts of kindness accumulate into deep bonds.\n\nThe challenge is that compound growth is invisible in the early stages. You plant seeds and see nothing for months. You invest and watch tiny fluctuations. You read and feel like you're barely progressing. This is where most people quit.\n\nBut those who persist through the 'boring middle' are rewarded with exponential results. The key is to focus on systems, not goals. Systems compound. Goals are just momentary achievements.",
        publishedAt: new Date("2025-01-15"),
        isPublished: true,
      },
      {
        id: "2",
        title: "True Productivity",
        preview: "The biggest misconception about productivity is that it's about doing more things. True productivity is about doing the right things effortlessly.",
        content: "The biggest misconception about productivity is that it's about doing more things. True productivity is about doing the right things effortlessly. When you're truly productive, work doesn't feel like work—it feels like play.\n\nMost productivity advice focuses on optimization—better tools, better systems, better schedules. But optimization assumes you're already doing the right things. What if you're optimizing the wrong activities?\n\nThe highest leverage productivity hack is elimination. Cut ruthlessly. Say no to everything that doesn't align with your core mission. Every yes to something unimportant is a no to something that matters.\n\nOnce you've eliminated the noise, focus on building systems that work for you, not against you. Automate decisions. Create environments that make good choices easy and bad choices hard. Design your life so that productivity becomes inevitable.",
        publishedAt: new Date("2025-01-10"),
        isPublished: true,
      },
      {
        id: "3",
        title: "The Attention Economy",
        preview: "The internet has democratized access to information, but it has also created an attention economy that profits from distraction.",
        content: "The internet has democratized access to information, but it has also created an attention economy that profits from distraction. The most valuable skill in the modern world is the ability to focus deeply on what matters most.\n\nWe live in an era of infinite content. More books, articles, videos, and podcasts are created every day than you could consume in a lifetime. The scarcity isn't information—it's attention and discernment.\n\nDeep work—the ability to focus without distraction on cognitively demanding tasks—is becoming increasingly rare and increasingly valuable. Those who can do deep work will thrive. Those who can't will struggle.\n\nProtect your attention like you protect your money. Be selective about what you consume. Choose quality over quantity. Depth over breadth. Master the art of saying no to good opportunities so you can say yes to great ones.",
        publishedAt: new Date("2025-01-05"),
        isPublished: true,
      },
    ];

    sampleArticles.forEach(article => {
      this.articles.set(article.id, article);
    });
  }

  async getArticles(): Promise<Article[]> {
    return Array.from(this.articles.values())
      .filter(article => article.isPublished)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  async getArticle(id: string): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = randomUUID();
    const article: Article = {
      ...insertArticle,
      id,
      publishedAt: new Date(),
    };
    this.articles.set(id, article);
    return article;
  }

  async updateArticle(id: string, updates: Partial<InsertArticle>): Promise<Article | undefined> {
    const existing = this.articles.get(id);
    if (!existing) return undefined;

    const updated: Article = { ...existing, ...updates };
    this.articles.set(id, updated);
    return updated;
  }

  async deleteArticle(id: string): Promise<boolean> {
    return this.articles.delete(id);
  }

  async getSubscribers(): Promise<Subscriber[]> {
    return Array.from(this.subscribers.values())
      .filter(subscriber => subscriber.isActive)
      .sort((a, b) => b.subscribedAt.getTime() - a.subscribedAt.getTime());
  }

  async getSubscriber(email: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribers.values()).find(
      subscriber => subscriber.email === email
    );
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const existing = await this.getSubscriber(insertSubscriber.email);
    if (existing) {
      if (!existing.isActive) {
        // Reactivate existing subscriber
        const reactivated: Subscriber = { ...existing, isActive: true, subscribedAt: new Date() };
        this.subscribers.set(existing.id, reactivated);
        return reactivated;
      }
      return existing;
    }

    const id = randomUUID();
    const subscriber: Subscriber = {
      ...insertSubscriber,
      id,
      subscribedAt: new Date(),
      isActive: true,
    };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }

  async unsubscribeEmail(email: string): Promise<boolean> {
    const subscriber = await this.getSubscriber(email);
    if (!subscriber) return false;

    const updated: Subscriber = { ...subscriber, isActive: false };
    this.subscribers.set(subscriber.id, updated);
    return true;
  }
}

export const storage = new MemStorage();
