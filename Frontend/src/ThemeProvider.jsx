import { useEffect } from "react";
import { useSelector } from "react-redux";
const ThemeProvider = ({ children }) => {
  const { theme, textColor } = useSelector((state) => state.theme);

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(theme, textColor);
    theme == "dark" ? document.body.classList.add("bg-black") : "";
  }, [theme, textColor]);

  return <>{children}</>;
};

export default ThemeProvider;
