    import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Award,
  Cloud,
  Code2,
  Database,
  FileDown,
  Github,
  GraduationCap,
  Languages,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  Medal,
  Menu,
  Phone,
  Play,
  ServerCog,
  Smartphone,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react';
import './styles.css';

const profile = {
  name: 'Nadine Mlayeh',
  role: 'Full Stack Engineer',
  location: 'Jammel, Tunisia',
  phone: '+216 96 424 436',
  email: 'nadine.mlayah@gmail.com',
  github: 'https://github.com/NadineMlayeh',
  linkedin: 'https://linkedin.com/in/nadine-mlayah',
  // Photo: drop your picture in public/ (e.g. public/me.jpg) and point to it here.
  photo: '/me.jpg',
  tagline: 'I build complete products, web and mobile, from interface to API to deployment.',
  summary:
    'Software engineering graduate from ISIMM, working across the full stack with React, Angular, Spring Boot, and NestJS — and building mobile apps with Flutter and Android Studio. I know my way around shipping too: Docker, Kubernetes, and CI/CD pipelines.',
  facts: [
    { icon: MapPin, label: 'Based in', value: 'Jammel, Tunisia' },
    { icon: GraduationCap, label: 'Degree', value: 'Software Engineering, ISIMM' },
    { icon: Languages, label: 'Languages', value: 'Arabic · French · English' },
    { icon: Phone, label: 'Phone', value: '+216 96 424 436' },
  ],
  beyondCode:
    'Outside of code, I led sponsorship at the ARSII ISIMM student association and stay active in the CPU Club. Organizing, connecting people, and making things happen.',
};

const navItems = ['About', 'Work', 'Projects', 'Awards', 'Skills', 'Contact'];

const metrics = [
  { value: '3+', label: 'hands-on internships' },
  { value: '5', label: 'projects designed & built' },
  { value: '3', label: 'languages I speak' },
];

const ticker = [
  'React',
  'Angular',
  'Spring Boot',
  'NestJS',
  'Flutter',
  'Android',
  'MySQL',
  'PostgreSQL',
  'MongoDB',
  'Docker',
  'Kubernetes',
  'CI/CD',
];

const skills = [
  { title: 'Frontend', icon: Code2, items: ['React', 'Next.js', 'Angular', 'HTML','Tailwind CSS','Bootstrap','Framer Motion'] },
  { title: 'Backend', icon: ServerCog, items: ['Spring Boot', 'NestJS', 'REST API', 'Java'] },
  { title: 'Mobile', icon: Smartphone, items: ['Flutter', 'Dart', 'Android Studio', 'Java'] },
  { title: 'Data', icon: Database, items: ['MySQL', 'PostgreSQL', 'MongoDB'] },
  { title: 'Languages & Tools', icon: Terminal, items: ['Python', 'C/C++', 'Git/GitHub'] },
  { title: 'Deployment & Cloud', icon: Cloud, items: ['Docker', 'Kubernetes', 'GitLab CI/CD', 'AWS'] },
];

const experiences = [
  {
    period: 'Feb 2026 — Jun 2026',
    company: 'Uptech, Tunisia',
    title: 'Software Engineering Intern',
    project: 'Portal — after-sales service & product management platform',
    points: [
      'Designed and developed a full-stack, microservices platform (Angular frontend, Spring Boot APIs, MySQL) covering after-sales service, product, and user management.',
      'Built features end-to-end: from UI screens and REST endpoints to data models, with async communication wired through RabbitMQ and auth via Keycloak.',
      'Shipped it with an automated CI/CD pipeline and GitOps deployment (GitLab CI, ArgoCD, Kubernetes), with MinIO for object storage.',
    ],
  },
  {
    period: '2025',
    company: 'Mobtakiron, Tunisia',
    title: 'Full Stack Developer Intern',
    project: 'Interactive educational platform',
    points: [
      'Built a platform where children take online courses, instructors publish lessons and exercises, and admins track real-time usage.',
      'Implemented the React frontend against a NestJS API and PostgreSQL database.',
      'Designed the data models and statistical dashboards behind learning-progress tracking.',
    ],
  },
  {
    period: 'Aug 2024',
    company: 'ElectroHamza, Tunisia',
    title: 'Full Stack Developer Intern',
    project: 'Inventory & sales management platform',
    points: [
      'Developed a home-appliance sales web app with React.js on the frontend and Spring Boot on the backend.',
      'Implemented customer management, transaction tracking, and a secure payment flow.',
      'Modeled and administered the MySQL database powering inventory and sales.',
    ],
  },
];

