
import React from 'react';
import { Timer, Zap, History, Shield, Smartphone, Globe } from 'lucide-react';
import { Feature } from './types';

export const APP_NAME = "Rounder";
export const TAGLINE = "Professional MMA & Boxing Interval Timer";
export const SITE_URL = import.meta.env.VITE_SITE_URL || "https://rounder-mma-timer.com/";

export const DESCRIPTION = "Precision, performance, and power. Whether you're in the ring or at home, Rounder is the ultimate companion for MMA, Boxing, HIIT, and high-intensity interval training.";

export const APP_STORE_URL = "https://apps.apple.com/ua/app/rounder-mma-boxing-timer/id6752294030";
export const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.devtrack.rounder";

export const FEATURES: Feature[] = [
  {
    title: "Custom Intervals",
    description: "Fully configurable round times, rest periods, and prep phases tailored to your discipline.",
    icon: <Timer className="w-6 h-6 text-primary" />
  },
  {
    title: "High Contrast UI",
    description: "Built for visibility during intense sessions. Large timers and bold colors that you can see across the gym.",
    icon: <Smartphone className="w-6 h-6 text-primary" />
  },
  {
    title: "Audio Cues",
    description: "Crisp buzzers and bells ensure you never miss a transition, even when you're focused on the heavy bag.",
    icon: <Zap className="w-6 h-6 text-primary" />
  },
  {
    title: "Training History",
    description: "Track your progress over time with a detailed log of every session you've completed.",
    icon: <History className="w-6 h-6 text-primary" />
  },
  {
    title: "Offline Access",
    description: "Train anywhere, anytime. No internet connection required for your daily workout routines.",
    icon: <Globe className="w-6 h-6 text-primary" />
  },
  {
    title: "Reliable & Stable",
    description: "Optimized for performance to ensure the timer never skips a beat, keeping your discipline sharp.",
    icon: <Shield className="w-6 h-6 text-primary" />
  }
];

import img1 from './src/images/1.png';
import img2 from './src/images/2.png';
import img3 from './src/images/3.png';
import img4 from './src/images/4.png';
import img5 from './src/images/5.png';
import img6 from './src/images/6.png';

export const SCREENSHOTS = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6
];

