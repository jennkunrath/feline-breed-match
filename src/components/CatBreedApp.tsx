import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ImageUpload';
import { PersonalityQuiz } from '@/components/PersonalityQuiz';
import { BreedResults } from '@/components/BreedResults';
import { Cat, Camera, Brain, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-cats.jpg';

interface CatData {
  image: File | null;
  personality: {
    energy: number;
    sociability: number;
    playfulness: number;
    independence: number;
  };
  size: 'small' | 'medium' | 'large' | '';
  furLength: 'short' | 'medium' | 'long' | '';
}

const CatBreedApp = () => {
  const [step, setStep] = useState<'upload' | 'quiz' | 'results'>('upload');
  const [catData, setCatData] = useState<CatData>({
    image: null,
    personality: {
      energy: 3,
      sociability: 3,
      playfulness: 3,
      independence: 3,
    },
    size: '',
    furLength: '',
  });

  const handleImageUpload = (file: File) => {
    setCatData(prev => ({ ...prev, image: file }));
  };

  const handleQuizComplete = (quizData: Partial<CatData>) => {
    setCatData(prev => ({ ...prev, ...quizData }));
    setStep('results');
  };

  const resetApp = () => {
    setCatData({
      image: null,
      personality: {
        energy: 3,
        sociability: 3,
        playfulness: 3,
        independence: 3,
      },
      size: '',
      furLength: '',
    });
    setStep('upload');
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Various cat breeds" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/95" />
        </div>
        
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="flex items-center justify-center mb-6">
            <Cat className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-warm bg-clip-text text-transparent">
              CatBreed Detective
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover your cat's potential breed mix through AI photo analysis and personality assessment
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${step === 'upload' ? 'text-primary' : 'text-muted-foreground'}`}>
              <Camera className="h-5 w-5" />
              <span className="font-medium">Upload Photo</span>
            </div>
            <div className="h-1 w-8 bg-border" />
            <div className={`flex items-center space-x-2 ${step === 'quiz' ? 'text-primary' : 'text-muted-foreground'}`}>
              <Brain className="h-5 w-5" />
              <span className="font-medium">Answer Quiz</span>
            </div>
            <div className="h-1 w-8 bg-border" />
            <div className={`flex items-center space-x-2 ${step === 'results' ? 'text-primary' : 'text-muted-foreground'}`}>
              <Sparkles className="h-5 w-5" />
              <span className="font-medium">Results</span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {step === 'upload' && (
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">Upload Your Cat's Photo</CardTitle>
                <p className="text-muted-foreground">
                  Choose a clear photo showing your cat's face and body for the best results
                </p>
              </CardHeader>
              <CardContent>
                <ImageUpload 
                  onImageUpload={handleImageUpload}
                  uploadedImage={catData.image}
                />
                {catData.image && (
                  <div className="text-center mt-6">
                    <Button 
                      onClick={() => setStep('quiz')}
                      variant="cat"
                      size="lg"
                    >
                      Continue to Personality Quiz
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {step === 'quiz' && (
            <PersonalityQuiz 
              catData={catData}
              onComplete={handleQuizComplete}
              onBack={() => setStep('upload')}
            />
          )}

          {step === 'results' && (
            <BreedResults 
              catData={catData}
              onStartOver={resetApp}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CatBreedApp;