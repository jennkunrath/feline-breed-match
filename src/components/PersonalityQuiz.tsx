import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, ArrowRight, Heart, Zap, Play, Home } from 'lucide-react';

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

interface PersonalityQuizProps {
  catData: CatData;
  onComplete: (data: Partial<CatData>) => void;
  onBack: () => void;
}

export const PersonalityQuiz: React.FC<PersonalityQuizProps> = ({
  catData,
  onComplete,
  onBack,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    personality: { ...catData.personality },
    size: catData.size,
    furLength: catData.furLength,
  });

  const steps = [
    {
      title: "Physical Characteristics",
      icon: <Home className="h-6 w-6" />,
      component: (
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-4 block">What size is your cat?</Label>
            <RadioGroup
              value={formData.size}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, size: value as any }))
              }
              className="grid grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="small" />
                <Label htmlFor="small" className="cursor-pointer">Small (5-8 lbs)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="cursor-pointer">Medium (8-12 lbs)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="large" />
                <Label htmlFor="large" className="cursor-pointer">Large (12+ lbs)</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-base font-medium mb-4 block">What's their fur length?</Label>
            <RadioGroup
              value={formData.furLength}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, furLength: value as any }))
              }
              className="grid grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="short" id="short" />
                <Label htmlFor="short" className="cursor-pointer">Short</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium-fur" />
                <Label htmlFor="medium-fur" className="cursor-pointer">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="long" id="long" />
                <Label htmlFor="long" className="cursor-pointer">Long</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      ),
    },
    {
      title: "Energy Level",
      icon: <Zap className="h-6 w-6 text-energetic" />,
      component: (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">How energetic is your cat?</h3>
            <p className="text-muted-foreground mb-6">Rate from 1 (very calm) to 5 (very energetic)</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Very Calm</span>
              <span className="text-sm">Very Energetic</span>
            </div>
            <Slider
              value={[formData.personality.energy]}
              onValueChange={(value) =>
                setFormData(prev => ({
                  ...prev,
                  personality: { ...prev.personality, energy: value[0] }
                }))
              }
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="text-center">
              <span className="text-2xl font-bold text-primary">
                {formData.personality.energy}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Social Behavior",
      icon: <Heart className="h-6 w-6 text-social" />,
      component: (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">How social is your cat?</h3>
            <p className="text-muted-foreground mb-6">Rate from 1 (very shy) to 5 (very social)</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Very Shy</span>
              <span className="text-sm">Very Social</span>
            </div>
            <Slider
              value={[formData.personality.sociability]}
              onValueChange={(value) =>
                setFormData(prev => ({
                  ...prev,
                  personality: { ...prev.personality, sociability: value[0] }
                }))
              }
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="text-center">
              <span className="text-2xl font-bold text-primary">
                {formData.personality.sociability}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Playfulness",
      icon: <Play className="h-6 w-6 text-playful" />,
      component: (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">How playful is your cat?</h3>
            <p className="text-muted-foreground mb-6">Rate from 1 (not playful) to 5 (very playful)</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Not Playful</span>
              <span className="text-sm">Very Playful</span>
            </div>
            <Slider
              value={[formData.personality.playfulness]}
              onValueChange={(value) =>
                setFormData(prev => ({
                  ...prev,
                  personality: { ...prev.personality, playfulness: value[0] }
                }))
              }
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="text-center">
              <span className="text-2xl font-bold text-primary">
                {formData.personality.playfulness}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Independence",
      icon: <Home className="h-6 w-6 text-calm" />,
      component: (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">How independent is your cat?</h3>
            <p className="text-muted-foreground mb-6">Rate from 1 (very clingy) to 5 (very independent)</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Very Clingy</span>
              <span className="text-sm">Very Independent</span>
            </div>
            <Slider
              value={[formData.personality.independence]}
              onValueChange={(value) =>
                setFormData(prev => ({
                  ...prev,
                  personality: { ...prev.personality, independence: value[0] }
                }))
              }
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="text-center">
              <span className="text-2xl font-bold text-primary">
                {formData.personality.independence}
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const canProceed = currentStep === 0 
    ? formData.size && formData.furLength 
    : true;

  const handleNext = () => {
    if (isLastStep) {
      onComplete(formData);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      onBack();
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <Card className="bg-gradient-card shadow-soft">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          {currentStepData.icon}
        </div>
        <CardTitle className="text-2xl mb-2">{currentStepData.title}</CardTitle>
        <p className="text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {currentStepData.component}

        <div className="flex items-center justify-between pt-6">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed}
            variant="cat"
            className="flex items-center space-x-2"
          >
            <span>{isLastStep ? 'See Results' : 'Next'}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};