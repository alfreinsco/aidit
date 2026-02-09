import React from "react";
import { useTheme } from "../context/ThemeContext";

const LOGO_DARK = "/img/logo-aidit-dark.png";  // putih di background gelap
const LOGO_LIGHT = "/img/logo-aidit-light.png"; // hitam di background terang

interface AiditLogoProps {
  className?: string;
  alt?: string;
}

const AiditLogo: React.FC<AiditLogoProps> = ({ className = "", alt = "AIDIT" }) => {
  const { effectiveTheme } = useTheme();
  const src = effectiveTheme === "dark" ? LOGO_DARK : LOGO_LIGHT;
  return (
    <img
      src={src}
      alt={alt}
      className={`object-contain ${className}`}
    />
  );
};

export default AiditLogo;
