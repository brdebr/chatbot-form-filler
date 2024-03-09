import { theme_styles } from "./style-constants";

export default function Home() {
  return (
    <h1 className={`
      mt-6
      ${theme_styles.header}
    `}>Chatbot Form Filler</h1>
  );
}
