const base =
  'inline-flex min-h-11 cursor-pointer items-center rounded-full border border-ink bg-transparent px-[1.6rem] py-[0.65rem] text-[0.75rem] font-bold text-ink transition-colors duration-300 hover:bg-ink hover:text-bg disabled:cursor-progress disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-ink md:min-h-0 md:px-[1.4rem]'

export default function Button({ as: Tag = 'button', className = '', ...props }) {
  return <Tag className={`${base} ${className}`} {...props} />
}