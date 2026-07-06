import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Compass, Brain, CalendarCheck, ChevronDown, ArrowRight, LogIn } from 'lucide-react';
import { TiltCard } from '../../components/ui/TiltCard';
import { ThemeToggle } from '../../components/layout/ThemeToggle';

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: 2 + Math.random() * 3,
  delay: Math.random() * 20,
  duration: 18 + Math.random() * 12,
  xDrift: -40 + Math.random() * 80,
  yDrift: -30 + Math.random() * 60,
}));

const features = [
  {
    icon: Compass,
    title: 'Specialty Discovery',
    desc: 'An adaptive assessment that actually understands medicine — not a generic personality quiz.',
  },
  {
    icon: Brain,
    title: 'Adaptive Assessment',
    desc: 'Find your strengths and close your gaps before you commit years to a path.',
  },
  {
    icon: CalendarCheck,
    title: 'Structured Study Plans',
    desc: 'A real plan, built around you — not a one-size-fits-all curriculum.',
  },
];

const steps = [
  { number: 1, title: 'Discover', desc: 'Take the adaptive survey or pick your path directly' },
  { number: 2, title: 'Assess', desc: 'A real diagnostic shows your strengths and weaknesses' },
  { number: 3, title: 'Plan', desc: 'Get a study plan built around real resources, at your pace' },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export function LandingPage() {
  const navigate = useNavigate();
  const pData = useMemo(() => particles, []);

  return (
    <div className="min-h-screen">
      <style>{`
        @keyframes particle-drift {
          0%, 100% { transform: translate(0, 0); opacity: 0.1; }
          25% { transform: translate(var(--dx1, 20px), var(--dy1, -15px)); opacity: 0.22; }
          50% { transform: translate(var(--dx2, -10px), var(--dy2, 20px)); opacity: 0.08; }
          75% { transform: translate(var(--dx3, 15px), var(--dy3, -10px)); opacity: 0.18; }
        }
      `}</style>

      {/* ─── HERO ─── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A1428] via-[#2D1B4E] to-[#050A14]">
        {pData.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-[#C9A227] pointer-events-none"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: 0.1,
              animation: `particle-drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
              '--dx1': `${p.xDrift * 0.5}px`,
              '--dy1': `${p.yDrift * 0.4}px`,
              '--dx2': `${p.xDrift * -0.3}px`,
              '--dy2': `${p.yDrift * 0.5}px`,
              '--dx3': `${p.xDrift * 0.4}px`,
              '--dy3': `${p.yDrift * -0.3}px`,
            } as React.CSSProperties}
          />
        ))}

        <div className="absolute top-0 left-0 right-0 z-20 flex h-14 items-center justify-between px-4 md:px-8">
          <span className="font-heading text-lg font-bold tracking-wide text-white/90">RA Education</span>
          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />
            <button onClick={() => navigate('/login')} className="rounded-lg px-3 py-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white">
              Log In
            </button>
            <button onClick={() => navigate('/register')} className="rounded-lg bg-[#C9A227] px-4 py-1.5 text-sm font-medium text-[#0A1428] transition-all hover:opacity-90">
              Get Started
            </button>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="mb-2 inline-block border-b-2 border-[#C9A227] pb-2">
              <h1 className="font-heading text-5xl font-bold tracking-tight text-white md:text-7xl">
                RA <span className="text-[#C9A227]">Education</span>
              </h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            className="mt-5 space-y-1"
          >
            <p className="font-body text-lg text-white/70 md:text-xl">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="inline-block"
              >
                Find your specialty.
              </motion.span>{' '}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="inline-block"
              >
                Choose your path.
              </motion.span>{' '}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.1 }}
                className="inline-block"
              >
                Build your plan.
              </motion.span>
            </p>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.4, ease: 'easeOut' }}
            className="mt-8 flex items-center justify-center gap-4 opacity-0"
          >
            <button
              onClick={() => navigate('/register')}
              className="inline-flex items-center gap-2 rounded-lg bg-[#C9A227] px-6 py-3 font-heading text-base font-semibold text-[#0A1428] transition-all hover:opacity-90"
            >
              Get Started <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 rounded-lg border border-[#C9A227] bg-transparent px-6 py-3 font-heading text-base font-medium text-white transition-all hover:bg-white/5"
            >
              <LogIn size={18} /> Log In
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={24} className="text-white/60" />
          </motion.div>
        </motion.div>

        <svg
          className="absolute bottom-0 left-0 right-0 z-0 h-24 w-full opacity-[0.04]"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0 60 Q 150 10, 300 60 T 600 60 T 900 60 T 1200 60"
            fill="none"
            stroke="#C9A227"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.5, ease: 'easeInOut' }}
          />
        </svg>
      </section>

      {/* ─── THREE PILLARS ─── */}
      <section className="mx-auto max-w-5xl px-4 py-20 md:py-28">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-14 text-center font-heading text-2xl font-bold tracking-tight md:text-3xl"
        >
          How RA Education works for you
        </motion.h2>

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {features.map((f, i) => (
            <motion.div key={i} variants={sectionVariants} transition={{ duration: 0.4 }}>
              <TiltCard>
                <div className="flex flex-col items-center p-2 text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-secondary)]/10">
                    <f.icon className="text-[var(--color-secondary)]" size={24} />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{f.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="bg-[var(--color-surface)] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-14 text-center font-heading text-2xl font-bold tracking-tight md:text-3xl"
          >
            From start to study plan in three steps
          </motion.h2>

          <div className="relative">
            <svg
              className="hidden h-40 w-full md:block"
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 12 20 C 30 8, 50 35, 50 20 C 50 5, 70 32, 88 20"
                fill="none"
                stroke="var(--color-secondary)"
                strokeWidth="0.4"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, delay: 0.3, ease: 'easeInOut' }}
              />
            </svg>

            <svg
              className="absolute left-5 top-0 h-full w-8 md:hidden"
              viewBox="0 0 20 100"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 10 8 L 10 92"
                fill="none"
                stroke="var(--color-secondary)"
                strokeWidth="0.5"
                strokeDasharray="3 3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
              />
            </svg>

            <div className="relative grid gap-10 md:grid-cols-3 md:gap-6">
              {steps.map((s, i) => (
                <motion.div
                  key={s.number}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: 0.2 * i, ease: 'easeOut' }}
                  className="flex items-start gap-4 md:flex-col md:items-center md:text-center"
                >
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-secondary)] font-heading text-sm font-bold text-[var(--color-primary)] md:h-12 md:w-12 md:text-base">
                    {s.number}
                  </div>
                  <div className="md:mt-2">
                    <h3 className="font-heading text-base font-semibold md:text-lg">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHO THIS IS FOR ─── */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center md:py-28">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6 font-heading text-2xl font-bold tracking-tight md:text-3xl"
        >
          Built for Egypt's{' '}
          <span className="text-[var(--color-secondary)]">medical community</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="font-serif text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg"
        >
          Whether you are a practicing doctor planning your next specialty, a medical student navigating your first career choice, or a nurse expanding your qualifications — RA Education is built around your reality, your timeline, and your ambitions. This is not a generic global platform. It is made for the Egyptian medical system, by people who understand it.
        </motion.p>
      </section>

      {/* ─── FINAL CTA BAND ─── */}
      <section className="border-t-2 border-[var(--color-secondary)] bg-[var(--color-primary)] py-16 text-center md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-2xl px-4"
        >
          <p className="font-body text-lg text-white/80 md:text-xl">
            Find your specialty. Choose your path. Build your plan.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#C9A227] px-8 py-3.5 font-heading text-base font-semibold text-[#0A1428] transition-all hover:opacity-90"
          >
            Get Started <ArrowRight size={18} />
          </button>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4">
          <div>
            <span className="font-heading text-base font-bold text-[var(--color-secondary)]">RA Education</span>
            <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
              Find your specialty. Choose your path. Build your plan.
            </p>
            <p className="mt-2 text-xs text-[var(--color-text-secondary)]/60">
              &copy; {new Date().getFullYear()} RA Education. All rights reserved.
            </p>
          </div>
          <ThemeToggle />
        </div>
      </footer>
    </div>
  );
}
