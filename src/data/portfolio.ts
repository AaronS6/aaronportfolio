/* ============================================================
   Aaron Shan — Portfolio data
   All content lives here. Components consume these exports.
   ============================================================ */

export const profile = {
  name: "Aaron Shan",
  firstName: "Aaron",
  lastName: "Shan",
  tagline: "Student, builder, designer & coder",
  location: "Burnaby, BC",
  school: "Burnaby North Secondary",
  graduating: "Class of 2028",
  email: "aaronshansh@gmail.com",
  instagram: {
    handle: "@aaronsrr_",
    url: "https://www.instagram.com/aaronsrr_/",
  },
  intro:
    "A student who's into design, business, tech, and just trying out different things. I like coming up with ideas, making stuff, and seeing what I can do with them. I'm usually working on some random project or finding something new to get into.",
  longBio: [
    "I'm Aaron. I go to Burnaby North Secondary. I like helping out around my community through school activities, events, and student-led projects.",
    "Outside of school I swim, debate, code, design posters and websites, do public speaking, and compete in business competitions.",
  ],
  pullQuote:
    "I like building things that get people involved.",
  tags: ["Leadership", "Design", "Debate", "STEM", "Community"],
} as const;

export const navLinks = [
  { label: "Works", href: "#works", key: "w" },
  { label: "About", href: "#about", key: "a" },
  { label: "Awards", href: "#awards", key: "r" },
] as const;

/* Chapters drive the right-side rail + keyboard jump targets */
export const chapters = [
  { id: "home", label: "Home", key: "h" },
  { id: "works", label: "Works", key: "w" },
  { id: "awards", label: "Awards", key: "r" },
  { id: "contact", label: "Contact", key: "t" },
] as const;

/* Intro carousel — mix of photo cards + gradient quote cards */
export const introCards = [
  {
    type: "photo" as const,
    src: "/images/real/intro-kayaking.jpg",
    alt: "Kayaking at the BC Cup Series",
    caption: "Kayaking — BC Cup Series",
    gradient: "from-sky/40 to-grape/30",
  },
  {
    type: "quote" as const,
    text: "I like small things done really well.",
    accent: "lime" as const,
  },
  {
    type: "photo" as const,
    src: "/images/real/intro-council.jpg",
    alt: "Student council group photo",
    caption: "Student council",
    gradient: "from-lime/40 to-sun/30",
  },
  {
    type: "quote" as const,
    text: "Code is just design you can run.",
    accent: "grape" as const,
  },
  {
    type: "photo" as const,
    src: "/images/real/intro-piano.jpg",
    alt: "Playing piano with a younger child",
    caption: "Mentoring younger kids",
    gradient: "from-peach/40 to-coral/30",
  },
  {
    type: "quote" as const,
    text: "Build with people, not at them.",
    accent: "coral" as const,
  },
  {
    type: "photo" as const,
    src: "/images/real/intro-nature.jpg",
    alt: "Exploring a nature trail",
    caption: "Nature Exploration Club",
    gradient: "from-sun/40 to-lime/30",
  },
  {
    type: "photo" as const,
    src: "/images/real/intro-debate.jpg",
    alt: "Aaron speaking at an FDT debate event",
    caption: "FDT debate tournament",
    gradient: "from-grape/40 to-sky/30",
  },
];

