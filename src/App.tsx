import { useEffect, useMemo, useState } from 'react';
import { Camera, Check, FileText, MessageSquare, Phone, Ruler, Wrench } from 'lucide-react';

type Task = { text: string; icon: React.ElementType; className?: string };

const chaosTasks: Task[] = [
  { text: 'Where are the job photos?', icon: Camera },
  { text: 'Customer called again', icon: Phone, className: 'urgent' },
  { text: 'Did we send the estimate?', icon: FileText },
  { text: 'Who measured the water heater?', icon: Ruler },
  { text: 'Tech says scope changed', icon: Wrench, className: 'urgent' },
  { text: 'Customer wants an update', icon: MessageSquare },
  { text: 'Which version is final?', icon: FileText },
  { text: 'Can you send that again?', icon: MessageSquare },
  { text: 'Who approved this?', icon: Check },
  { text: 'Where are the notes?', icon: FileText },
  { text: 'Was that measured?', icon: Ruler },
  { text: 'Need this today', icon: Phone, className: 'urgent' },
];

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max > 0 ? scrollY / max : 0);
    };
    update();
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    return () => {
      removeEventListener('scroll', update);
      removeEventListener('resize', update);
    };
  }, []);
  return progress;
}

export default function App() {
  const p = useScrollProgress();
  const chaos = Math.min(1, Math.max(0, (p - 0.08) / 0.28));
  const john = Math.min(1, Math.max(0, (p - 0.30) / 0.25));
  const freeze = Math.min(1, Math.max(0, (p - 0.52) / 0.22));
  const resolve = Math.min(1, Math.max(0, (p - 0.72) / 0.24));

  const visibleTasks = Math.ceil(chaos * chaosTasks.length);
  const taskStyles = useMemo(() => chaosTasks.map((_, i) => ({
    '--i': i,
    '--x': `${[-40, 20, 39, -10, 28, -47, 7, 44, -24, 14, 33, -34][i]}vw`,
    '--y': `${[4, 11, 18, 31, 38, 47, 55, 63, 72, 79, 86, 91][i]}vh`,
    '--r': `${[-8, 6, -3, 5, -6, 4, 2, -4, 7, -2, 5, -5][i]}deg`,
    '--s': `${[1.2, .9, 1.35, 1, 1.25, .88, 1.15, 1.4, .95, 1.1, 1.3, .9][i]}`,
  } as React.CSSProperties)), []);

  return (
    <main className="world">
      <div className="grain" />
      <header className="brand">CREATE<span>YOUR</span>MVP</header>

      <section className="scene hero">
        <div className="sticky hero-stage">
          <p className="eyebrow">THE REAL PROBLEM ISN'T THE WORK</p>
          <div className="hero-copy">
            <h1 className="line l1" style={{ transform: `translateY(${Math.max(0, p * 1000 - 20)}px)` }}><span>Problems</span> create chaos.</h1>
            <h1 className="line l2" style={{ transform: `translate(${chaos * 35}px, ${chaos * -14}px) rotate(${chaos * 2}deg)` }}><span>Chaos</span> creates thoughts.</h1>
            <h1 className="line l3" style={{ transform: `translate(${chaos * -28}px, ${chaos * 18}px) rotate(${chaos * -2}deg)` }}><span>Thoughts</span> create ideas.</h1>
            <h1 className="line l4"><span>Ideas proven in action</span> become MVPs.</h1>
          </div>
          <div className="hero-note">Scroll into a day that feels too familiar.</div>
        </div>
      </section>

      <section className="scene chaos-scene">
        <div className="sticky chaos-stage">
          <div className="scene-copy">
            <p className="eyebrow">THE DAY STARTS NORMAL</p>
            <h2>Then the work around the work starts piling up.</h2>
          </div>

          <div className="office-realism">
            <div className="desk"><div className="monitor"><span>8 estimates open</span><strong>3 need info</strong></div><div className="phone">4 missed calls</div><div className="clipboard">TODAY<br/>• 9:00 leak<br/>• 11:30 heater<br/>• 2:00 estimate</div></div>
            <div className="person office-person"><div className="head"/><div className="torso"/><div className="arm arm-a"/><div className="arm arm-b"/></div>
          </div>

          <div className="chaos-field">
            {chaosTasks.map((task, i) => {
              const Icon = task.icon;
              return (
                <div key={task.text} className={`task ${task.className || ''} ${i < visibleTasks ? 'show' : ''}`} style={taskStyles[i]}>
                  <Icon size={18}/><span>{task.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="scene john-scene">
        <div className="sticky john-stage">
          <div className="scene-copy john-copy">
            <p className="eyebrow">MEET JOHN</p>
            <h2>John owns a plumbing company.</h2>
            <p>His best time is spent helping customers, training techs, winning the next job, and getting home before dinner.</p>
          </div>

          <div className="service-world">
            <div className="van">JOHN'S PLUMBING</div>
            <div className="house"><div className="roof"/><div className="door"/></div>
            <div className="person john"><div className="head"><span/></div><div className="torso"><b>J</b></div><div className="arm arm-a"/><div className="arm arm-b"/></div>
            <div className="tech"><div className="head"/><div className="torso"/><Wrench size={24}/></div>
            <div className="customer"><div className="head"/><div className="torso"/></div>
          </div>

          <div className="incoming" style={{ opacity: john }}><Wrench size={18}/> New request: no hot water</div>
          <div className="good-work" style={{ opacity: Math.max(0, 1 - john * 1.5) }}>
            <span>Help customer</span><span>Coach tech</span><span>Win next job</span><span>Get home</span>
          </div>
          <div className="interruptions" style={{ opacity: john }}>
            {chaosTasks.slice(0, 7).map((t, i) => <div key={i} style={{ transform:`translate(${(i-3)*7}vw, ${(i%3)*10}vh) rotate(${(i%2?1:-1)*i*2}deg)` }}>{t.text}</div>)}
          </div>
        </div>
      </section>

      <section className="scene freeze-scene">
        <div className="sticky freeze-stage">
          <div className="freeze-copy" style={{ opacity: freeze }}>
            <p className="eyebrow">FREEZE THE MADNESS</p>
            <h2>THE PROBLEM ISN'T JOHN.</h2>
            <p>And it isn't that his team isn't working hard.</p>
            <strong>The problem is everything between the work.</strong>
          </div>
          <div className="handoff" style={{ opacity: freeze }}>
            {['Customer','Office','Tech','Photos','Measurements','Pricing','Estimate','Follow-up'].map((x,i)=><div key={x} className="node"><span>{x}</span>{i<7 && <b>↯</b>}</div>)}
          </div>
          <div className="freeze-tag" style={{ opacity: freeze }}>Every broken handoff creates work.</div>
        </div>
      </section>

      <section className="scene resolve-scene">
        <div className="sticky resolve-stage">
          <div className="thought">“Why can’t the information just follow the job?”</div>
          <div className="resolve-copy" style={{ opacity: resolve }}>
            <p className="eyebrow">THE TURN</p>
            <h2>THAT'S WHERE AN MVP BEGINS.</h2>
            <p>Not with software. Not with AI. Not with an app idea.</p>
            <strong>It begins with a problem worth solving.</strong>
          </div>
          <div className="clean-flow" style={{ opacity: resolve }}>
            {['Capture job','Required photos','Measurements','Scope','Pricing','Estimate ready'].map((x,i)=><div key={x} className="flow-step"><span>{i+1}</span>{x}</div>)}
          </div>
          <div className="result" style={{ opacity: resolve }}><Check/> Focused. Flowing. Producing.</div>
        </div>
      </section>
    </main>
  );
}
