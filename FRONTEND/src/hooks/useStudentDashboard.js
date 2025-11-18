import { useEffect, useState } from "react";
import {
  fetchMe,
  fetchMyResults,
  fetchMyAssignments,
  fetchAllQuizzes,
  fetchLeaderboard
} from "../api/dashboard";

export default function useStudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState(null);
  const [results, setResults] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  const [stats, setStats] = useState({
    active: 0,
    upcoming: 0,
    completed: 0,
    avgScore: 0,
    subjects: []
  });

  useEffect(() => {
    async function load() {
      try {
        const [meRes, resultsRes, assignRes, quizRes, lbRes] = await Promise.all([
          fetchMe(),
          fetchMyResults(),
          fetchMyAssignments(),
          fetchAllQuizzes(),
          fetchLeaderboard()
        ]);

        setMe(meRes.user);
        setResults(resultsRes.results);
        setAssignments(assignRes.assignments || []);
        setQuizzes(quizRes.quizzes || []);
        setLeaderboard(lbRes.leaderboard || []);

        // Calculate stats
        const completed = resultsRes.results.length;
        const active = quizRes.quizzes.filter(q => q.isPublished).length;
        const upcoming = quizRes.quizzes.filter(q => !q.isPublished).length;

        // Average Score
        let avg = 0;
        if (resultsRes.results.length > 0) {
          avg =
            resultsRes.results.reduce((s, r) => s + r.score, 0) /
            resultsRes.results.length;
        }

        // Unique subjects
        const subjects = [
          ...new Set(
            quizRes.quizzes
              .map(q => q.subject)
              .filter(Boolean)
          )
        ];

        setStats({
          active,
          upcoming,
          completed,
          avgScore: Math.round(avg),
          subjects
        });

      } catch (err) {
        console.error("Dashboard load failed:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    loading,
    me,
    results,
    assignments,
    quizzes,
    leaderboard,
    stats
  };
}
