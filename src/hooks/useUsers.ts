"use client";

import { useState, useEffect } from "react";
import type { User, ApiResponse } from "@/types";

interface Props {
  pageSize?: number;
  page?: number;
}

export const useUsers = (props: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // RandomUser API doesn't provide total count, using fixed number
  const [totalCount] = useState(5000); 
  

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://randomuser.me/api/?results=${props.pageSize || 12}&page=${
          props.page || 1
        }`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse = await response.json();
      setUsers(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [props.page, props.pageSize]); // Refetch when page or pageSize changes

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
    totalCount,
  };
};
