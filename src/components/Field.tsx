export default function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required
        className="mt-1 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-accent"
      />
    </label>
  );
}
