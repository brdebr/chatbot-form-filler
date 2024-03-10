import { getFaviconByEnv } from "@/app/hooks/functions";

export function FaviconLinkTag({ size = 80 }) {
  const content = getFaviconByEnv();
  return (
    <link rel="icon" href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%22${size}%22>${content}</text></svg>`}></link>
  );
}