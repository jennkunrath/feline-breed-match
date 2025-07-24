import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RotateCcw, Star, Info } from 'lucide-react';

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

interface BreedMatch {
  breed: string;
  confidence: number;
  description: string;
  traits: string[];
  size: string;
  furLength: string;
  origin: string;
}

interface BreedResultsProps {
  catData: CatData;
  onStartOver: () => void;
}

// Simplified breed matching algorithm
const calculateBreedMatches = (catData: CatData): BreedMatch[] => {
  const breeds: Omit<BreedMatch, 'confidence'>[] = [
    {
      breed: "Maine Coon",
      description: "Large, gentle giants known for their friendly nature and long, fluffy coats.",
      traits: ["Gentle", "Social", "Intelligent"],
      size: "large",
      furLength: "long",
      origin: "United States"
    },
    {
      breed: "Siamese",
      description: "Vocal, social cats with striking blue eyes and pointed coloration.",
      traits: ["Vocal", "Social", "Energetic"],
      size: "medium",
      furLength: "short",
      origin: "Thailand"
    },
    {
      breed: "Persian",
      description: "Calm, quiet cats with luxurious long coats and sweet personalities.",
      traits: ["Calm", "Quiet", "Affectionate"],
      size: "medium",
      furLength: "long",
      origin: "Iran"
    },
    {
      breed: "British Shorthair",
      description: "Sturdy, calm cats with dense coats and independent personalities.",
      traits: ["Calm", "Independent", "Sturdy"],
      size: "medium",
      furLength: "short",
      origin: "United Kingdom"
    },
    {
      breed: "Abyssinian",
      description: "Active, playful cats with ticked coats and curious personalities.",
      traits: ["Active", "Playful", "Curious"],
      size: "medium",
      furLength: "short",
      origin: "Ethiopia"
    },
    {
      breed: "Ragdoll",
      description: "Large, docile cats known for going limp when picked up.",
      traits: ["Docile", "Gentle", "Relaxed"],
      size: "large",
      furLength: "medium",
      origin: "United States"
    },
    {
      breed: "Russian Blue",
      description: "Quiet, reserved cats with beautiful blue-gray coats.",
      traits: ["Quiet", "Reserved", "Gentle"],
      size: "medium",
      furLength: "short",
      origin: "Russia"
    },
    {
      breed: "Domestic Shorthair",
      description: "Mixed breed cats with varied personalities and characteristics.",
      traits: ["Varied", "Adaptable", "Hardy"],
      size: "medium",
      furLength: "short",
      origin: "Mixed"
    }
  ];

  return breeds.map(breed => {
    let confidence = 50; // Base confidence

    // Size matching
    if (breed.size === catData.size) confidence += 20;
    
    // Fur length matching
    if (breed.furLength === catData.furLength) confidence += 15;

    // Personality matching
    const { energy, sociability, playfulness, independence } = catData.personality;
    
    // Breed-specific personality scoring
    switch (breed.breed) {
      case "Maine Coon":
        if (sociability >= 4) confidence += 10;
        if (energy <= 3) confidence += 5;
        break;
      case "Siamese":
        if (sociability >= 4) confidence += 15;
        if (energy >= 4) confidence += 10;
        break;
      case "Persian":
        if (energy <= 2) confidence += 15;
        if (independence <= 3) confidence += 5;
        break;
      case "British Shorthair":
        if (independence >= 4) confidence += 10;
        if (energy <= 3) confidence += 10;
        break;
      case "Abyssinian":
        if (playfulness >= 4) confidence += 15;
        if (energy >= 4) confidence += 10;
        break;
      case "Ragdoll":
        if (energy <= 2) confidence += 10;
        if (sociability >= 3) confidence += 10;
        break;
      case "Russian Blue":
        if (independence >= 3) confidence += 10;
        if (energy <= 3) confidence += 5;
        break;
    }

    return { ...breed, confidence: Math.min(confidence, 95) };
  }).sort((a, b) => b.confidence - a.confidence);
};

export const BreedResults: React.FC<BreedResultsProps> = ({
  catData,
  onStartOver,
}) => {
  const breedMatches = calculateBreedMatches(catData);
  const topMatches = breedMatches.slice(0, 3);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Star className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl mb-2">Your Cat's Breed Matches</CardTitle>
          <p className="text-muted-foreground">
            Based on the photo and personality traits you provided
          </p>
        </CardHeader>
      </Card>

      {topMatches.map((match, index) => (
        <Card key={match.breed} className="bg-gradient-card shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-warm text-white rounded-full text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <CardTitle className="text-xl">{match.breed}</CardTitle>
                  <p className="text-sm text-muted-foreground">{match.origin}</p>
                </div>
              </div>
              <Badge variant={index === 0 ? "default" : "secondary"} className="text-sm">
                {match.confidence}% match
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={match.confidence} className="h-2" />
            
            <p className="text-muted-foreground">{match.description}</p>
            
            <div>
              <h4 className="font-medium mb-2 flex items-center space-x-2">
                <Info className="h-4 w-4" />
                <span>Key Traits</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {match.traits.map(trait => (
                  <Badge key={trait} variant="outline">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Size: </span>
                <span className="capitalize">{match.size}</span>
              </div>
              <div>
                <span className="font-medium">Fur Length: </span>
                <span className="capitalize">{match.furLength}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="bg-gradient-card shadow-soft">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Remember, these are educated guesses based on physical traits and personality. 
              Mixed breed cats can have characteristics from multiple breeds!
            </p>
            <Button onClick={onStartOver} variant="cat" size="lg" className="flex items-center space-x-2">
              <RotateCcw className="h-4 w-4" />
              <span>Analyze Another Cat</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};