export default function Field({ label, as: Tag = 'input', ...props }) {
  return (
    <label className="grid gap-[0.35rem] text-[0.75rem] font-bold">
      {label}
      <Tag
        className="rounded-[2px] border border-line bg-black/35 px-[0.85rem] py-[0.7rem] text-base leading-[1.7] font-light text-ink focus:border-ink focus:outline-none md:text-[0.95rem]"
        {...props}
      />
    </label>
  )
}