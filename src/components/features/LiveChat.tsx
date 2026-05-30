"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Sparkles, MessageSquare } from "lucide-react";
import { inquireProduct } from "@/lib/actions";

const QUICK_QUESTIONS = [
  "Hi, I want to book a private showroom visit.",
  "What is the gold rate today for 22K?",
  "How can I customize a wedding kada?",
  "Do you provide home delivery in Uttar Pradesh?"
];

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) return;
    inquireProduct(msg);
    setMsg("");
    setIsOpen(false);
  };

  const handleQuickQuestion = (q: string) => {
    inquireProduct(q);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-2xl hover:scale-108 transition-all hover:bg-accent-hover"
        aria-label="Open chat concierge"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm overflow-hidden rounded-xl border border-border bg-white dark:bg-neutral-900 shadow-2xl animate-scale-in">
          {/* Header */}
          <div className="bg-accent p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <h4 className="font-display text-sm font-bold tracking-wide uppercase">Bhagat Concierge</h4>
                <p className="text-[10px] text-neutral-200">Online &bull; Generational Trust since 1960</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white" aria-label="Close chat">
              <X size={18} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-5 space-y-4 max-h-[300px] overflow-y-auto">
            <div className="bg-neutral-50 dark:bg-neutral-800/40 p-4 rounded-lg border border-border/40 text-xs text-text-muted leading-relaxed">
              Namaste. Welcome to Bhagat Ji Jewels. I am your concierge. Ask me anything, or tap one of our quick questions below to chat directly on WhatsApp.
            </div>

            {/* Quick suggestions */}
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-accent uppercase tracking-widest block">Quick Inquiries:</span>
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleQuickQuestion(q)}
                  className="w-full text-left px-3.5 py-2.5 rounded border border-border/80 hover:border-accent hover:bg-accent/5 text-[11px] text-text-muted transition-colors font-medium flex items-start gap-2"
                >
                  <MessageSquare size={12} className="text-accent shrink-0 mt-0.5" />
                  <span>{q}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Input */}
          <form onSubmit={handleSubmit} className="border-t border-border p-3 flex gap-2">
            <input
              type="text"
              placeholder="Type your question..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="flex-1 bg-neutral-50 dark:bg-neutral-800 border border-border rounded px-3 py-2 text-xs text-text outline-none focus:border-accent"
            />
            <button type="submit" className="bg-accent hover:bg-accent-hover text-white p-2 rounded flex items-center justify-center shrink-0 transition-colors">
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