const projects = [
  {
    title: 'Portal',
    type: 'Capstone · Enterprise platform',
    description:
      'After-sales service and product management platform built as a microservices architecture, with SSO, async messaging, object storage, and automated Kubernetes delivery.',
    stack: ['Spring Boot', 'Angular', 'MySQL', 'RabbitMQ', 'Keycloak', 'Kubernetes'],
    // Media: drop a screenshot / video in public/projects/ and point to it, e.g. media: '/projects/theportal.png'
    media: '/projects/portal.png',
    // Source code and demo can't be shared due to the NDA I signed after delivering the work.
    nda: true,
    github: '',
    live: '',
  },
  {
    title: 'InnovaLearn',
    type: 'Internship · Educational platform',
    description:
      'Interactive learning platform where children take online courses, instructors publish lessons and exercises, and admins track real-time usage.',
    stack: ['React', 'NestJS', 'PostgreSQL'],
    media: 'https://res.cloudinary.com/ogbxb9wp/video/upload/v1786999042/innova_sped_1.mp4',
    github: 'https://github.com/NadineMlayeh/Learning-plateform',
    live: 'https://learning-plateform-nu.vercel.app',
  },
  {
    title: 'Home Appliances',
    type: 'Internship · Business app',
    description:
      'Home-appliance sales web app with inventory control, customer management, transaction tracking, and secure payment integration.',
    stack: ['React', 'Spring Boot', 'MySQL'],
    media: 'https://res.cloudinary.com/ogbxb9wp/video/upload/v1786998795/electrohamza.mp4',
    github: 'https://github.com/NadineMlayeh/Home-Appliances-Management-Website',
    live: 'https://home-appliances-management-website.onrender.com ',
  },
  {
    title: 'HackerCry Zone',
    type: 'Competition · Cybersecurity education',
    description:
      'A website that teaches people, in an interactive way, how to prevent getting hacked, built for the Nuit de l’Info competition under its requested theme.',
    stack: ['JavaScript', 'HTML/CSS', 'UX Design'],
    media: 'https://res.cloudinary.com/ogbxb9wp/video/upload/v1786999785/hacker_1.mp4',
    github: 'https://github.com/NadineMlayeh/Hacker-website',
    live: 'https://hackers-cry-zone.web.app/',
  },
];

const awards = {
  title: 'Nuit de l’Info · 2024 & 2025',
  tag: 'Competition · Back-to-back editions',
  summary:
    'Competed in two consecutive editions of the annual 24-hour coding night. In 2025, my team won second place in the “most creative animated website” défi with Shake That Site, built around that year’s theme.',
};

const certifications = [
  { name: 'AWS Academy Cloud Security Foundations', date: 'May 2025' },
  { name: 'AWS Academy Cloud Foundations', date: 'May 2025' },
  { name: 'Hashgraph Developer Course', date: 'April 2025' },
];

