import { Hero } from '@/components/home/Hero';
import { BrandStatement } from '@/components/home/BrandStatement';
import { PartnersRecognition } from '@/components/home/PartnersRecognition';
import { SelectedWork } from '@/components/home/SelectedWork';
import { Capabilities } from '@/components/home/Capabilities';
import { Approach } from '@/components/home/Approach';
import { WhatMakesFobDifferent } from '@/components/home/WhatMakesFobDifferent';
import { Faq } from '@/components/home/Faq';
import ScrollBlogShowcase from '@/components/home/ScrollBlog';
import { FinalCTA } from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      {/* Chapter 00: Intro & Hero (FOB Yellow) */}
      <Hero />

      {/* Chapter 01: Brand Statement (White) */}
      <BrandStatement />

      {/* Chapter 01.5: Partners & Recognition (White) */}
      {/* <PartnersRecognition /> */}

      {/* Chapter 03: Capabilities (Black) */}
      <Capabilities />

      {/* Chapter 02: Selected Work (Black) */}
      <SelectedWork />



      {/* Chapter 04: Our Approach (Black) */}
      <Approach />

      {/* Chapter 05: What Makes FOB Different (White) */}
      <WhatMakesFobDifferent />

      {/* Chapter 06: Frequently Asked Questions (White) */}
      <Faq />

      {/* Chapter 06.5: Blog (Black) */}
      <ScrollBlogShowcase />

      {/* Chapter 07: Final Climax CTA (Black) */}
      <FinalCTA />
    </>
  );
}
