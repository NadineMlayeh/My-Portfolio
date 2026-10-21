import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronRight, Code2, Copy, FileDown, Github, GraduationCap, Home, LayoutGrid, Linkedin, Lock, Mail, Medal, Sparkles, UserRound, X } from 'lucide-react';
import './mobile.css';
import { LampControl } from './lighting.jsx';

const destinations = [
  { id: 'home', hash: 'top', label: 'Home', icon: Home },
  { id: 'projects', hash: 'projects', label: 'Projects', icon: LayoutGrid },
  { id: 'about', hash: 'about', label: 'About', icon: UserRound },
  { id: 'contact', hash: 'contact', label: 'Contact', icon: Mail },
];

function currentView() {
  const hash = window.location.hash.slice(1).toLowerCase();
  if (['work', 'skills', 'awards', 'education'].includes(hash)) return 'about';
  return destinations.find((item) => item.hash === hash)?.id || 'home';
}

function linkedAboutTab() {
  if (window.location.hash === '#work') return 'Experience';
  if (window.location.hash === '#skills') return 'Toolkit';
  return 'Story';
}

function matchesFilter(project, filter) {
  if (filter === 'All') return true;
  if (filter === 'AI') return project.stack.some((tech) => /Gemini|BM25/.test(tech));
  if (filter === 'Personal') return /Personal|3D|RAG/.test(project.type);
  return /Internship|Capstone|Competition/.test(project.type);
}

