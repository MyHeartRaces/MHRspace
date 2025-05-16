export default function LinkBlock() {
    const links = [
        { href: "https://linkedin.com/in/...", label: "LinkedIn" },
        { href: "mailto:email@example.com", label: "Email" },
        { href: "https://myblog.example.com", label: "Blog" },
    ];

    return (
        <div className="mt-12 flex flex-wrap gap-4">
            {links.map((l) => (
                <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border px-4 py-2 hover:bg-gray-100 transition"
                >
                    {l.label}
                </a>
            ))}
        </div>
    );
}
