import { useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const API_URL = "http://localhost:8080/api/assistant";

const suggestions = [
  "Recommend scholarships based on my saved profile and provide official application links.",
  "How can I get a fully funded scholarship?",
  "What should I include in a scholarship application?",
];

function getSavedUser() {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return {
      email: user.email || user.user?.email || "",
      name: user.name || user.fullName || user.user?.name || "",
    };
  } catch {
    return { email: "", name: "" };
  }
}

export default function Assistant() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async (text = question) => {
    const message = text.trim();

    if (!message || loading) return;

    const savedUser = getSavedUser();
    const token = localStorage.getItem("token");

    if (!savedUser.email) {
      setError("Your saved email was not found. Please log in again.");
      return;
    }

    if (!token) {
      setError("Your login token is missing. Please log in again.");
      return;
    }

    const previousMessages = messages;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: message },
    ]);

    setQuestion("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message,
          history: previousMessages.slice(-10).map((item) => ({
            role: item.role === "assistant" ? "model" : "user",
            text: item.text,
          })),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        throw new Error(
          "Your session could not be verified. Please log in again."
        );
      }

      if (!response.ok) {
        throw new Error(data.message || "Could not contact AI.");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply || "Sorry, I could not generate a response.",
        },
      ]);
    } catch (err) {
      console.error("Assistant error:", err);

      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the backend. Check your server and API URL."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#07111f] px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/profile"
          className="text-sm text-teal-300 hover:text-teal-200"
        >
          ← Back to Profile
        </Link>

        <header className="mb-8 mt-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-300/10 text-3xl">
            ✦
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">
            Powered by Gemini
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            ScholarshipMatch AI
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400">
            Get personalized scholarship guidance and discover official
            application links based on your student profile.
          </p>
        </header>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#0c1a2a]">
          <div className="flex items-center gap-3 border-b border-white/10 p-5">
            <div className="h-3 w-3 rounded-full bg-teal-300" />
            <div>
              <h2 className="font-semibold">Scholarship Assistant</h2>
              <p className="text-xs text-slate-400">
                Your personalized AI guidance space
              </p>
            </div>
          </div>

          <div className="min-h-[350px] space-y-5 p-4 sm:p-6">
            {messages.length === 0 && (
              <div className="py-8">
                <h3 className="text-center text-xl font-semibold">
                  What would you like to know?
                </h3>

                <div className="mx-auto mt-6 grid max-w-2xl gap-3">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => sendMessage(suggestion)}
                      disabled={loading}
                      className="rounded-xl border border-white/10 bg-[#07111f] p-4 text-left text-sm text-slate-300 transition hover:border-teal-300/40 hover:bg-teal-300/5 disabled:opacity-50"
                    >
                      {suggestion}
                      <span className="float-right text-teal-300">↗</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((item, index) => (
              <div
                key={index}
                className={`flex ${
                  item.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-7 sm:max-w-[80%] ${
                    item.role === "user"
                      ? "whitespace-pre-wrap bg-teal-300 font-medium text-[#07111f]"
                      : "break-words border border-white/10 bg-[#07111f] text-slate-200"
                  }`}
                >
                  {item.role === "user" ? (
                    item.text
                  ) : (
                    <ReactMarkdown
                      components={{
                        a: ({ href, children }) => {
                          const safeUrl = /^https?:\/\//i.test(href || "");

                          if (!safeUrl) {
                            return <span>{children}</span>;
                          }

                          return (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="my-2 inline-block rounded-lg bg-teal-300 px-4 py-2 font-semibold text-[#07111f] transition hover:bg-teal-200"
                            >
                              {children}
                            </a>
                          );
                        },
                      }}
                    >
                      {item.text}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-sm text-teal-300">
                Gemini is checking your question...
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-200">
                {error}
              </div>
            )}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
            className="border-t border-white/10 p-4 sm:p-5"
          >
            <div className="flex items-end gap-3 rounded-2xl border border-white/10 bg-[#07111f] p-2">
              <textarea
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask about scholarships..."
                rows={2}
                className="max-h-32 min-h-12 flex-1 resize-y bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />

              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="rounded-xl bg-teal-300 px-5 py-3 font-bold text-[#07111f] transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? "..." : "Send ↗"}
              </button>
            </div>

            <p className="mt-3 text-center text-xs text-slate-500">
              Verify scholarship eligibility, deadlines, and application links
              on official websites before applying.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
