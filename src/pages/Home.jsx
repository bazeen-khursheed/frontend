import { Link } from "react-router-dom";

const features = [
  [
    "01",
    "Personalized matches",
    "Discover opportunities aligned with your education, grades, field, and financial needs.",
  ],
  [
    "02",
    "Clear eligibility",
    "Understand why a scholarship may fit and what requirements you still need to check.",
  ],
  [
    "03",
    "AI application studio",
    "Create a practical checklist and a first-draft personal statement you can make your own.",
  ],
];

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg
    teal-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 top-56 h-80 w-80 rounded-full bg
    cyan-500/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid
    cols-[1.15fr_.85fr] lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-300/20 
    bg-teal-300/5 px-4 py-2 text-sm text-teal-100">
              <span className="h-2 w-2 rounded-full bg-teal-300" /> Built for students across Pakistan
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl 
    lg:text-7xl">
              Your next opportunity starts with a <span className="bg-gradient-to-r from-teal-200 via
    cyan-300 to-blue-300 bg-clip-text text-transparent">better match.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              One focused space to discover scholarships, understand eligibility, and prepare stronger 
    applications—with AI support that keeps you in control.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/scholarships" className="rounded-xl bg-teal-300 px-6 py-3.5 font-semibold text
    slate-950 transition hover:bg-teal-200">Explore scholarships <span aria-hidden="true">n</span></Link>
              <Link to="/profile" className="rounded-xl border border-white/15 px-6 py-3.5 font-semibold 
    text-white transition hover:bg-white/5">Build my profile</Link>
      </div>
            <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-6 text-sm text
    slate-400">
              <div><strong className="block text-xl text-white">Personalized</strong> student-first 
    discovery</div>
              <div><strong className="block text-xl text-white">AI-assisted</strong> not auto
    submitted</div>
              <div><strong className="block text-xl text-white">Pakistan-focused</strong> 
    opportunities</div>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow
    teal-950/30 sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div><p className="text-sm text-slate-400">MATCH PREVIEW</p><h2 className="mt-1 text-xl 
    font-semibold">Your opportunity dashboard</h2></div>
              <span className="rounded-full bg-teal-300/10 px-3 py-1 text-xs text-teal-200">Demo 
    UI</span>
            </div>
            <div className="mt-6 rounded-2xl border border-teal-200/15 bg-gradient-to-br from-teal-300/10
     to-cyan-400/5 p-5">
              <div className="flex items-start justify-between gap-4"><div><p className="text-sm text
    teal-100">Potential match</p><h3 className="mt-2 text-2xl font-semibold">Undergraduate 
    Support</h3></div><span className="text-3xl">F</span></div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full 
    w-[82%] rounded-full bg-gradient-to-r from-teal-300 to-cyan-300" /></div>
              <div className="mt-2 flex justify-between text-xs text-slate-400"><span>Profile 
    alignment</span><span>82% illustrative</span></div>
              <p className="mt-4 text-sm leading-6 text-slate-300">Add your academic details to receive 
    real profile-based matches. This visual is illustrative, not a real eligibility result.</p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4"><span className="text
    xl">n</span><p className="mt-3 font-medium">Smart discovery</p><p className="mt-1 text-sm text
    slate-400">Search by level, field, and funding type.</p></div>
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4"><span className="text
    xl">G</span><p className="mt-3 font-medium">Application copilot</p><p className="mt-1 text-sm text
    slate-400">Turn requirements into next steps.</p></div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="mb-8 max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[.2em] 
    text-teal-300">A clearer path forward</p><h2 className="mt-3 text-3xl font-semibold tracking-tight 
    sm:text-4xl">From searching to submitting.</h2></div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map(([num, title, desc]) => <article key={num} className="rounded-3xl border border
    white/10 bg-white/[.025] p-6 transition hover:-translate-y-1 hover:border-teal-200/30"><p 
    className="text-sm text-teal-300">{num}</p><h3 className="mt-5 text-xl font-semibold">{title}</h3><p 
    className="mt-3 leading-7 text-slate-400">{desc}</p></article>)}
        </div>
        <p className="mt-8 text-xs leading-5 text-slate-500">ScholarshipMatch AI is an informational aid.
     Always confirm requirements, deadlines, and application links with the official scholarship 
    provider.</p>
      </section>
    </main>
  );
}
