import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Mail } from "lucide-react";

export default function Unsubscribe() {
  const [email, setEmail] = useState("");
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);

  const unsubscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/unsubscribe", { email });
      return response.json();
    },
    onSuccess: () => {
      setIsUnsubscribed(true);
    },
    onError: (error: any) => {
      console.error('Unsubscribe error:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      unsubscribeMutation.mutate(email.trim());
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <a 
            href="/" 
            className="text-2xl font-bold text-white hover:opacity-70 transition-opacity"
          >
            Curioustube
          </a>
        </div>

        {!isUnsubscribed ? (
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg">
            <div className="text-center mb-8">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Unsubscribe</h1>
              <p className="text-gray-400">
                Sorry to see you go. Enter your email address to unsubscribe from our newsletter.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black border-gray-700 text-white placeholder-gray-500 focus:border-white"
              />
              
              <Button 
                type="submit" 
                className="w-full bg-white text-black hover:bg-gray-200"
                disabled={unsubscribeMutation.isPending}
              >
                {unsubscribeMutation.isPending ? "Unsubscribing..." : "Unsubscribe"}
              </Button>

              {unsubscribeMutation.error && (
                <p className="text-red-400 text-center text-sm">
                  Email not found or already unsubscribed.
                </p>
              )}
            </form>

            <div className="text-center mt-8">
              <a 
                href="/" 
                className="text-gray-400 hover:text-white transition-colors underline"
              >
                Return to homepage
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">Successfully Unsubscribed</h1>
            <p className="text-gray-400 mb-8">
              You have been unsubscribed from our newsletter. You will no longer receive emails from Curioustube.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Changed your mind? You can always subscribe again.
              </p>
              <div className="flex gap-4 justify-center">
                <a 
                  href="/"
                  className="bg-white text-black px-6 py-2 hover:bg-gray-200 transition-colors"
                >
                  Return to Homepage
                </a>
                <button 
                  onClick={() => {
                    setIsUnsubscribed(false);
                    setEmail("");
                  }}
                  className="text-gray-400 hover:text-white transition-colors underline"
                >
                  Subscribe Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}