export default function MobilePortfolio(data) {
  const { profile, projects, Portrait } = data;
  const [view, setView] = useState(currentView);
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [aboutTab, setAboutTab] = useState(linkedAboutTab);
  const [copyStatus, setCopyStatus] = useState('');
  const previousView = useRef(view);
  const screenRef = useRef(null);

  useEffect(() => {
    const navigate = () => {
      setView(currentView());
      setSelected(null);
      if (['#work', '#skills'].includes(window.location.hash)) setAboutTab(linkedAboutTab());
    };
    window.addEventListener('hashchange', navigate);
    return () => window.removeEventListener('hashchange', navigate);
  }, []);
  useEffect(() => {
    if (previousView.current !== view) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      screenRef.current?.focus({ preventScroll: true });
      previousView.current = view;
    }
  }, [view]);

  const visibleProjects = projects.filter((project) => matchesFilter(project, filter));
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyStatus('Email copied');
    } catch {
      setCopyStatus('You can select and copy the email above.');
    }
  };

  return <div className="mobileApp">
    <header className="appHeader">
      <a href="#top" className="appBrand" aria-label="Nadine Mlayah home"><span className="appAvatar"><Portrait /></span><span>Nadine<span className="appBrandSub">Portfolio / software engineer</span></span></a>
      <div className="appHeaderActions"><LampControl /><a className="appHeaderAction" href={`mailto:${profile.email}`} aria-label="Email Nadine"><Mail size={19} /></a></div>
    </header>

    <main ref={screenRef} className="appScreen" tabIndex={-1} aria-label={`${destinations.find((item) => item.id === view).label} view`}>
      {view === 'home' && <div className="appHome">
        <section className="appIntro" aria-labelledby="mobile-name">
          <div className="appIntroText"><p className="appEyebrow">Hi, I’m Nadine</p><h1 id="mobile-name">I turn ideas<br />into <em>products.</em></h1><p>Full stack engineer.<br />A creative eye. An engineering mind.</p></div>
          <div className="appHeroPhoto"><Portrait /><span aria-hidden="true"><Code2 size={18} /></span></div>
          <div className="appIntroActions"><a className="appButton appButtonPrimary" href="#projects">Explore my work <ArrowUpRight size={17} /></a><a className="appButton" href="/Nadine_Mlayah_Software_Engineer_CV.pdf" target="_blank" rel="noreferrer"><FileDown size={16} /> Resume</a></div>
        </section>
        <div className="appQuickFacts"><span><Code2 size={14} /> Web & mobile</span><span><Sparkles size={14} /> AI-powered apps</span></div>
        <section className="appFeatured" aria-labelledby="featured-title">
          <div className="appSectionHeading"><h2 id="featured-title">A few things I’ve built</h2><a href="#projects">See all <ChevronRight size={15} /></a></div>
          <div className="appFeaturedRail">
            {[projects[0], projects[2], projects[1]].map((project) => <MobileProjectCard key={project.title} project={project} data={data} open={() => setSelected(project)} suspended={!!selected} compact />)}
          </div>
          <p className="appSwipeHint">Swipe to explore <span aria-hidden="true">↔</span></p>
        </section>
        <a className="appAboutTeaser" href="#about"><span className="appTeaserIcon"><UserRound size={19} /></span><span>Curious about the person?<small>My story, experience & toolkit</small></span><ChevronRight size={18} /></a>
      </div>}

      {view === 'projects' && <section className="appProjects" aria-labelledby="projects-title">
        <div className="appPageHeading"><p className="appEyebrow">The collection</p><h1 id="projects-title">Made with <em>purpose.</em></h1><p>Explore the demos. Tap for the story.</p></div>
        <div className="appFilterBar" role="group" aria-label="Filter projects">{['All', 'AI', 'Personal', 'Professional'].map((item) => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
        <p className="appResults" role="status">{visibleProjects.length} projects</p>
        <div className="appProjectList">{visibleProjects.map((project) => <MobileProjectCard key={project.title} project={project} data={data} open={() => setSelected(project)} suspended={!!selected} />)}</div>
      </section>}

      {view === 'about' && <section className="appAbout" aria-labelledby="about-title">
        <div className="appPageHeading"><p className="appEyebrow">Behind the code</p><h1 id="about-title">A little <em>about me.</em></h1></div>
        <div className="appSegments" role="tablist" aria-label="About Nadine">{['Story', 'Experience', 'Toolkit'].map((item) => <button id={`about-tab-${item}`} role="tab" type="button" key={item} aria-selected={aboutTab === item} aria-controls={`about-panel-${item}`} tabIndex={aboutTab === item ? 0 : -1} onClick={() => setAboutTab(item)} onKeyDown={(event) => {
          if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
            event.preventDefault();
            const tabs = ['Story', 'Experience', 'Toolkit'];
            const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (tabs.indexOf(item) + (event.key === 'ArrowRight' ? 1 : 2)) % 3;
            setAboutTab(tabs[next]);
            document.getElementById(`about-tab-${tabs[next]}`)?.focus();
          }
        }}>{item}</button>)}</div>
        <div role="tabpanel" id={`about-panel-${aboutTab}`} aria-labelledby={`about-tab-${aboutTab}`} className="appAboutPanel">
          {aboutTab === 'Story' && <>
            <div className="appStoryCard"><div className="appStoryPortrait"><Portrait /></div><h2>Nadine Mlayah</h2><span>Full stack engineer · Tunisia</span><p>I enjoy the whole product journey: from a first interface sketch to the API behind it, and finally getting it into people’s hands.</p><div className="appLanguageTags">{profile.languages.map((language) => <span key={language}>{language}</span>)}</div></div>
            <details className="appAccordion"><summary><span><GraduationCap size={19} /> Education & certifications</span><ChevronDown size={17} /></summary><div className="appAccordionBody">{data.education.map((item) => <div className="appEducationItem" key={item.degree}><h3>{item.degree}</h3><p>{item.school} · {item.period}</p></div>)}<h3>Certifications</h3>{data.certifications.map((item) => <p key={item.name}>{item.name}<small>{item.date}</small></p>)}</div></details>
            <details className="appAccordion"><summary><span><Sparkles size={19} /> Beyond code</span><ChevronDown size={17} /></summary><p className="appAccordionBody">{profile.beyondCode}</p></details>
            <details className="appAccordion"><summary><span><Medal size={19} /> A little recognition</span><ChevronDown size={17} /></summary><div className="appAccordionBody"><h3>{data.awards.title}</h3><p>{data.awards.summary}</p></div></details>
          </>}
          {aboutTab === 'Experience' && <><p className="appPanelHint">Three internships. Products built end to end.</p>{data.experiences.map((item, index) => <details className="appAccordion appExperience" key={item.company}><summary><span className="appExperienceNumber">0{index + 1}</span><span className="appExperienceLabel">{item.company}<small>{item.title}</small><small>{item.period}</small></span><ChevronDown size={17} /></summary><div className="appAccordionBody"><h3>{item.project}</h3><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul></div></details>)}</>}
          {aboutTab === 'Toolkit' && <><p className="appPanelHint">The tools I reach for. Tap a category.</p>{data.skills.map(({ title, icon: Icon, items }) => <details className="appAccordion" key={title}><summary><span><Icon size={19} /> {title}</span><ChevronDown size={17} /></summary><div className="appSkillTags appAccordionBody">{items.map((item) => <span key={item}>{item}</span>)}</div></details>)}<details className="appAccordion"><summary><span><Code2 size={19} /> Also worked with</span><ChevronDown size={17} /></summary><div className="appSkillTags appAccordionBody">{data.alsoWorkedWith.items.map((item) => <span key={item}>{item}</span>)}</div></details></>}
        </div>
      </section>}

      {view === 'contact' && <section className="appContact" aria-labelledby="contact-title"><div className="appContactSymbol"><Mail size={30} /></div><p className="appEyebrow">Let’s connect</p><h1 id="contact-title">Something great<br />starts with <em>hello.</em></h1><p>A project, an opportunity, or a good idea.<br />I’d love to hear from you.</p><a className="appButton appButtonPrimary" href={`mailto:${profile.email}`}>Say hello <ArrowUpRight size={18} /></a><div className="appCopyEmail"><span>{profile.email}</span><button type="button" onClick={copyEmail} aria-label="Copy email address"><Copy size={17} /></button></div><p className="appCopyStatus" role="status">{copyStatus}</p><div className="appContactLinks"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={21} /><span>GitHub<small>Explore the source</small></span><ArrowUpRight size={17} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={21} /><span>LinkedIn<small>Let’s connect professionally</small></span><ArrowUpRight size={17} /></a><a href="/Nadine_Mlayah_Software_Engineer_CV.pdf" target="_blank" rel="noreferrer"><FileDown size={21} /><span>Resume<small>The full picture, in a PDF</small></span><ArrowUpRight size={17} /></a></div></section>}
    </main>

    <nav className="appBottomNav" aria-label="Main navigation">{destinations.map(({id, hash, label, icon: Icon}) => <a href={`#${hash}`} key={id} aria-current={view === id ? 'page' : undefined}><span><Icon size={21} strokeWidth={view === id ? 2.2 : 1.6} /></span>{label}</a>)}</nav>
    {selected && <ProjectSheet key={selected.title} project={selected} data={data} close={() => setSelected(null)} />}
  </div>;
}