/* Featured works — 5 projects, expandable */
export const projects = [
  {
    id: "works-1",
    title: "Electrical Engineering Tutor",
    blurb:
      "Taught introductory electrical engineering and electronics to younger students through a youth-led STEM outreach program.",
    year: "2024–25",
    role: "Instructor",
    tags: ["Tutoring", "STEM", "Non-Profit"],
    accent: "lime" as const,
    cover: "/images/real/work-tutoring.jpg",
    detailImage: "/images/real/work-tutoring-detail.jpg",
    details: [
      "Broke down concepts like circuits, currents, switches, and basic hardware into hands-on lessons younger kids could understand.",
      "Taught 9+ one-hour classes and spent 12+ hours prepping and teaching.",
      "Used project-based activities so students learned by building things.",
    ],
    takeaway: "Making engineering approachable.",
  },
  {
    id: "works-2",
    title: "Grade 10 Council Website",
    blurb:
      "Built the official Grade 10 Council website so students could find events, fundraisers, FAQs, and recruitment info in one place.",
    year: "2025",
    role: "Designer & developer",
    tags: ["Web", "Design", "Student Council"],
    accent: "sky" as const,
    cover: "/images/real/work-website.jpg",
    detailImage: "/images/real/work-website-detail.jpg",
    details: [
      "Included events, news, FAQ, recruitment, and team sections.",
      "Kept navigation simple and the visual style bold and school-focused.",
      "Built around representation, fundraising, and school events.",
    ],
    takeaway: "A central hub for the student body.",
  },
  {
    id: "works-3",
    title: "Social Media Manager",
    blurb:
      "Ran social media for student council and school clubs — promoting events, transit advocacy, fundraisers, and getting more students involved.",
    year: "2025",
    role: "Content & design",
    tags: ["Social Media", "Design", "Content"],
    accent: "peach" as const,
    cover: "/images/real/work-social.jpg",
    detailImage: "/images/real/work-social-detail.jpg",
    details: [
      "Designed event posters, club updates, and recruitment graphics.",
      "Managed content for Grade 10 Council, OnTrackYVR, and NEGC.",
      "Helped with fundraisers, transit advocacy, and school involvement.",
    ],
    takeaway: "Turning updates into content students notice.",
  },
  {
    id: "works-4",
    title: "Club Leads",
    blurb:
      "I've taken on 7 leadership roles across debate, business, environmental advocacy, student government, and mentorship — turning ideas into real initiatives that get people involved.",
    year: "2025–27",
    role: "7 Leadership Roles",
    tags: ["Leadership", "Clubs", "Community"],
    accent: "grape" as const,
    cover: "/images/real/work-clubs.jpg",
    detailImage: "/images/real/work-clubs-detail.jpg",
    details: [
      "2026–2027 Burnaby North Debate Club Executive.",
      "2026–2027 Burnaby North Business Club Vice President.",
      "2026 Nature Exploration Geographic Club Vice President.",
      "2026–Present OnTrackYVR President / Founder.",
      "2025–2026 Grade 10 Council / Grade 10 Representative.",
      "2025–2026 Student Government Member.",
      "2026–2027 Mentorship Student.",
    ],
    takeaway: "Seven roles. One mission: build things that last.",
  },
  {
    id: "works-5",
    title: "Westridge Elementary Volunteering",
    blurb:
      "A week in June volunteering across five classrooms at Westridge Elementary. Hung out with the kids, joined in on activities, and tried to figure out what makes a teacher actually good.",
    year: "June 2025",
    role: "Volunteer",
    tags: ["Volunteering", "Education", "Community"],
    accent: "coral" as const,
    cover: "/images/real/work-westridge.jpg",
    gallery: [
      { src: "/images/real/westridge-1.jpg", caption: "Popsicle break with everyone." },
      { src: "/images/real/westridge-2.jpg", caption: "With the kids under the trees." },
      { src: "/images/real/westridge-3.jpg", caption: "Silly faces." },
      { src: "/images/real/westridge-4.jpg", caption: "On the bench with these two." },
      { src: "/images/real/westridge-5.jpg", caption: "Heart hands." },
      { src: "/images/real/westridge-6.jpg", caption: "Kite-flying at recess." },
      { src: "/images/real/westridge-7.jpg", caption: "Movie time in the classroom." },
      { src: "/images/real/westridge-8.jpg", caption: "Their drawings were so good." },
      { src: "/images/real/westridge-9.jpg", caption: "Art class." },
    ],
    details: [
      "Five classrooms over five days.",
      "Joined activities, helped teachers, and hung out with the kids.",
      "Kind of felt like being back in elementary school myself.",
    ],
    takeaway: "Photos from the week.",
  },
];

/* Code projects — StudyOS + ClubHub, code-editor card style */
export const codeProjects = [
  {
    id: "studyos",
    name: "StudyOS",
    tagline: "Your Academic Life Operating System",
    description:
      "A full academic planner for students — timetable, calendar, homework, exams, grades, focus timer, notes, and an AI study assistant. Syncs Google Calendar and school iCal feeds, supports push notifications, and installs as a PWA.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Google AI", "Tailwind"],
    features: [
      "Timetable with Day 1/Day 2 rotation + Google Calendar sync",
      "Tasks, exams, grades, and class management",
      "Focus timer (Pomodoro) + AI study assistant",
      "PWA with push notifications and document scanning",
    ],
    liveUrl: "https://studyos-zlnj.onrender.com/",
    accent: "lime" as const,
  },
  {
    id: "clubhub",
    name: "ClubHub",
    tagline: "Club management platform for youth organizations",
    description:
      "A multi-club workspace for running volunteer and leadership clubs day-to-day. Service hour tracking with approval workflows, Kanban task boards, announcements, meetings with RSVPs, member roles, and real-time chat. Built for groups like OnTrackYVR.",
    stack: ["Next.js", "TypeScript", "Prisma", "Supabase", "NextAuth", "Socket.io"],
    features: [
      "Multi-club workspaces with service hour tracking + PDF/CSV export",
      "Kanban tasks, teams, announcements, and meetings with RSVP",
      "Member directory with roles + admin panel",
      "Real-time chat + per-club accent branding",
    ],
    liveUrl: "https://clubhub-0rir.onrender.com/",
    accent: "sky" as const,
  },
];

