import { useEffect, useState } from "react";

type Out = [React.ReactElement | null, (value: React.ReactElement | null) => void];

export function useToast(): Out {
  const [toast, setToast] = useState<React.ReactElement | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setToast(null);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [toast]);

  return [toast, setToast];
}
