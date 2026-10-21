import React from 'react';
import { GitBranch } from 'lucide-react';

const icons = {
  React: 'react', TypeScript: 'typescript', 'Next.js': 'nextjs', Angular: 'angular',
  'Spring Boot': 'spring', NestJS: 'nestjs', 'Tailwind CSS': 'tailwindcss', 'Three.js': 'threejs',
  MySQL: 'mysql', PostgreSQL: 'postgresql', Supabase: 'supabase', MongoDB: 'mongodb',
  Docker: 'docker', Kubernetes: 'kubernetes', 'Gemini AI': 'gemini',
};

export default function SkillTicker({items}) {
  return <div className="ticker" role="img" aria-label={`Technologies: ${items.join(', ')}`}>
    <div className="tickerTrack" aria-hidden="true">
      {[0, 1].map((copy) => <div className="tickerGroup" key={copy}>
        {items.map((tech) => <span className="tickerSkill" key={tech}>
          {icons[tech] ? <img className={tech === 'Three.js' ? 'tickerIcon tickerIconLight' : 'tickerIcon'} src={`/icons/${icons[tech]}.svg`} width="23" height="23" alt="" decoding="async" /> : <GitBranch size={21} className="tickerPipeline" />}
          {tech}
        </span>)}
      </div>)}
    </div>
  </div>;
}