function MobileMedia({project, data, suspended = false}) {
  const {ScreenshotGallery, ProjectVideo, optimizedImage} = data;
  return <div className="appProjectMedia">{project.screens ? <ScreenshotGallery screens={project.screens} title={project.title} suspended={suspended} /> : project.media?.endsWith('.mp4') ? <ProjectVideo project={project} suspended={suspended} /> : <img src={optimizedImage(project.media)} alt={`${project.title} preview`} loading="lazy" decoding="async" />}</div>;
}

function MobileProjectCard({project, data, open, suspended, compact = false}) {
  return <article className={`appProjectCard${compact ? ' appProjectCompact' : ''}`}>
    <MobileMedia project={project} data={data} suspended={suspended} />
    <div className="appProjectInfo"><p>{project.type}</p><h2><button type="button" onClick={open} aria-label={`Explore ${project.title}`}>{project.title}<ArrowUpRight size={19} /></button></h2>{!compact && <div className="appCardStack">{project.stack.slice(0, 3).map((tech) => <span key={tech}>{tech}</span>)}{project.stack.length > 3 && <span>+{project.stack.length - 3}</span>}</div>}{!compact && <div className="appCardActions"><button type="button" onClick={open}>The story & details <ChevronRight size={15} /></button>{project.nda ? <span><Lock size={13} /> Under NDA</span> : <a href={project.live} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} live project`}>Live <ArrowUpRight size={15} /></a>}</div>}</div>
  </article>;
}

function ProjectSheet({project, data, close}) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);
  return <dialog ref={dialogRef} className="appProjectSheet" aria-labelledby="sheet-title" onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close(); } }}>
    <div className="appSheetBar"><span>Project story</span><button autoFocus type="button" onClick={close} aria-label="Close project details"><X size={20} /></button></div>
    <div className="appSheetContent"><p className="appEyebrow">{project.type}</p><h2 id="sheet-title">{project.title}</h2><MobileMedia project={project} data={data} /><p className="appSheetDescription">{project.description}</p><h3>Built with</h3><div className="appSkillTags">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>{project.nda ? <p className="appSheetNda"><Lock size={16} /> Source code & demo under NDA.</p> : <div className="appSheetLinks"><a className="appButton appButtonPrimary" href={project.live} target="_blank" rel="noreferrer">Open project <ArrowUpRight size={17} /></a><a className="appButton" href={project.github} target="_blank" rel="noreferrer"><Github size={17} /> Code</a></div>}</div>
  </dialog>;
}
