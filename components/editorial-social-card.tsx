export function EditorialSocialCard({
  eyebrow,
  title,
  description,
  meta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "66px 72px",
        background: "#030712",
        color: "#f9fafb",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          color: "#f87171",
          fontSize: 23,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: 999,
            background: "#f87171",
            display: "flex",
          }}
        />
        {eyebrow}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            maxWidth: 1020,
            display: "flex",
            fontSize: title.length > 54 ? 60 : 72,
            fontWeight: 750,
            lineHeight: 0.98,
            letterSpacing: "-0.055em",
          }}
        >
          {title}
        </div>
        <div
          style={{
            maxWidth: 930,
            display: "flex",
            color: "#9ca3af",
            fontSize: 27,
            lineHeight: 1.35,
          }}
        >
          {description}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 24,
          borderTop: "1px solid #1f2937",
          color: "#9ca3af",
          fontSize: 22,
        }}
      >
        <span style={{ display: "flex" }}>Lucas Chatham</span>
        {meta && <span style={{ display: "flex" }}>{meta}</span>}
      </div>
    </div>
  );
}
