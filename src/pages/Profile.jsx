
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8080/api/profile";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  "Content-Type": "application/json",
});

const emptyProfile = (email = "") => ({
  fullName: "",
  email,
  city: "",
  education: "",
  field: "",
  marks: "",
  annualIncome: "",
  destination: "",
  funding: "",
  interests: [],
});

const interestOptions = [
  "Computer Science",
  "Engineering",
  "Medical & Health",
  "Business",
  "Social Sciences",
  "Arts & Design",
  "Natural Sciences",
  "Other",
];

const fields = [
  ["Full Name", "fullName"],
  ["Email Address", "email"],
  ["City", "city"],
  ["Education Level", "education"],
  ["Field of Study", "field"],
  ["Marks / Percentage", "marks"],
  ["Annual Family Income", "annualIncome"],
  ["Preferred Destination", "destination"],
  ["Funding Preference", "funding"],
];

const inputStyle =
  "w-full rounded-xl border border-white/10 bg-[#07111f] px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-teal-300/50";

function normalizeProfile(data = {}) {
  return {
    fullName: data.fullName || "",
    email: data.email || "",
    city: data.city || "",
    education: data.education || "",
    field: data.field || "",
    marks: data.marks ?? "",
    annualIncome: data.annualIncome || "",
    destination: data.destination || "",
    funding: data.funding || "",
    interests: Array.isArray(data.interests) ? data.interests : [],
  };
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
        {required && <span className="ml-1 text-teal-300">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function Profile() {
  const [profile, setProfile] = useState(() =>
    emptyProfile(getUser().email || "")
  );

  const [savedDetails, setSavedDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      const user = getUser();
      const email = String(user.email || "").trim().toLowerCase();
      const token = localStorage.getItem("token");

      setProfile(emptyProfile(email));

      if (!token) {
        setError("Please log in to view your profile.");
        setLoading(false);
        return;
      }

      if (!email) {
        setError("Your account email was not found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: getAuthHeaders(),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok && response.status !== 404) {
          throw new Error(
            response.status === 401
              ? "Your session has expired. Please log in again."
              : data.message || "Could not load your saved profile."
          );
        }

        if (response.ok && data.profile) {
          const saved = normalizeProfile(data.profile);

          if (!cancelled) {
            setSavedDetails(saved);
            setProfile(saved);
            setIsEditing(false);

            localStorage.setItem(
              "scholarshipStudentProfile",
              JSON.stringify(saved)
            );
          }
        } else if (!cancelled) {
          setSavedDetails(null);
          setProfile(emptyProfile(email));
          localStorage.removeItem("scholarshipStudentProfile");
        }
      } catch (err) {
        console.error("Load profile error:", err);

        if (!cancelled) {
          setError(
            err.message === "Failed to fetch"
              ? "Backend is not running. Please start your server."
              : err.message || "Could not load your profile."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  const toggleInterest = (interest) => {
    setProfile((previous) => ({
      ...previous,
      interests: previous.interests.includes(interest)
        ? previous.interests.filter((item) => item !== interest)
        : [...previous.interests, interest],
    }));

    setMessage("");
    setError("");
  };

  const handleSave = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    const token = localStorage.getItem("token");
    const userEmail = String(getUser().email || "")
      .trim()
      .toLowerCase();

    if (!token) {
      setError("Please log in before saving your profile.");
      return;
    }

    if (!profile.fullName.trim() || !userEmail) {
      setError("Please enter your full name and log in with your account.");
      return;
    }

    if (
      profile.marks !== "" &&
      (!Number.isFinite(Number(profile.marks)) ||
        Number(profile.marks) < 0 ||
        Number(profile.marks) > 100)
    ) {
      setError("Marks must be between 0 and 100.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...profile,
          email: userEmail,
          fullName: profile.fullName.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          response.status === 401
            ? "Your session has expired. Please log in again."
            : data.message || "Failed to save profile."
        );
      }

      const saved = normalizeProfile({
        ...profile,
        ...data.profile,
        email: data.profile?.email || userEmail,
      });

      setSavedDetails(saved);
      setProfile(saved);
      setIsEditing(false);

      localStorage.setItem(
        "scholarshipStudentProfile",
        JSON.stringify(saved)
      );

      setMessage("Your profile has been saved successfully.");
      setError("");
    } catch (err) {
      console.error("Save profile error:", err);

      setError(
        err.message === "Failed to fetch"
          ? "Backend is not running. Please start your server."
          : err.message || "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

const handleDelete = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete your student profile? This cannot be undone."
  );

  if (!confirmed) return;

  setSaving(true);
  setMessage("");
  setError("");

  try {
    const response = await fetch(API_URL, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Could not delete profile.");
    }

    const email = String(getUser().email || "")
      .trim()
      .toLowerCase();

    const empty = emptyProfile(email);

    setProfile(empty);
    setSavedDetails(null);
    setIsEditing(false);

    localStorage.removeItem("scholarshipStudentProfile");

    setMessage("Your profile has been deleted successfully.");
  } catch (err) {
    console.error("Delete profile error:", err);
    setError(err.message || "Could not delete profile.");
  } finally {
    setSaving(false);
  }
};

  const startEditing = () => {
    setProfile(normalizeProfile(savedDetails));
    setIsEditing(true);
    setMessage("");
    setError("");
  };

  const cancelEditing = () => {
    setProfile(normalizeProfile(savedDetails));
    setIsEditing(false);
    setMessage("");
    setError("");
  };

  const completionValues = [
    profile.fullName,
    profile.email,
    profile.city,
    profile.education,
    profile.field,
    profile.marks,
    profile.annualIncome,
    profile.destination,
    profile.funding,
    profile.interests.length ? "selected" : "",
  ];

  const completion = Math.round(
    (completionValues.filter(
      (value) => String(value ?? "").trim() !== ""
    ).length /
      completionValues.length) *
      100
  );

  return (
    <main className="min-h-screen bg-[#07111f] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#102638] via-[#0b1b2c] to-[#0b1727] p-7 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="rounded-full border border-teal-300/20 bg-teal-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-teal-200">
                Student Workspace
              </span>

              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                Your future starts
                <span className="block bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
                  with your profile.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
                Manage your academic information and discover scholarship
                opportunities that match your goals.
              </p>
            </div>

            <div className="w-full rounded-2xl border border-white/10 bg-[#07111f]/60 p-6 lg:max-w-xs">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-300">
                  Profile completion
                </span>

                <span className="text-2xl font-bold text-teal-300">
                  {completion}%
                </span>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-teal-300 to-cyan-300 transition-all"
                  style={{ width: `${completion}%` }}
                />
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-400">
                Complete your details to improve your scholarship matches.
              </p>
            </div>
          </div>
        </section>

        {loading && (
          <p className="mt-6 rounded-xl border border-white/10 bg-[#0c1a2a] p-4 text-sm text-slate-300">
            Loading your profile...
          </p>
        )}

        {savedDetails && !isEditing && (
          <section className="mt-8 rounded-2xl border border-white/10 bg-[#0c1a2a] p-5 sm:p-8">
            <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">
                  Your information
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Saved Student Profile
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Your saved details are listed below in serial order.
                </p>
              </div>

         
<div className="flex flex-wrap gap-3">
  <button
    type="button"
    onClick={startEditing}
    className="rounded-xl border border-teal-300/30 px-5 py-3 text-sm font-semibold text-teal-200 transition hover:bg-teal-300/10"
  >
    Edit Profile
  </button>

  <button
    type="button"
    onClick={handleDelete}
    disabled={saving}
    className="rounded-xl border border-red-400/30 bg-red-400/10 px-5 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-400/20 disabled:opacity-60"
  >
    {saving ? "Please wait..." : "Delete Profile"}
  </button>
</div>


            </div>

            <div className="mt-6 space-y-3">
              {fields.map(([label, key], index) => (
                <div
                  key={key}
                  className="grid grid-cols-[36px_minmax(0,1fr)] gap-3 rounded-xl border border-white/10 bg-[#07111f] p-4 sm:grid-cols-[36px_minmax(0,1fr)_1.2fr] sm:items-center"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-300/10 text-sm font-bold text-teal-300">
                    {index + 1}
                  </span>

                  <span className="text-sm font-medium text-slate-300">
                    {label}
                  </span>

                  <span className="break-words text-sm text-white sm:text-right">
                    {savedDetails[key] !== "" &&
                    savedDetails[key] !== undefined
                      ? savedDetails[key]
                      : "Not provided"}
                  </span>
                </div>
              ))}

              <div className="grid grid-cols-[36px_minmax(0,1fr)] gap-3 rounded-xl border border-white/10 bg-[#07111f] p-4 sm:grid-cols-[36px_minmax(0,1fr)_1.2fr] sm:items-center">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-300/10 text-sm font-bold text-teal-300">
                  10
                </span>

                <span className="text-sm font-medium text-slate-300">
                  Interests
                </span>

                <span className="break-words text-sm text-white sm:text-right">
                  {savedDetails.interests.length
                    ? savedDetails.interests.join(", ")
                    : "Not provided"}
                </span>
              </div>
            </div>
          </section>
        )}

        {message && (
          <div
            role="status"
            className="mt-6 rounded-xl border border-teal-300/20 bg-teal-300/10 p-4 text-sm text-teal-200"
          >
            {message}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200"
          >
            {error}
          </div>
        )}

        {!loading && (!savedDetails || isEditing) && (
          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <form
              onSubmit={handleSave}
              className="rounded-2xl border border-white/10 bg-[#0c1a2a] p-5 sm:p-8"
            >
              <div className="border-b border-white/10 pb-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">
                  Personal information
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {isEditing
                    ? "Edit your profile"
                    : "Build your student profile"}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {isEditing
                    ? "Update your information and save your changes."
                    : "Enter your details and save your profile to continue."}
                </p>
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field label="Full name" required>
                  <input
                    name="fullName"
                    value={profile.fullName}
                    onChange={updateField}
                    placeholder="Enter your full name"
                    required
                    className={inputStyle}
                  />
                </Field>

                <Field label="Email address" required>
                  <input
                    name="email"
                    type="email"
                    value={profile.email}
                    readOnly
                    required
                    className={`${inputStyle} cursor-not-allowed opacity-70`}
                  />
                </Field>

                <Field label="City">
                  <input
                    name="city"
                    value={profile.city}
                    onChange={updateField}
                    placeholder="e.g. Karachi"
                    className={inputStyle}
                  />
                </Field>

                <Field label="Education level" required>
                  <select
                    name="education"
                    value={profile.education}
                    onChange={updateField}
                    required
                    className={inputStyle}
                  >
                    <option value="">Select education level</option>
                    <option value="Matric">Matric</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                  </select>
                </Field>

                <Field label="Field of study" required>
                  <input
                    name="field"
                    value={profile.field}
                    onChange={updateField}
                    placeholder="e.g. Computer Science"
                    required
                    className={inputStyle}
                  />
                </Field>

                <Field label="Marks / percentage">
                  <input
                    name="marks"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={profile.marks}
                    onChange={updateField}
                    placeholder="e.g. 85"
                    className={inputStyle}
                  />
                </Field>

                <Field label="Annual family income (PKR)">
                  <select
                    name="annualIncome"
                    value={profile.annualIncome}
                    onChange={updateField}
                    className={inputStyle}
                  >
                    <option value="">Select income range</option>
                    <option value="Below 300000">Below Rs. 300,000</option>
                    <option value="300000-600000">
                      Rs. 300,000 – 600,000
                    </option>
                    <option value="600001-1200000">
                      Rs. 600,001 – 1,200,000
                    </option>
                    <option value="Above 1200000">
                      Above Rs. 1,200,000
                    </option>
                  </select>
                </Field>

                <Field label="Preferred destination">
                  <select
                    name="destination"
                    value={profile.destination}
                    onChange={updateField}
                    className={inputStyle}
                  >
                    <option value="">Select destination</option>
                    <option value="Any Country">Any Country</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="Türkiye">Türkiye</option>
                    <option value="China">China</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="Other">Other</option>
                  </select>
                </Field>

                <Field label="Funding preference">
                  <select
                    name="funding"
                    value={profile.funding}
                    onChange={updateField}
                    className={inputStyle}
                  >
                    <option value="">Select funding preference</option>
                    <option value="Fully Funded">Fully Funded</option>
                    <option value="Partial Funding">Partial Funding</option>
                    <option value="Tuition Fee Only">
                      Tuition Fee Only
                    </option>
                    <option value="Any Funding">Any Funding</option>
                  </select>
                </Field>
              </div>

              <div className="mt-9 border-t border-white/10 pt-7">
                <h3 className="text-lg font-bold">Areas of interest</h3>

                <p className="mt-2 text-sm text-slate-400">
                  Select one or more subjects.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {interestOptions.map((interest) => (
                    <label
                      key={interest}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                        profile.interests.includes(interest)
                          ? "border-teal-300/40 bg-teal-300/10"
                          : "border-white/10 bg-[#07111f] hover:border-white/20"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={profile.interests.includes(interest)}
                        onChange={() => toggleInterest(interest)}
                        className="h-4 w-4 accent-teal-300"
                      />

                      <span className="text-sm text-slate-200">
                        {interest}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-teal-300 px-6 py-3.5 text-sm font-bold text-[#07111f] transition hover:bg-teal-200 disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : isEditing
                      ? "Update Profile"
                      : "Save My Profile"}
                </button>

                {isEditing && (
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="rounded-xl border border-white/10 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-white/5"
                  >
                    Cancel
                  </button>
                )}

                <Link
                  to="/scholarship"
                  className="rounded-xl border border-white/10 px-6 py-3.5 text-center text-sm font-semibold text-slate-200 hover:bg-white/5"
                >
                  Browse Scholarships
                </Link>
              </div>
            </form>

            <aside className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-[#0c1a2a] p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-300 to-cyan-400 text-xl text-[#07111f]">
                  ✦
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  Your details, your opportunities
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Your education, marks and study preferences can help you
                  find relevant scholarship opportunities.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#102638] to-[#0c1a2a] p-6">
                <p className="text-sm text-slate-400">Need help?</p>

                <h3 className="mt-2 text-lg font-bold">AI Assistant</h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Ask questions about scholarships and eligibility.
                </p>

                <Link
                  to="/assistant"
                  className="mt-5 inline-flex text-sm font-semibold text-teal-300 hover:text-teal-200"
                >
                  Open AI assistant →
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
