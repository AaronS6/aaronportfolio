import {
  Loader,
  ScrollBackground,
  Navbar,
  ChapterRail,
  BackToTop,
  MobileDock,
  KeyboardNav,
  CommandPalette,
  Hero,
  IntroCarousel,
  About,
  SectionDivider,
  Works,
  CodeProjects,
  Skills,
  Timeline,
  Awards,
  Faq,
  Contact,
} from "@/components/portfolio";

export default function Home() {
  return (
    <>
      {/* Fixed background layers */}
      <ScrollBackground />
      <div className="noise" aria-hidden />

      {/* Intro + chrome */}
      <Loader />
      <Navbar />
      <ChapterRail />
      <BackToTop />
      <MobileDock />

      {/* Keyboard + overlays */}
      <KeyboardNav />
      <CommandPalette />

      {/* Main page */}
      <main className="relative z-10 flex flex-1 flex-col">
        <Hero />
        <IntroCarousel />
        <About />
        <SectionDivider label="Featured work" />
        <Works />
        <CodeProjects />
        <Skills />
        <SectionDivider label="The path" />
        <Timeline />
        <SectionDivider label="Recognition" />
        <Awards />
        <Faq />
        <Contact />
      </main>
    </>
  );
}
