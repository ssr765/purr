<script setup lang="ts">
import HeroSection from '@/components/landing/home/HeroSection.vue'
import ConceptSection from '@/components/landing/home/ConceptSection.vue'
import FeaturesSection from '@/components/landing/home/FeaturesSection.vue'
import ContentSection from '@/components/landing/home/ContentSection.vue'
import AiSection from '@/components/landing/home/AiSection.vue'
import TestimonialsSection from '@/components/landing/home/TestimonialsSection.vue'
import CtaSection from '@/components/landing/home/CtaSection.vue'
import Logo from '@/assets/img/logo/black.webp'
import { useSeoMeta } from 'unhead'

useSeoMeta({
  title: 'purr. - The Social Network for Your Cats',
  ogTitle: "Join purr. - Your Cat's Own Social Network",
  description: 'Discover purr., the exclusive social network where cats take the spotlight. Create profiles, share cat moments, and connect with cat lovers worldwide.',
  ogDescription: 'Join purr. and explore a cat-centric social platform. Create cat profiles, share unique moments, and connect globally.',
  ogImage: Logo,
})
</script>

<template>
  <HeroSection />
  <ConceptSection />
  <FeaturesSection />
  <ContentSection />
  <AiSection />
  <TestimonialsSection />
  <CtaSection />
</template>
