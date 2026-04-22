import { useState, useEffect } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export const useGameCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/game-categories`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data.categories || []);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export const useProvidersByCategory = (categoryId) => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryId) {
      setProviders([]);
      return;
    }

    const fetchProviders = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/game-categories/${categoryId}`,
        );
        if (!response.ok) throw new Error("Failed to fetch providers");
        const data = await response.json();
        setProviders(data.category?.providers || []);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProviders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [categoryId]);

  return { providers, loading, error };
};

export const useGamesByProvider = (providerId, categoryId) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!providerId && !categoryId) {
      setGames([]);
      return;
    }

    const fetchGames = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (providerId) params.append("provider", providerId);
        if (categoryId) params.append("category", categoryId);

        const response = await fetch(`${API_BASE_URL}/games?${params}`);
        if (!response.ok) throw new Error("Failed to fetch games");
        const data = await response.json();
        setGames(data.games || []);
        setError(null);
      } catch (err) {
        setError(err.message);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [providerId, categoryId]);

  return { games, loading, error };
};
