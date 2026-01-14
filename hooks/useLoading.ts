import { useState } from "react";

export const useLoading = () => {
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  return { error, setError, isLoading, setIsLoading };
};
