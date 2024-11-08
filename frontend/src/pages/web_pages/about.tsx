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
  AboutUsDesigns,
  FeaturesDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

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
      name: 'AI-Driven Insights',
      description:
        'Our app uses advanced AI to provide personalized recommendations for screen time and activities, ensuring a balanced digital lifestyle for children.',
      icon: 'mdiBrain',
    },
    {
      name: 'Emotional Check-Ins',
      description:
        'Daily sentiment analysis helps children reflect on their emotions, offering tailored support and rewards to encourage positive growth.',
      icon: 'mdiHeartPulse',
    },
    {
      name: 'Interactive Challenges',
      description:
        'Engage in fun, gamified tasks that promote social interaction and skill development, rewarding children for their achievements.',
      icon: 'mdiPuzzle',
    },
    {
      name: 'Parental Dashboard',
      description:
        "Parents can easily monitor their child's progress, set goals, and receive insights into their emotional and social development.",
      icon: 'mdiViewDashboard',
    },
    {
      name: 'Reward System',
      description:
        'Children earn points for completing offline activities, motivating them to engage in real-world interactions and personal growth.',
      icon: 'mdiStarCircle',
    },
    {
      name: 'AI Chatbot Support',
      description:
        'The integrated AI chatbot offers personalized guidance and emotional support, helping children manage their feelings effectively.',
      icon: 'mdiRobot',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`About Us - Learn More About ${projectName}`}</title>
        <meta
          name='description'
          content={`Discover the mission and values behind ${projectName}, our commitment to promoting healthy digital habits, and the features that make our app unique.`}
        />
      </Head>
      <WebSiteHeader projectName={'socialScreen'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'socialScreen'}
          image={['Team brainstorming session']}
          mainText={`Unveiling the Heart of ${projectName}`}
          subTitle={`Learn about the mission and vision of ${projectName}, dedicated to fostering healthy digital habits and enhancing social skills in children.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Discover Our Story`}
        />

        <AboutUsSection
          projectName={'socialScreen'}
          image={['Team working together']}
          mainText={`Our Mission at ${projectName}`}
          subTitle={`${projectName} is committed to creating a supportive environment for children to develop healthy digital habits and social skills. Our team is passionate about empowering families with innovative tools for growth.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Meet Our Team`}
        />

        <FeaturesSection
          projectName={'socialScreen'}
          image={['Children using app together']}
          withBg={1}
          features={features_points}
          mainText={`Innovative Features of ${projectName}`}
          subTitle={`Explore the unique features of ${projectName} that support children's growth and family collaboration.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS_DIVERSITY || ''}
        />
      </main>
      <WebSiteFooter projectName={'socialScreen'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
