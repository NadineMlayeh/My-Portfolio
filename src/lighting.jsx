import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import './lighting.css';

const LightingContext = createContext(null);
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function LightingProvider({children}) {
  const [power, updatePower] = useState(() => {
    try {
      const stored = Number(localStorage.getItem('portfolio:red-light') || 0);
      return Number.isFinite(stored) ? clamp(stored) : 0;
    } catch { return 0; }
  });
  const lastOn = useRef(power || 0.55);
  const setPower = (value) => updatePower(clamp(value));
  const toggle = () => {
    if (power > 0) { lastOn.current = power; updatePower(0); }
    else updatePower(lastOn.current);
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--lamp-power', power);
    const save = setTimeout(() => {
      try { localStorage.setItem('portfolio:red-light', String(power)); } catch { /* Lighting still works without storage. */ }
    }, 250);
    return () => clearTimeout(save);
  }, [power]);

  useEffect(() => {
    let frame;
    const positionLight = () => {
      const portrait = document.querySelector('.heroPortrait .portraitFrame, .appHeroPhoto, .appStoryPortrait');
      let rect = portrait?.getBoundingClientRect();
      if (!rect || rect.bottom < 0 || rect.top > innerHeight) rect = document.querySelector('.brand, .appAvatar')?.getBoundingClientRect();
      if (rect) {
        document.documentElement.style.setProperty('--lamp-x', `${rect.left + rect.width / 2}px`);
        document.documentElement.style.setProperty('--lamp-y', `${rect.top + rect.height / 2}px`);
      }
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(positionLight); };
    const observer = new MutationObserver(schedule);
    observer.observe(document.getElementById('root'), {childList: true, subtree: true});
    window.addEventListener('scroll', schedule, {passive: true});
    window.addEventListener('resize', schedule, {passive: true});
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return <LightingContext.Provider value={{power, setPower, toggle}}>
    <div className="ambientRedLight" aria-hidden="true" />
    {children}
  </LightingContext.Provider>;
}

export function LampControl() {
  const {power, setPower, toggle} = useContext(LightingContext);
  const [dragging, setDragging] = useState(false);
  const gesture = useRef(null);
  const percent = Math.round(power * 100);

  const finish = (event, cancelled = false) => {
    if (!gesture.current || gesture.current.pointerId !== event.pointerId) return;
    const {moved, initial} = gesture.current;
    gesture.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (cancelled) setPower(initial);
    else if (!moved) toggle();
  };

  const keyboard = (event) => {
    const steps = {ArrowDown: -0.05, ArrowLeft: -0.05, ArrowUp: 0.05, ArrowRight: 0.05, PageDown: -0.2, PageUp: 0.2};
    if (event.key in steps) { event.preventDefault(); setPower(power + steps[event.key]); }
    else if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); setPower(event.key === 'Home' ? 0 : 1); }
    else if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggle(); }
  };

  return <div className={`lampControl${dragging ? ' lampDragging' : ''}${power > 0 ? ' lampOn' : ''}`} style={{'--cord-extension': `${power * 100}px`}}>
    <button className="lampSwitch" type="button" onClick={toggle} aria-label={power > 0 ? 'Switch red lamp off' : 'Switch red lamp on'} aria-pressed={power > 0} title="Red portrait light — pull the cord to adjust">
      <svg viewBox="0 0 48 44" fill="none" aria-hidden="true"><path d="M24 2v7" stroke="currentColor" strokeWidth="1.5" /><path d="M14 10h20l8 20H6l8-20Z" className="lampShade" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M7 30c8 4 26 4 34 0" className="lampRim" strokeWidth="1.4" /><path d="M20 32a4 4 0 0 0 8 0" className="lampBulb" strokeWidth="2" /><path d="M24 39v3M12 36l-2 3M36 36l2 3" className="lampRays" strokeWidth="1.3" strokeLinecap="round" /></svg>
    </button>
    <span className="lampCord" aria-hidden="true" />
    <button type="button" className="lampPull" role="slider" aria-label="Red light intensity" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-valuetext={`${percent} percent. Pull down to brighten, up to dim. Arrow keys also adjust the light.`} aria-orientation="vertical" onKeyDown={keyboard}
      onPointerDown={(event) => {
        if (!event.isPrimary || event.button !== 0) return;
        event.preventDefault();
        event.currentTarget.focus({preventScroll: true});
        event.currentTarget.setPointerCapture(event.pointerId);
        gesture.current = {pointerId: event.pointerId, start: event.clientY, initial: power, moved: false};
        setDragging(true);
      }}
      onPointerMove={(event) => {
        if (!gesture.current || gesture.current.pointerId !== event.pointerId) return;
        const distance = event.clientY - gesture.current.start;
        if (Math.abs(distance) < 3 && !gesture.current.moved) return;
        gesture.current.moved = true;
        setPower(gesture.current.initial + distance / 100);
      }}
      onPointerUp={(event) => finish(event)} onPointerCancel={(event) => finish(event, true)} onLostPointerCapture={(event) => { if (gesture.current) finish(event, true); }}>
      <span aria-hidden="true" />
    </button>
    <span className="lampHint" aria-hidden="true">{dragging || power > 0 ? `${percent}%` : 'pull ↓'}</span>
  </div>;
}
