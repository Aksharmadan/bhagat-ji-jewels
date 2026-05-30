"use client";

import { useState } from "react";
import { Sparkles, HelpCircle, ArrowRight, RefreshCw, Star } from "lucide-react";
import { getCollections } from "@/lib/products";
import Link from "next/link";

const QUESTIONS = [
  {
    id: 1,
    text: "What is your signature fashion style?",
    options: [
      { text: "Grand, royal and traditional", value: "heritage-classics" },
      { text: "Sleek, minimalist and contemporary", value: "gold-chains" },
      { text: "Sparkly, luxurious and statement-making", value: "brilliance" },
      { text: "Vintage, classic and antique", value: "heritage-classics" }
    ]
  },
  {
    id: 2,
    text: "Which metal tone catches your eye first?",
    options: [
      { text: "Rich 22K yellow gold", value: "heritage-classics" },
      { text: "Brilliant white gold / platinum", value: "brilliance" },
      { text: "Soft, warm rose gold", value: "kada" },
      { text: "Vintage oxidised silver", value: "silver-stories" }
    ]
  },
  {
    id: 3,
    text: "What occasion are you styling for?",
    options: [
      { text: "My wedding or a family marriage", value: "heritage-classics" },
      { text: "Daily office wear and casual dinners", value: "gold-chains" },
      { text: "Festivals and cultural ceremonies", value: "kada" },
      { text: "A high-profile gala or cocktail party", value: "brilliance" }
    ]
  }
];

export function StyleQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (val: string) => {
    const nextAnswers = [...answers, val];
    setAnswers(nextAnswers);
    
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate matching collection
      // Simple logic: find mode (most frequent value)
      const counts: Record<string, number> = {};
      let maxVal = nextAnswers[0];
      let maxCount = 1;
      
      nextAnswers.forEach((ans) => {
        counts[ans] = (counts[ans] || 0) + 1;
        if (counts[ans] > maxCount) {
          maxCount = counts[ans];
          maxVal = ans;
        }
      });
      
      setResult(maxVal);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  // Get matching collection details
  const collections = getCollections();
  const matchedColl = result ? collections.find(c => c.slug === result) : null;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-border/80 rounded-xl p-6 shadow-lg max-w-md mx-auto space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-border/60">
        <Sparkles className="text-gold h-5 w-5 animate-pulse" />
        <h3 className="font-display text-xl font-bold text-text uppercase tracking-wide">Jewelry Style Finder</h3>
      </div>

      {!result ? (
        <div className="space-y-6">
          {/* Question text */}
          <div className="space-y-2">
            <span className="text-[9px] font-bold text-accent uppercase tracking-widest block">
              Question {currentStep + 1} of {QUESTIONS.length}
            </span>
            <h4 className="text-sm font-semibold text-text leading-relaxed">
              {QUESTIONS[currentStep].text}
            </h4>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {QUESTIONS[currentStep].options.map((opt) => (
              <button
                key={opt.text}
                onClick={() => handleAnswer(opt.value)}
                className="w-full text-left px-4 py-3 rounded border border-border/80 hover:border-accent hover:bg-accent/5 text-xs text-text transition-all font-sans font-medium"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6 text-center py-4">
          <div className="h-12 w-12 rounded-full bg-accent/5 flex items-center justify-center text-accent mx-auto">
            <Star size={20} className="animate-spin-slow" />
          </div>
          
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.2em] text-accent uppercase font-bold">Your Ideal Collection</span>
            <h4 className="font-display text-2xl font-bold text-text uppercase">
              {matchedColl ? matchedColl.name : "Everyday Elegance"}
            </h4>
            <p className="text-xs text-text-muted max-w-sm mx-auto leading-relaxed">
              {matchedColl ? matchedColl.tagline : "Lightweight contemporary daily wear jewelry."}
            </p>
          </div>

          <div className="flex gap-2.5 pt-4">
            <button
              onClick={resetQuiz}
              className="flex-1 border border-border hover:border-text text-text-muted hover:text-text py-3 rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1"
            >
              <RefreshCw size={12} /> Restart
            </button>
            <Link
              href={`/collections/${result}`}
              className="flex-1 bg-accent hover:bg-accent-hover text-white py-3 rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow flex items-center justify-center gap-1"
            >
              Explore Collection <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
