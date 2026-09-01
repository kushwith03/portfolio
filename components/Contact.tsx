"use client";

import React, { useState } from "react";
import { Send, CheckCircle, Mail, MapPin, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3500);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("kushwith03@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-24 bg-[#ffffff] dark:bg-[#030712] transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/[0.04] dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.1] text-sky-600 dark:text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
                <Mail className="h-3.5 w-3.5" />
                <span>Contact Channels</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Let&apos;s build together.
              </h3>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Available for full-time software engineering roles, distributed backend architectures, and high-impact AI systems.
              </p>
            </div>

            <div className="space-y-4">
              {/* Direct Email Card with copy button */}
              <div className="flex items-center justify-between p-5 bg-white/80 dark:bg-[#070e20]/80 backdrop-blur-2xl rounded-2xl border border-slate-200 dark:border-white/[0.09] shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/20 text-sky-500 dark:text-sky-400 rounded-xl">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-slate-500 dark:text-slate-400">Direct Email</p>
                    <a
                      href="mailto:kushwith03@gmail.com"
                      className="text-sm font-bold text-slate-900 dark:text-white hover:text-sky-400 font-mono transition-colors"
                    >
                      kushwith03@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-600 dark:text-slate-300 transition-all text-xs"
                  title="Copy email address"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-3.5 p-5 bg-white/80 dark:bg-[#070e20]/80 backdrop-blur-2xl rounded-2xl border border-slate-200 dark:border-white/[0.09] shadow-sm">
                <div className="p-3 bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 text-indigo-500 dark:text-indigo-400 rounded-xl">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">Location</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                    Bengaluru, Karnataka, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <motion.div
            className="lg:col-span-7 bg-white/90 dark:bg-[#070e20]/90 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-white/[0.09] shadow-xl p-6 sm:p-8"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] focus:border-sky-400 focus:outline-none text-slate-900 dark:text-white text-sm transition-colors"
                  placeholder="e.g. Alex Morgan"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] focus:border-sky-400 focus:outline-none text-slate-900 dark:text-white text-sm transition-colors"
                  placeholder="alex@company.com"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] focus:border-sky-400 focus:outline-none text-slate-900 dark:text-white text-sm transition-colors resize-none"
                  placeholder="Hi Khushwith, I came across your portfolio and would love to connect regarding..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm shadow-lg transition-all flex items-center justify-center gap-2 border ${
                  status === "success"
                    ? "bg-emerald-600 text-white border-emerald-500"
                    : "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white border-sky-400/30 shadow-sky-500/20"
                } disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2 font-mono">
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Message...
                  </span>
                ) : status === "success" ? (
                  <span className="flex items-center gap-2 font-mono">
                    <CheckCircle className="h-4 w-4 text-emerald-300" />
                    Message Sent Successfully!
                  </span>
                ) : (
                  <span className="flex items-center gap-2 font-mono">
                    <Send className="h-4 w-4" /> Send Direct Message
                  </span>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

