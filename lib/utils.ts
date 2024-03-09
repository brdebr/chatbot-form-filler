import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useEffect, useState } from "react";

export function useWasMounted() {
  const [wasMounted, setWasMounted] = useState(false);
  useEffect(() => setWasMounted(true), []);
  return wasMounted;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
