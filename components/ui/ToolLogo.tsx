"use client";

import { useState } from "react";

type ToolLogoProps = {
  website?: string;
  name: string;
  size?: number;
  className?: string;
};

// Obtiene el favicon de un sitio web usando el servicio de Google
function getFaviconUrl(website: string, size: number = 32): string {
  try {
    const url = new URL(website);
    return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=${size}`;
  } catch {
    return "";
  }
}

// Genera iniciales para el fallback
function getInitials(name: string): string {
  return name
    .split(/[\s.-]+/)
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Colores consistentes basados en el nombre
function getColorFromName(name: string): string {
  const colors = [
    "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6",
    "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#6366f1"
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function ToolLogo({ website, name, size = 24, className }: ToolLogoProps) {
  const [imgError, setImgError] = useState(false);
  const faviconUrl = website ? getFaviconUrl(website, size * 2) : "";

  // Si no hay website o la imagen falló, mostrar iniciales
  if (!website || imgError || !faviconUrl) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: 6,
          background: getColorFromName(name),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.4,
          fontWeight: 700,
          color: "#fff",
          flexShrink: 0,
        }}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <img
      src={faviconUrl}
      alt={`${name} logo`}
      width={size}
      height={size}
      className={className}
      onError={() => setImgError(true)}
      style={{
        borderRadius: 4,
        flexShrink: 0,
        background: "var(--panel)",
      }}
    />
  );
}