/* Skills — marquee rows. More leadership, less coding. */
export const skillRows = [
  {
    direction: "left" as const,
    skills: [
      "Leadership",
      "Event planning",
      "Public speaking",
      "Mentoring",
      "Curriculum design",
      "Community building",
      "Fundraising",
      "Team management",
    ],
  },
  {
    direction: "right" as const,
    skills: [
      "Python",
      "Java",
      "Git",
    ],
  },
  {
    direction: "left" as const,
    skills: [
      "Debate",
      "Teaching",
      "Outreach",
      "Advocacy",
      "Workshops",
      "Writing",
      "Design",
      "Communication",
    ],
  },
];

/* Tone map — for the About section's little palette */
export const toneMap = [
  { name: "Lime", hex: "#b7df6e", mood: "Energy" },
  { name: "Sun", hex: "#ffd76a", mood: "Optimism" },
  { name: "Sky", hex: "#a9d8ff", mood: "Calm" },
  { name: "Grape", hex: "#c8b2ff", mood: "Curiosity" },
  { name: "Peach", hex: "#ffb47c", mood: "Warmth" },
  { name: "Coral", hex: "#ff8b82", mood: "Guts" },
];

/* Timeline — leadership roles */
export const timeline = [
  {
    id: "t1",
    period: "2026 — Present",
    role: "Instructor",
    org: "Non-Profit · Scratch Junior, Python & Electrical Engineering",
    description:
      "Teach elementary and middle school kids how to code in Scratch Junior and Python, plus basic electrical engineering. I plan lessons, run sessions, and help kids who've never written a line of code before.",
    accent: "lime" as const,
  },
  {
    id: "t2",
    period: "2026 — Present",
    role: "Founder & President",
    org: "OnTrackYVR (Transportation Network Club)",
    description:
      "Started this club to map transit gaps and push for better student commute options. Run meetings, plan campaigns, and handle outreach.",
    accent: "sky" as const,
  },
  {
    id: "t3",
    period: "2026",
    role: "Vice President",
    org: "Nature Exploration Geographic Club",
    description:
      "Lead the club's environmental projects — species awareness, local watershed research, and policy briefs we share with the school.",
    accent: "peach" as const,
  },
  {
    id: "t4",
    period: "2026 — Present",
    role: "Executive",
    org: "Burnaby North Debate Club",
    description:
      "Compete in BP and CNDF formats. Help run practices, mentor newer debaters, and keep the resources site updated so people aren't digging through old Drive folders.",
    accent: "grape" as const,
  },
  {
    id: "t5",
    period: "2025 — 2026",
    role: "Grade 10 Representative",
    org: "Grade 10 Council / Student Government",
    description:
      "Represented my grade on student council and student government. Helped plan events, ran fundraisers, and pushed initiatives that actually got approved.",
    accent: "coral" as const,
  },
  {
    id: "t6",
    period: "2026 — 2027",
    role: "Mentorship Student",
    org: "Burnaby North Mentorship Program",
    description:
      "Mentored younger students, helping them navigate high school and develop their skills. Shared what I've learned from building clubs, competing in debate, and shipping projects.",
    accent: "sun" as const,
  },
];

