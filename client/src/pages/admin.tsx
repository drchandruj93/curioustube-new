import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type Article, type Subscriber } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Edit, Plus } from "lucide-react";
import { format } from "date-fns";

export default function Admin() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    preview: "",
    content: "",
    isPublished: true,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: articles, isLoading: articlesLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  const { data: subscribers, isLoading: subscribersLoading } = useQuery<Subscriber[]>({
    queryKey: ["/api/subscribers"],
  });

  const createArticleMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/articles", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({ title: "Article created successfully!" });
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create article",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateArticleMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const response = await apiRequest("PUT", `/api/articles/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({ title: "Article updated successfully!" });
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update article",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteArticleMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/articles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({ title: "Article deleted successfully!" });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to delete article",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({ title: "", preview: "", content: "", isPublished: true });
    setIsCreating(false);
    setEditingArticle(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArticle) {
      updateArticleMutation.mutate({ id: editingArticle.id, data: formData });
    } else {
      createArticleMutation.mutate(formData);
    }
  };

  const startEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      preview: article.preview,
      content: article.content,
      isPublished: article.isPublished,
    });
    setIsCreating(true);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <header className="border-b border-gray-800 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Curioustube Admin</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900">
            <TabsTrigger value="articles" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Articles
            </TabsTrigger>
            <TabsTrigger value="subscribers" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Subscribers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Articles</h2>
              <Button 
                onClick={() => setIsCreating(true)}
                className="bg-white text-black hover:bg-gray-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Article
              </Button>
            </div>

            {isCreating && (
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">
                    {editingArticle ? "Edit Article" : "Create New Article"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      placeholder="Article title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="bg-black border-gray-700 text-white"
                    />
                    <Textarea
                      placeholder="Preview text (shown on homepage)"
                      value={formData.preview}
                      onChange={(e) => setFormData({ ...formData, preview: e.target.value })}
                      required
                      className="bg-black border-gray-700 text-white min-h-[100px]"
                    />
                    <Textarea
                      placeholder="Full article content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      required
                      className="bg-black border-gray-700 text-white min-h-[200px]"
                    />
                    <div className="flex gap-2">
                      <Button 
                        type="submit" 
                        className="bg-white text-black hover:bg-gray-200"
                        disabled={createArticleMutation.isPending || updateArticleMutation.isPending}
                      >
                        {editingArticle ? "Update" : "Create"} Article
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={resetForm}
                        className="border-gray-700 text-white hover:bg-gray-800"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {articlesLoading ? (
                <p className="text-gray-400">Loading articles...</p>
              ) : articles && articles.length > 0 ? (
                articles.map((article) => (
                  <Card key={article.id} className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-400 mb-2">{article.preview}</p>
                          <p className="text-sm text-gray-500">
                            {format(new Date(article.publishedAt), "MMM d, yyyy")} • 
                            {article.isPublished ? " Published" : " Draft"}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startEdit(article)}
                            className="border-gray-700 text-white hover:bg-gray-800"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteArticleMutation.mutate(article.id)}
                            className="border-red-700 text-red-400 hover:bg-red-900"
                            disabled={deleteArticleMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-gray-400">No articles found.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="subscribers" className="space-y-6">
            <h2 className="text-xl font-semibold">Email Subscribers</h2>
            
            <div className="space-y-4">
              {subscribersLoading ? (
                <p className="text-gray-400">Loading subscribers...</p>
              ) : subscribers && subscribers.length > 0 ? (
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      {subscribers.map((subscriber) => (
                        <div
                          key={subscriber.id}
                          className="flex justify-between items-center py-2 px-3 bg-black rounded"
                        >
                          <span className="text-white">{subscriber.email}</span>
                          <span className="text-sm text-gray-400">
                            {format(new Date(subscriber.subscribedAt), "MMM d, yyyy")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <p className="text-gray-400">No subscribers yet.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