const education = [
  'Engineering Degree in Computer Science — Software Engineering · ISIMM, Monastir · 2023 – 2026',
  'Integrated Preparatory Cycle · ISIMM, Monastir · 2021 – 2023',
  'Baccalaureate in Computer Science — High Distinction · Lycée Jammel · 2020 – 2021',
];

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observers = ids.map((id) => {
      const element = document.getElementById(id.toLowerCase());
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: '-36% 0px -58% 0px', threshold: 0.01 },
      );

      observer.observe(element);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, [ids]);

  return active;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const activeSection = useScrollSpy(navItems);
  const fadeUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    }),
    [shouldReduceMotion],
  );

  return (
    <main>
      <ScrollProgress />
      <Spotlight />
      <Header activeSection={activeSection} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero fadeUp={fadeUp} />
      <About fadeUp={fadeUp} />
      <Section id="work" eyebrow="Experience" index={2}>
        <div className="timeline">
          {experiences.map((item, index) => (
            <motion.article
              className="timelineItem"
              key={item.company}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="timelineDate">{item.period}</div>
              <div className="timelineBody">
                <p className="company">{item.company}</p>
                <h3>{item.title}</h3>
                <p className="projectName">{item.project}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>
      <Section id="projects" eyebrow="Selected projects" title={<>Things I&apos;ve designed, built, and <em>shipped</em>.</>} index={3}>
        <div className="projectGrid">
          {projects.map((project, index) => (
            <ProjectCard
              project={project}
              index={index}
              wide={index === projects.length - 1 && projects.length % 2 === 1}
              key={project.title}
              fadeUp={fadeUp}
            />
          ))}
        </div>
      </Section>
      <section className="section" id="awards">
        <div className="sectionHeader">
          <div className="sectionMeta">
            <span className="sectionNum">04</span>
            <p className="eyebrow">Recognition</p>
          </div>
        </div>
        <motion.article
          className="awardCard"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="awardIcon">
            <Medal size={26} />
          </div>
          <div className="awardBody">
            <p className="awardTag">{awards.tag}</p>
            <h3>{awards.title}</h3>
            <p>{awards.summary}</p>
          </div>
        </motion.article>
      </section>
      <Section id="skills" eyebrow="Technical range" index={5}>
        <div className="skillsGrid">
          {skills.map(({ title, icon: Icon, items }, index) => (
            <motion.article
              className="skillPanel"
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="skillTitle">
                <Icon size={20} />
                <h3>{title}</h3>
              </div>
              <div className="chips">
                {items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </Section>
      <Section id="education" eyebrow="Formation" title={<>My academic path and <em>certifications</em>.</>} index={6}>
        <div className="educationLayout">
          <div className="educationList">
            {education.map((item) => (
              <p key={item}>
                <GraduationCap size={18} />
                {item}
              </p>
            ))}
          </div>
          <div className="certPanel">
            {certifications.map(({ name, date }) => (
              <p className="certRow" key={name}>
                <Award size={18} />
                <span>
                  <strong>{name}</strong>
                  <small>{date}</small>
                </span>
              </p>
            ))}
          </div>
        </div>
      </Section>
      <Contact />
      <footer className="siteFooter">
        <span>Designed &amp; built by {profile.name}</span>
      </footer>
      <BackToTop />
    </main>
  );
}

function Header({ activeSection, menuOpen, setMenuOpen }) {
  return (
    <header className="siteHeader">
      <a className="brand" href="#top" aria-label={`${profile.name} home`}>
        <Portrait />
      </a>
      <nav className={menuOpen ? 'nav navOpen' : 'nav'} aria-label="Main navigation">
        {navItems.map((item) => (
          <a
            className={activeSection === item ? 'active' : ''}
            href={`#${item.toLowerCase()}`}
            key={item}
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </a>
        ))}
      </nav>
      <button className="iconButton menuButton" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  );
}

function Portrait() {
  const [failed, setFailed] = useState(false);

  if (!profile.photo || failed) {
    return <div className="portraitFallback" aria-label={`${profile.name} monogram`}>NM</div>;
  }

  return (
    <img
      src={profile.photo}
      alt={`Portrait of ${profile.name}`}
      onError={() => setFailed(true)}
    />
  );
}

function Hero({ fadeUp }) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 700], [0, 90]);
  const nameWord = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 36 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };
  const nameWords = profile.name.split(' ');

  return (
    <section className="hero" id="top">
      <motion.div className="heroCanvas" style={{ y: parallax }} aria-hidden="true">
        <div className="signal signalOne" />
        <div className="signal signalTwo" />
        <div className="redline redlineOne" />
        <div className="redline redlineTwo" />
      </motion.div>
      <div className="heroSide" aria-hidden="true">
        {profile.role}
      </div>
      <div className="heroLayout">
        <motion.div className="heroText" variants={fadeUp} initial="hidden" animate="visible">
          <p className="eyebrow">Hi, I&apos;m Nadine — {profile.role}</p>
          <h1 aria-label={profile.name}>
            {nameWords.map((word, i) => (
              <motion.span
                className="nameWord"
                key={`${word}-${i}`}
                variants={nameWord}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.18 + i * 0.14 }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.span
            className="nameLine"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.65, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
          <p className="heroTagline">{profile.tagline}</p>
          <p className="heroSummary">{profile.summary}</p>
          <div className="heroActions">
            <a className="primaryAction" href="#projects">
              View my work <ArrowUpRight size={18} />
            </a>
            <a className="secondaryAction" href="/Nadine_Mlayah_CV_EN.pdf" target="_blank" rel="noreferrer">
              Resume <FileDown size={18} />
            </a>
            <a className="secondaryAction" href="#contact">
              Say hi <Mail size={18} />
            </a>
          </div>
        </motion.div>
        <motion.figure
          className="heroPortrait"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
        >
          <div className="portraitFrame">
            <Portrait />
          </div>
        </motion.figure>
      </div>
      <div className="ticker" aria-hidden="true">
        <div className="tickerTrack">
          {[...ticker, ...ticker].map((tech, index) => (
            <span key={`${tech}-${index}`}>
              {tech}
              <i>✦</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function About({ fadeUp }) {
  return (
    <section className="about" id="about">
      <div className="sectionHeader">
        <div className="sectionMeta">
          <span className="sectionNum">01</span>
          <p className="eyebrow">About</p>
        </div>
        <h2>A little <em>about</em> me.</h2>
      </div>
      <div className="aboutGrid">
        <motion.div
          className="aboutBio"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p>
            I&apos;m a software engineering graduate who enjoys the whole journey of building software, from the first
            sketch of an interface to the API behind it, and all the way to putting it in front of real users.
          </p>
          <p>
            I&apos;ve spent my internships going deep on the full stack: React and Angular on the frontend, Spring Boot and
            NestJS on the backend, and MySQL, PostgreSQL, or MongoDB underneath. I also build mobile apps with Flutter and
            Android Studio. That balance of UI and data, design and logic, is exactly where I like to work.
          </p>
          <p>
            When it comes to shipping, I&apos;m comfortable on the deployment side too — containerizing with Docker,
            wiring up CI/CD pipelines, and getting applications running on Kubernetes.
          </p>
          <div className="beyondCode">
            <Sparkles size={18} />
            <p>{profile.beyondCode}</p>
          </div>
        </motion.div>
        <motion.div
          className="factGrid"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.08 }}
        >
          {profile.facts.map(({ icon: Icon, label, value }) => (
            <div className="factCard" key={label}>
              <div className="factIcon">
                <Icon size={22} />
              </div>
              <span>{label}</span>
              <strong>{value}</strong>
              <Icon className="factWatermark" size={110} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Section({ id, eyebrow, title, children, index }) {
  return (
    <section className="section" id={id}>
      <div className="sectionHeader">
        <div className="sectionMeta">
          {index != null && <span className="sectionNum">{String(index).padStart(2, '0')}</span>}
          <p className="eyebrow">{eyebrow}</p>
        </div>
        {title ? <h2>{title}</h2> : null}
      </div>
      {children}
    </section>
  );
}

function ProjectCard({ project, index, wide, fadeUp }) {
  const hasMedia = Boolean(project.media);
  const isVideo = hasMedia && project.media.endsWith('.mp4');
  const [hovered, setHovered] = useState(false);
  const [canHover] = useState(() => typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches);
  const videoRef = useRef(null);

  const handleEnter = () => {
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleLeave = () => {
    setHovered(false);
    videoRef.current?.pause();
  };

  return (
    <motion.article
      className={wide ? 'projectCard wide' : 'projectCard'}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.06 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onViewportLeave={() => videoRef.current?.pause()}
    >
      <div className="projectMedia">
        {hasMedia ? (
          isVideo ? (
            <>
              <video
                ref={videoRef}
                src={project.media}
                muted
                loop
                playsInline
                preload="metadata"
                controls={canHover ? hovered : true}
              />
              {canHover && !hovered && (
                <span className="videoHint">
                  <Play size={14} />
                  Hover to play
                </span>
              )}
            </>
          ) : (
            <img src={project.media} alt={`${project.title} preview`} />
          )
        ) : (
          <div className="mediaPlaceholder">
            <span>{project.title}</span>
            <small>Add a screenshot, video, or GIF</small>
          </div>
        )}
      </div>
      <div className="projectContent">
        <p>{project.type}</p>
        <h3>{project.title}</h3>
        <span>{project.description}</span>
        <div className="stackList">
          {project.stack.map((tech) => (
            <small key={tech}>{tech}</small>
          ))}
        </div>
        {project.nda ? (
          <div className="ndaNote">
            <Lock size={14} />
            <span>Source code &amp; demo under NDA</span>
          </div>
        ) : (
          <div className="projectActions">
            <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub repository`}>
              <Github size={18} />
            </a>
            <a href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.title} live project`}>
              <ArrowUpRight size={18} />
            </a>
          </div>
        )}
      </div>
    </motion.article>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Have an idea, a project, or just want to say <em>hi</em>? Let&apos;s talk.</h2>
      </div>
      <div className="contactActions">
        <a href={`mailto:${profile.email}`}>
          <Mail size={18} />
          Email
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          <Linkedin size={18} />
          LinkedIn
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          <Github size={18} />
          GitHub
        </a>
        <a href="/Nadine_Mlayah_CV_EN.pdf" target="_blank" rel="noreferrer">
          <FileDown size={18} />
          Resume
        </a>
      </div>
    </section>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="scrollProgress" style={{ scaleX: scrollYProgress }} />;
}

function Spotlight() {
  const [pos, setPos] = useState({ x: -800, y: -800 });

  useEffect(() => {
    let frame;
    const onMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setPos({ x: event.clientX, y: event.clientY }));
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="spotlight" style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }} aria-hidden="true" />;
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.a
      className="backToTop"
      href="#top"
      aria-label="Back to top"
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 14, pointerEvents: visible ? 'auto' : 'none' }}
    >
      <ArrowUpRight size={18} />
    </motion.a>
  );
}

createRoot(document.getElementById('root')).render(<App />);
