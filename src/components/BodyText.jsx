export default function BodyText({ className = '', ...props }) {
  return <p className={`mb-[1.1rem] text-[0.9rem] ${className}`} {...props} />
}