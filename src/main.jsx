    import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Award,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  FileDown,
  Github,
  GraduationCap,
  Linkedin,
  Lock,
  Mail,
  Medal,
  Menu,
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
  languages: ['Arabic', 'French', 'English'],
  // Photo: drop your picture in public/ (e.g. public/me.jpg) and point to it here.
  photo: '/me.jpg',
  tagline: 'I build complete products, web and mobile, from interface to API to deployment.',
  summary:
    'Software engineering graduate from ISIMM, working across the full stack with React, Angular, Spring Boot, and NestJS — and building mobile apps with Flutter and Android Studio. I know my way around shipping too: Docker, Kubernetes, and CI/CD pipelines.',
  facts: [
    { icon: GraduationCap, label: 'Degree', value: 'Software Engineering, ISIMM' },
  ],
  beyondCode:
    'Outside of code, I served as Sponsor Manager for the ARSII ISIMM association—securing partnerships and driving community outreach—and stay active in the CPU Club. My leadership experience also extends to event coordination, having organized high-impact competitions like Hackathon ACT for ISIMM and the IT IMPACT Hackathon with ARSII.',
};

const navItems = ['About', 'Work', 'Projects', 'Awards', 'Skills', 'Contact'];

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
  { degree: 'Engineering Degree in Computer Science — Software Engineering', school: 'ISIMM, Monastir', period: '2023 – 2026' },
  { degree: 'Integrated Preparatory Cycle', school: 'ISIMM, Monastir', period: '2021 – 2023' },
  { degree: 'Baccalaureate in Computer Science — High Distinction', school: 'Lycée Jammel', period: '2020 – 2021' },
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
      <Section id="work" eyebrow="Experience">
        <div className="timeline">
          {experiences.map((item, index) => (
            <motion.article
              className="expItem"
              key={item.company}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.08 }}
            >
              <span className="expDot" aria-hidden="true" />
              <div className="expBody">
                <div className="expHead">
                  <h3>{item.title}</h3>
                  <span className="expPeriod">{item.period}</span>
                </div>
                <p className="expCompany">{item.company}</p>
                <p className="expProject">{item.project}</p>
                <ul className="expPoints">
                  {item.points.map((point) => (
                    <li key={point}>
                      <span>▸</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>
      <Section id="projects" eyebrow="Selected projects" title={<>Things I&apos;ve designed, built, and <em>shipped</em>.</>}>
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
          <div className="cmdTitlebar">
            <span className="cmdDot cmdDotRed" />
            <span className="cmdDot" />
            <span className="cmdDot" />
            <span className="cmdPath">~/awards/nuit-de-linfo</span>
          </div>
          <div className="awardBody">
            <div className="awardHead">
              <div className="awardIcon">
                <Medal size={26} />
              </div>
              <div>
                <p className="awardTag">{awards.tag}</p>
                <h3>{awards.title}</h3>
              </div>
            </div>
            <p className="awardSummary">{awards.summary}</p>
          </div>
        </motion.article>
      </section>
      <Section id="skills" eyebrow="Technical range">
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
      <section className="section" id="education">
        <div className="eduHeader">
          <div>
            <p className="eyebrow">Foundations</p>
            <h2>Education &amp; <em>certifications</em>.</h2>
          </div>
        </div>
        <div className="eduGrid">
          <div>
            <div className="cmdLabel">
              <GraduationCap size={15} />
              EDUCATION
            </div>
            <div className="eduList">
              {education.map(({ degree, school, period }, index) => (
                <motion.div
                  className="eduItem"
                  key={degree}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: index * 0.06 }}
                >
                  <p className="eduDegree">{degree}</p>
                  <p className="eduSchool">{school}</p>
                  <p className="eduPeriod">{period}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <div className="cmdLabel">
              <Award size={15} />
              CERTIFICATIONS
            </div>
            <ul className="certList">
              {certifications.map(({ name, date }) => (
                <li key={name}>
                  <span>▸</span>
                  {name} <em className="certDate">— {date}</em>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
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
            As a software engineering graduate, I thrive on the full product journey—from initial UI sketches and core
            API development to real-world deployment. My internship experience spans the full stack: building frontend
            interfaces with React and Angular, developing robust backends using Spring Boot and NestJS, and managing
            relational and NoSQL databases like MySQL, PostgreSQL, and MongoDB. I&apos;ve also built cross-platform and
            native mobile apps using Flutter and Android Studio, and I am comfortable shipping reliable code using
            Docker, CI/CD pipelines, and Kubernetes.
          </p>
        </motion.div>
        <motion.div
          className="aboutJson"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.08 }}
        >
          <div className="cmdWindow">
            <div className="cmdTitlebar">
              <span className="cmdDot cmdDotRed" />
              <span className="cmdDot" />
              <span className="cmdDot" />
              <span className="cmdPath">~/profile.json</span>
            </div>
            <div className="cmdBody">
              <p>
                <span className="cmdKey">"name"</span>: <span className="cmdVal">"{profile.name}"</span>,
              </p>
              <p>
                <span className="cmdKey">"role"</span>: <span className="cmdVal">"{profile.role}"</span>,
              </p>
              <p>
                <span className="cmdKey">"based_in"</span>: <span className="cmdVal">"{profile.location}"</span>,
              </p>
              <p>
                <span className="cmdKey">"languages"</span>: [
                <span className="cmdVal">{profile.languages.map((language) => `"${language}"`).join(', ')}</span>],
              </p>
              <p>
                <span className="cmdKey">"phone"</span>: <span className="cmdVal">"{profile.phone}"</span>,
              </p>
              <p>
                <span className="cmdKey">"open_to_work"</span>: <span className="cmdVal cmdBool">true</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="beyondCode"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <Sparkles size={18} />
        <div>
          <p className="beyondLabel">beyond_code</p>
          <p>{profile.beyondCode}</p>
        </div>
      </motion.div>
    </section>
  );
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section className="section" id={id}>
      <div className="sectionHeader">
        <div className="sectionMeta">
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
      <div className="cmdTitlebar">
        <span className="cmdDot cmdDotRed" />
        <span className="cmdDot" />
        <span className="cmdDot" />
        <span className="cmdPath">~/projects/{project.title.toLowerCase().replace(/\s+/g, '-')}</span>
      </div>
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
            <small>preview_unavailable.png</small>
          </div>
        )}
      </div>
      <div className="projectContent">
        <h3 className="projectTitle">{project.title}</h3>
        <p className="projectSubtitle">{project.type}</p>
        <p className="projectDesc">{project.description}</p>
        <div className="stackList">
          {project.stack.map((tech) => (
            <small key={tech}>{tech}</small>
          ))}
        </div>
        <div className="projectFooter">
          {project.nda ? (
            <div className="ndaNote">
              <Lock size={14} />
              <span>Source code &amp; demo under NDA</span>
            </div>
          ) : (
            <>
              <a className="btnGhost" href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub repository`}>
                <Github size={15} />
                Code
              </a>
              {project.live && project.live.trim() && project.live.trim() !== '#' ? (
                <a className="btnSolid" href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.title} live project`}>
                  <ExternalLink size={15} />
                  Live
                </a>
              ) : (
                <span className="btnPrivate">
                  <ExternalLink size={15} />
                  Private
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contactGlow" aria-hidden="true" />
      <div className="contactInner">
        <p className="eyebrow">Contact</p>
        <h2>Have an idea, a project, or just want to say <em>hi</em> ? Let&apos;s talk.</h2>
        <p className="contactSub">
          Open to full-stack, mobile, and software engineering roles. Email is the fastest way to reach me.
        </p>
        <a className="contactEmail" href={`mailto:${profile.email}`}>
          {profile.email}
          <ArrowUpRight size={16} />
        </a>
        <div className="contactSocial">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <Mail size={20} />
          </a>
          <a className="resumeLink" href="/Nadine_Mlayah_CV_EN.pdf" target="_blank" rel="noreferrer">
            resume
          </a>
        </div>
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
