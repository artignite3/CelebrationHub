interface BestMomentsCardProps {
  title: string
  description: string
  date: string
}

// One row of the moments index: when, what, and the line that says it
export default function BestMomentsCard({ title, description, date }: BestMomentsCardProps) {
  return (
    <li>
      <p className="small muted">{date}</p>
      <h2 className="item-title">{title}</h2>
      <p>{description}</p>
    </li>
  )
}
