interface BestMomentsCardProps {
  title: string
  description: string
  date: string
}

export default function BestMomentsCard({ title, description, date }: BestMomentsCardProps) {
  return (
    <article className="rounded-2xl border border-ink/8 bg-surface p-6 transition-colors duration-150 ease-out-soft hover:bg-raised">
      <p className="font-mono text-xs text-ink-3">{date}</p>
      <h3 className="mt-8 font-serif text-2xl font-normal tracking-[-0.01em]">{title}</h3>
      <p className="mt-2 text-[15px] leading-[22px] text-ink-2">{description}</p>
    </article>
  )
}
