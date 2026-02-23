import Link from "next/link";

export default function OrganizationPage() {
  return (
    <div>
      <Link
        href="/"
        className="font-blueprint text-sm text-blue-600 hover:underline mb-6 inline-block"
      >
        &larr; Back to Control Knobs
      </Link>
      <h1 className="font-blueprint text-2xl font-bold text-slate-900 mb-4">
        Organization
      </h1>
      <p className="text-slate-500">Coming soon.</p>
    </div>
  );
}
