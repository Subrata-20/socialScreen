import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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

  const faqs = [
    {
      question: 'How does ${projectName} help manage screen time?',
      answer:
        "${projectName} uses AI to provide personalized screen time recommendations based on your child's age and emotional state, promoting a balanced digital lifestyle.",
    },
    {
      question: 'What kind of activities does the app suggest?',
      answer:
        "The app suggests a variety of offline and educational activities tailored to your child's interests and needs, encouraging productive use of time.",
    },
    {
      question: "Can parents track their child's progress?",
      answer:
        "Yes, parents can access a dashboard to monitor their child's screen time, achievements, and emotional health, and set goals for offline activities.",
    },
    {
      question: 'Is there a reward system for children?',
      answer:
        'Children earn points for completing offline tasks, which can be redeemed for virtual rewards, motivating them to engage in real-world interactions.',
    },
    {
      question: 'How does the AI chatbot support children?',
      answer:
        'The AI chatbot offers personalized guidance and emotional support, helping children manage their feelings and suggesting activities to improve their mood.',
    },
    {
      question: 'Is ${projectName} suitable for all ages?',
      answer:
        '${projectName} is designed for children of various ages, with features and recommendations tailored to their developmental stage and emotional needs.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}, including features, usage, and support. Get the information you need quickly and easily.`}
        />
      </Head>
      <WebSiteHeader projectName={'socialScreen'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'socialScreen'}
          image={['Person reading FAQ page']}
          mainText={`Your Questions Answered About ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to your questions about ${projectName}. Learn more about our features, support, and how we can help you.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Explore FAQs`}
        />

        <FaqSection
          projectName={'socialScreen'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Common Questions About ${projectName} `}
        />
      </main>
      <WebSiteFooter projectName={'socialScreen'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
