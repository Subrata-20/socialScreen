import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../stores/hooks';
import LayoutGuest from '../layouts/Guest';
import WebSiteHeader from '../components/WebPageComponents/Header';
import WebSiteFooter from '../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  AboutUsDesigns,
  FeaturesDesigns,
  FaqDesigns,
} from '../components/WebPageComponents/designs';

import HeroSection from '../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../components/WebPageComponents/AboutUsComponent';

import FeaturesSection from '../components/WebPageComponents/FeaturesComponent';

import FaqSection from '../components/WebPageComponents/FaqComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'socialScreen';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/about',
      label: 'about',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },
  ];

  const features_points = [
    {
      name: 'Personalized Screen Time',
      description:
        "AI-driven recommendations for screen time limits and study schedules tailored to each child's age and emotional state, promoting balanced mobile usage.",
      icon: 'mdiTimer',
    },
    {
      name: 'Sentiment-Based Interaction',
      description:
        "Daily check-ins with sentiment analysis to understand and support children's emotional well-being, encouraging positive reflection and growth.",
      icon: 'mdiEmoticonHappy',
    },
    {
      name: 'Gamified Social Skills',
      description:
        'Engaging challenges that promote face-to-face interaction, helping children develop communication skills and earn rewards for social growth.',
      icon: 'mdiGamepadVariant',
    },
  ];

  const faqs = [
    {
      question:
        'How does ${projectName} personalize screen time recommendations?',
      answer:
        "${projectName} uses AI to analyze your child's age, activity, and emotional state to provide tailored screen time limits and study schedules, ensuring balanced mobile usage.",
    },
    {
      question: 'What is sentiment-based interaction?',
      answer:
        "Sentiment-based interaction involves daily check-ins where the app analyzes your child's mood and provides supportive feedback and rewards based on their emotional state.",
    },
    {
      question: 'How do gamified social skills challenges work?',
      answer:
        'The app offers fun challenges that encourage face-to-face interaction, helping children develop communication skills. Completing tasks earns them rewards like virtual badges.',
    },
    {
      question: "Can parents track their child's progress?",
      answer:
        "Yes, parents have access to a dashboard where they can monitor their child's screen time, achievements, and emotional health, and set goals for offline activities.",
    },
    {
      question: 'Is there a reward system for offline activities?',
      answer:
        'Children earn points for completing offline tasks like reading or playing outside. These points can be redeemed for virtual rewards, encouraging real-world engagement.',
    },
    {
      question: 'How does the AI chatbot support children?',
      answer:
        'The AI chatbot provides personalized guidance and emotional support, offering suggestions to manage emotions and recommending activities to improve mood.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Promote Healthy Mobile Usage for Children`}</title>
        <meta
          name='description'
          content={`Discover our app designed to enhance children's concentration, social skills, and healthy mobile habits through personalized features and parent-child collaboration.`}
        />
      </Head>
      <WebSiteHeader projectName={'socialScreen'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'socialScreen'}
          image={['Child using app happily']}
          mainText={`Empower Kids with Healthy Screen Habits`}
          subTitle={`Discover how ${projectName} helps children balance screen time, boost concentration, and enhance social skills through engaging features and parent collaboration.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Get Started Now`}
        />

        <AboutUsSection
          projectName={'socialScreen'}
          image={['Team collaborating on project']}
          mainText={`Discover the Vision Behind ${projectName}`}
          subTitle={`${projectName} is dedicated to nurturing healthy digital habits and social skills in children. Our mission is to empower families with tools that promote balanced mobile usage and foster emotional well-being.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More`}
        />

        <FeaturesSection
          projectName={'socialScreen'}
          image={['Child engaging with app']}
          withBg={0}
          features={features_points}
          mainText={`Explore ${projectName} Key Features`}
          subTitle={`Discover how ${projectName} supports healthy habits, enhances social skills, and fosters family collaboration.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <FaqSection
          projectName={'socialScreen'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions About ${projectName} `}
        />
      </main>
      <WebSiteFooter projectName={'socialScreen'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
