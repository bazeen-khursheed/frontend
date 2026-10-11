
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const scholarshipData = [
  {
    id: 1,
    name: "HEC Need-Based Scholarship",
    organization: "Higher Education Commission",
    category: "Need-Based",
    level: "Undergraduate",
    country: "Pakistan",
    funding: "Full / Partial Funding",
    deadline: "Check official announcement",
    description:
      "Financial assistance for eligible students studying at participating universities in Pakistan.",
    color: "from-teal-400/20 to-cyan-400/5",
    initials: "HEC",
  },
  {
    id: 2,
    name: "Ehsaas Undergraduate Scholarship",
    organization: "Government of Pakistan",
    category: "Need-Based",
    level: "Undergraduate",
    country: "Pakistan",
    funding: "Tuition + Stipend",
    deadline: "Check official announcement",
    description:
      "Support designed for eligible undergraduate students facing financial challenges.",
    color: "from-emerald-400/20 to-teal-400/5",
    initials: "EH",
  },
  {
    id: 3,
    name: "Fulbright Scholarship",
    organization: "USEFP",
    category: "Merit-Based",
    level: "Masters",
    country: "United States",
    funding: "Fully Funded",
    deadline: "Check official announcement",
    description:
      "A competitive opportunity for eligible Pakistani students pursuing graduate study in the United States.",
    color: "from-blue-400/20 to-cyan-400/5",
    initials: "FB",
  },
  {
    id: 4,
    name: "Chevening Scholarship",
    organization: "UK Government",
    category: "Merit-Based",
    level: "Masters",
    country: "United Kingdom",
    funding: "Fully Funded",
    deadline: "Check official announcement",
    description:
      "A UK scholarship opportunity for eligible applicants with leadership potential and relevant experience.",
    color: "from-violet-400/20 to-blue-400/5",
    initials: "CH",
  },
  {
    id: 5,
    name: "DAAD Study Scholarships",
    organization: "DAAD",
    category: "Merit-Based",
    level: "Masters",
    country: "Germany",
    funding: "Varies by programme",
    deadline: "Check official announcement",
    description:
      "Explore German academic funding opportunities for international students.",
    color: "from-amber-400/20 to-orange-400/5",
    initials: "DA",
  },
  {
    id: 6,
    name: "Türkiye Scholarships",
    organization: "Türkiye Scholarships",
    category: "International",
    level: "All Levels",
    country: "Türkiye",
    funding: "Fully Funded",
    deadline: "Check official announcement",
    description:
      "Government-funded study opportunities for eligible international applicants.",
    color: "from-rose-400/20 to-orange-400/5",
    initials: "TR",
  },
];

const categories = ["All", "Need-Based", "Merit-Based", "International"];
const levels = ["All Levels", "Undergraduate", "Masters", "PhD"];
const countries = [
  "All Countries",
  "Pakistan",
  "United States",
  "United Kingdom",
  "Germany",
  "Türkiye",
];

