import { NextResponse } from "next/server";

export const revalidate = 1800; // Cache for 30 minutes

export async function GET() {
  try {
    const githubStats = {
      public_repos: 22,
      followers: 3,
      languages: [
        { name: "Java", percentage: 42, color: "#f89820" },
        { name: "JavaScript / Node", percentage: 32, color: "#f7df1e" },
        { name: "Python", percentage: 16, color: "#3776ab" },
        { name: "TypeScript", percentage: 10, color: "#3178c6" },
      ],
      recent_repos: [
        {
          name: "Autonomous-Vehicle",
          language: "Python",
          description: "End-to-end perception & deep autoencoder simulation in CARLA",
          url: "https://github.com/kushwith03/Autonomous-Vehicle",
        },
        {
          name: "ai-resume-builder",
          language: "JavaScript",
          description: "Dynamic AI resume generator with Gemini API & PDF export",
          url: "https://github.com/kushwith03/ai-resume-builder",
        },
        {
          name: "blogspace",
          language: "Node.js",
          description: "MVC-based REST API platform with PostgreSQL & JWT auth",
          url: "https://github.com/kushwith03/blogspace",
        },
        {
          name: "portfolio",
          language: "TypeScript",
          description: "Production Next.js 14 engineering showcase & AI assistant",
          url: "https://github.com/kushwith03/portfolio",
        },
      ],
    };

    // Attempt live fetch from GitHub API with graceful timeout
    try {
      const userRes = await fetch("https://api.github.com/users/kushwith03", {
        headers: { "User-Agent": "Khushwith-Portfolio" },
        next: { revalidate: 1800 },
      });

      if (userRes.ok) {
        const userData = await userRes.json();
        githubStats.public_repos = userData.public_repos || githubStats.public_repos;
        githubStats.followers = userData.followers || githubStats.followers;
      }
    } catch {
      // Fallback to static values if rate limited
    }

    const leetcodeStats = {
      total_solved: 252,
      target: 300,
      breakdown: {
        easy: { count: 112, total: 850, label: "Easy", color: "text-emerald-400", bg: "bg-emerald-500" },
        medium: { count: 126, total: 1750, label: "Medium", color: "text-amber-400", bg: "bg-amber-500" },
        hard: { count: 14, total: 750, label: "Hard", color: "text-rose-400", bg: "bg-rose-500" },
      },
      categories: [
        { name: "Arrays & Hashing (Java)", solved: 64, progress: 92 },
        { name: "Binary Trees & Graphs", solved: 52, progress: 84 },
        { name: "Two Pointers & Binary Search", solved: 48, progress: 88 },
        { name: "Dynamic Programming", solved: 42, progress: 78 },
        { name: "Stacks, Queues & Heaps", solved: 46, progress: 85 },
      ],
      primary_lang: "Java (JDK 17/21)",
      ranking_percentile: "Top 18%",
    };

    return NextResponse.json({
      success: true,
      visits: 1480,
      github: githubStats,
      leetcode: leetcodeStats,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { success: false, visits: 1480, error: "Failed to load live metrics" },
      { status: 500 }
    );
  }
}
