import React from "react";
import AiditLogo from "./AiditLogo";

interface AiditBrandingProps {
  logoClassName?: string;
  className?: string;
}

const AiditBranding: React.FC<AiditBrandingProps> = ({
  logoClassName = "h-16 w-auto",
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <AiditLogo className={`shrink-0 ${logoClassName}`} />
      <div className="flex flex-col justify-center">
        <span className="text-xl font-bold tracking-tight leading-tight">
          AIDIT
        </span>
        <span className="text-xs font-normal opacity-60 leading-tight">
          By Adit
        </span>
      </div>
    </div>
  );
};

export default AiditBranding;