export default function Scholarships() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All Levels");
  const [country, setCountry] = useState("All Countries");
  const [saved, setSaved] = useState([]);

  const filteredScholarships = useMemo(() => {
    return scholarshipData.filter((scholarship) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        scholarship.name.toLowerCase().includes(query) ||
        scholarship.organization.toLowerCase().includes(query) ||
        scholarship.country.toLowerCase().includes(query) ||
        scholarship.description.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || scholarship.category === category;

      const matchesLevel =
        level === "All Levels" ||
        scholarship.level === level ||
        scholarship.level === "All Levels";

      const matchesCountry =
        country === "All Countries" || scholarship.country === country;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLevel &&
        matchesCountry
      );
    });
  }, [search, category, level, country]);

  const toggleSaved = (id) => {
    setSaved((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setLevel("All Levels");
    setCountry("All Countries");
  };

  return (
    <main className="min-h-screen bg-[#07111f] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#102638] via-[#0b1b2c] to-[#0b1727] p-7 sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-teal-200">
              <span className="h-2 w-2 rounded-full bg-teal-300" />
              Scholarship Discovery
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Find the funding.
              <br />
              <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
                Shape your future.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Explore scholarship opportunities in Pakistan and around the
              world. Filter your options and discover opportunities worth
              investigating.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/profile"
                className="rounded-xl bg-teal-300 px-6 py-3.5 text-sm font-bold text-[#07111f] transition hover:bg-teal-200"
              >
                Build my student profile ↗
              </Link>

              <Link
                to="/assistant"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore AI assistance
              </Link>
            </div>
          </div>

          <div className="relative z-10 mt-10 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 sm:flex sm:gap-10">
            <div>
              <p className="text-2xl font-bold text-white">01</p>
              <p className="mt-1 text-sm text-slate-400">Search opportunities</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">02</p>
              <p className="mt-1 text-sm text-slate-400">Compare eligibility</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">03</p>
              <p className="mt-1 text-sm text-slate-400">Prepare applications</p>
            </div>
          </div>
        </section>

       
        <section className="mt-10">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">
                Explore opportunities
              </p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Scholarship directory
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Search by name, institution, country or keyword.
              </p>
            </div>

            <span className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              {filteredScholarships.length} opportunities shown
            </span>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-[#0c1a2a] p-4 sm:p-5">
            <label
              htmlFor="scholarship-search"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Search scholarships
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#07111f] px-4 transition focus-within:border-teal-300/50">
              <svg
                className="shrink-0 text-slate-400"
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m16 16 4 4" />
              </svg>

              <input
                id="scholarship-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="e.g. Fulbright, Pakistan, masters..."
                className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FilterSelect
                label="Funding category"
                value={category}
                onChange={setCategory}
                options={categories}
              />

              <FilterSelect
                label="Study level"
                value={level}
                onChange={setLevel}
                options={levels}
              />

              <FilterSelect
                label="Destination"
                value={country}
                onChange={setCountry}
                options={countries}
              />
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 text-sm font-semibold text-teal-300 transition hover:text-teal-200"
            >
              Reset all filters ↺
            </button>
          </div>
        </section>

        
        <section className="mt-8">
          {filteredScholarships.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredScholarships.map((scholarship) => {
                const isSaved = saved.includes(scholarship.id);

                return (
                  <article
                    key={scholarship.id}
                    className="group flex flex-col rounded-2xl border border-white/10 bg-[#0c1a2a] p-5 transition duration-300 hover:-translate-y-1 hover:border-teal-300/30 hover:shadow-xl hover:shadow-black/20 sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br ${scholarship.color} text-lg font-black text-white`}
                      >
                        {scholarship.initials}
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleSaved(scholarship.id)}
                        aria-label={
                          isSaved
                            ? "Remove saved scholarship"
                            : "Save scholarship"
                        }
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                          isSaved
                            ? "border-teal-300/30 bg-teal-300/10 text-teal-300"
                            : "border-white/10 text-slate-400 hover:border-teal-300/30 hover:text-teal-300"
                        }`}
                      >
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 24 24"
                          fill={isSaved ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-4-6 4V4.75Z" />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-teal-300">
                        {scholarship.organization}
                      </p>

                      <h3 className="mt-2 text-xl font-bold leading-snug text-white transition group-hover:text-teal-100">
                        {scholarship.name}
                      </h3>

                      <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-400">
                        {scholarship.description}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full border border-teal-300/15 bg-teal-300/5 px-3 py-1.5 text-xs font-medium text-teal-200">
                        {scholarship.category}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                        {scholarship.level}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                        {scholarship.country}
                      </span>
                    </div>

                    <div className="mt-5 border-t border-white/10 pt-4">
                      <p className="text-xs text-slate-500">Funding information</p>
                      <p className="mt-1 font-semibold text-slate-200">
                        {scholarship.funding}
                      </p>

                      <p className="mt-4 text-xs leading-5 text-amber-200/80">
                        Deadline: {scholarship.deadline}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-teal-300/25 bg-teal-300/5 px-4 py-3 text-sm font-semibold text-teal-200 transition hover:bg-teal-300 hover:text-[#07111f]"
                    >
                      Check my profile fit
                      <span aria-hidden="true">↗</span>
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-2xl">
                ⌕
              </div>
              <h3 className="mt-5 text-xl font-bold">No matching scholarships</h3>
              <p className="mt-2 text-sm text-slate-400">
                Try another keyword or change your filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-xl bg-teal-300 px-5 py-3 text-sm font-bold text-[#07111f] transition hover:bg-teal-200"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        
        <section className="mt-10 rounded-2xl border border-amber-300/15 bg-amber-300/[0.04] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="text-xl" aria-hidden="true">ⓘ</span>
            <div>
              <h3 className="font-semibold text-amber-100">
                Verify details before applying
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                This starter directory uses sample listings to demonstrate the
                interface. Scholarship availability, deadlines, funding and
                eligibility can change. Confirm all details on the official
                scholarship provider’s website before applying.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-white/10 bg-[#07111f] px-4 py-3.5 text-sm text-white outline-none transition focus:border-teal-300/50"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-[#0c1a2a]">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
