import { ZapIcon, GlobeIcon, UsersIcon, CodeIcon } from "@/components/Icons";

type Props = {
  vector: string;
};

function getVectorType(vector: string): string {
  const v = vector.toLowerCase();
  if (v.includes("orchestration")) return "orchestration";
  if (v.includes("waterfall")) return "waterfall";
  if (v.includes("sdr") || v.includes("ai sdr")) return "ai-sdr";
  if (v.includes("technical") || v.includes("moat")) return "technical";
  return "orchestration"; // default
}

function getVectorIcon(type: string, size = 12) {
  switch (type) {
    case "orchestration": return <ZapIcon size={size} />;
    case "waterfall": return <GlobeIcon size={size} />;
    case "ai-sdr": return <UsersIcon size={size} />;
    case "technical": return <CodeIcon size={size} />;
    default: return <ZapIcon size={size} />;
  }
}

export function VectorTag({ vector }: Props) {
  const type = getVectorType(vector);

  return (
    <span className={`vectorTag vectorTag--${type}`}>
      {getVectorIcon(type)}
      {vector}
    </span>
  );
}

export function VectorTags({ vectors }: { vectors: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {vectors.map((v) => (
        <VectorTag key={v} vector={v} />
      ))}
    </div>
  );
}