/* Awards — 8 awards, each with gallery photos, glass overlay */
export const awards = [
  {
    id: "a1",
    title: "FDT Debate Tournament Medals",
    org: "Debate",
    year: "2025–26",
    blurb:
      "Across multiple FDT tournaments I earned recognition as an individual speaker and team competitor. These medals represent the consistency, preparation, and confidence I built on the debate floor.",
    accent: "grape" as const,
    image: "/images/real/award-1.jpg",
    gallery: ["/images/real/award-1.jpg", "/images/real/award-1b.jpg", "/images/real/award-1c.jpg"],
  },
  {
    id: "a2",
    title: "Certificates & Academic Recognition",
    org: "Public Speaking",
    year: "2025–26",
    blurb:
      "A collection of certificates and ribbons recognizing debate coursework, public speaking potential, and recital participation.",
    accent: "sun" as const,
    image: "/images/real/award-2.jpg",
    gallery: ["/images/real/award-2.jpg", "/images/real/award-2b.jpg", "/images/real/award-2c.jpg"],
  },
  {
    id: "a3",
    title: "Kayaking — BC Cup Series",
    org: "Kayaking",
    year: "2025",
    blurb:
      "At BC Cup 3, I reached the podium in both K2 200M and K4 200M events, earning third- and second-place finishes.",
    accent: "sky" as const,
    image: "/images/real/award-3.jpg",
    gallery: ["/images/real/award-3.jpg", "/images/real/award-3b.jpg", "/images/real/award-3c.jpg"],
  },
  {
    id: "a4",
    title: "FDT 2025 Season",
    org: "Debate",
    year: "2025",
    blurb:
      "A season of competitive growth, including team and individual recognition across FDT speaking and debate events.",
    accent: "coral" as const,
    image: "/images/real/award-4.jpg",
    gallery: ["/images/real/award-4.jpg", "/images/real/award-4b.jpg", "/images/real/award-4c.jpg"],
  },
  {
    id: "a5",
    title: "Swimming Achievements",
    org: "Swimming",
    year: "2024–25",
    blurb:
      "Milestones from competitive swimming and lifesaving training, including club-meet recognition and Bronze Medallion certification.",
    accent: "lime" as const,
    image: "/images/real/award-5.jpg",
    gallery: ["/images/real/award-5.jpg", "/images/real/award-5b.jpg", "/images/real/award-5c.jpg"],
  },
  {
    id: "a6",
    title: "Business Competitions",
    org: "Business",
    year: "2025–26",
    blurb:
      "Competition experiences through Strive, ELEVATE, and Prosper strengthened my teamwork, strategy, and presentation skills.",
    accent: "peach" as const,
    image: "/images/real/award-6.jpg",
    gallery: ["/images/real/award-6.jpg", "/images/real/award-6b.jpg", "/images/real/award-6c.jpg"],
  },
  {
    id: "a7",
    title: "Swimming Club Meets",
    org: "Swimming",
    year: "2024–25",
    blurb:
      "Club-meet trophies and competition memories that reflect steady training, focus, and continued progress in the pool.",
    accent: "sky" as const,
    image: "/images/real/award-7.jpg",
    gallery: ["/images/real/award-7.jpg", "/images/real/award-7b.jpg", "/images/real/award-7c.jpg"],
  },
  {
    id: "a8",
    title: "Most Creative Presentation Award",
    org: "ELEVATE 2026",
    year: "2026",
    blurb:
      "My team received the Most Creative Presentation Award at ELEVATE 2026 for a business pitch built around a clear idea and a memorable presentation.",
    accent: "sun" as const,
    image: "/images/real/award-8.jpg",
    gallery: ["/images/real/award-8.jpg"],
  },
];

/* FAQ — heading is just "Q&A" */
export const faq = [
  {
    id: "f1",
    q: "What are you currently working on?",
    a: "I'm running OnTrackYVR, prepping for the 2026–2027 debate and business competition season, and doing social media for a few school clubs.",
  },
  {
    id: "f2",
    q: "Design or code — which one are you?",
    a: "Both, depending on the day. Design is where I start because I like thinking about how something should feel. Code is where I end up because I want it to actually work.",
  },
  {
    id: "f3",
    q: "How can students at Burnaby North get involved?",
    a: "Come say hi at OnTrackYVR, Debate Club, or Business Club meetings. We're always looking for people who want to build things.",
  },
  {
    id: "f4",
    q: "What tools do you design with?",
    a: "Figma for layout and UI, Canva and Procreate for posters and social stuff, and HTML/CSS plus Java and Python when something needs to actually work.",
  },
  {
    id: "f5",
    q: "Can I use StudyOS or ClubHub?",
    a: "Yeah — both are live. StudyOS is an academic planner; ClubHub is a hub for school clubs. Links are in the Code section.",
  },
  {
    id: "f6",
    q: "Do you take on work or projects?",
    a: "Depends on the week and the homework load. Email me or DM on Instagram and I'll be honest about whether I can do it well.",
  },
];

export type Profile = typeof profile;
export type Project = (typeof projects)[number];
export type CodeProject = (typeof codeProjects)[number];
export type TimelineItem = (typeof timeline)[number];
export type Award = (typeof awards)[number];
export type FaqItem = (typeof faq)[number];
export type Chapter = (typeof chapters)[number];

export const accentMap = {
  lime: { bg: "var(--color-lime)", soft: "rgba(183,223,110,0.18)", text: "#5d7a1f" },
  sun: { bg: "var(--color-sun)", soft: "rgba(255,215,106,0.18)", text: "#8a6b00" },
  sky: { bg: "var(--color-sky)", soft: "rgba(169,216,255,0.18)", text: "#1f5a8a" },
  grape: { bg: "var(--color-grape)", soft: "rgba(200,178,255,0.18)", text: "#5a3f8a" },
  peach: { bg: "var(--color-peach)", soft: "rgba(255,180,124,0.18)", text: "#8a4d1f" },
  coral: { bg: "var(--color-coral)", soft: "rgba(255,139,130,0.18)", text: "#8a2f29" },
} as const;

export type AccentKey = keyof typeof accentMap;
