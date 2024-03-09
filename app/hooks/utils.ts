import { useState, useEffect } from "react";

export function useWasMounted() {
  const [wasMounted, setWasMounted] = useState(false);
  useEffect(() => setWasMounted(true), []);
  return wasMounted;
}