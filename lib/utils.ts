import { useEffect, useState } from "react";

export function useWasMounted() {
  const [wasMounted, setWasMounted] = useState(false);
  useEffect(() => setWasMounted(true), []);
  return wasMounted;
}