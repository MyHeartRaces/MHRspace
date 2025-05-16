import ProtectedRoute from "@/components/ProtectedRoute";

export default function Notes() {
  const outlineUrl = process.env.NEXT_PUBLIC_OUTLINE_URL || "http://localhost:3001";
  return (
    <ProtectedRoute>
      <iframe src={outlineUrl} className="w-full h-screen border-none" title="Outline Notes"></iframe>
    </ProtectedRoute>
  );
}
