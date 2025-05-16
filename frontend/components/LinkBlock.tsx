import { ExternalLink } from "lucide-react";

export default function LinkBlock() {
  const links = [
    { href: "https://linkedin.com/in/yourprofile", label: "LinkedIn" },
    { href: "mailto:you@example.com", label: "Email" },
    { href: "https://yourblog.com", label: "Blog" },
  ];
  return (
    <div className="flex flex-wrap gap-4 mt-10">
      {links.map(l => (
        <a key={l.href} href={l.href} target="_blank" rel="noreferrer"
           className="inline-flex items-center gap-1 border px-3 py-2 rounded-md hover:bg-gray-100 transition">
          <ExternalLink size={16} />
          {l.label}
        </a>
      ))}
    </div>
  );
}
