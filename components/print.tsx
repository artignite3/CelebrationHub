import Image from "next/image"

interface PrintProps {
  src: string
  number: number
  wide?: boolean
  priority?: boolean
}

// One of the 23 photographs, hung as a matted print with its number pencilled on a blank rule.
// data-slot marks it as a stand-in: her own photograph replaces the file one for one.
export default function Print({ src, number, wide = false, priority = false }: PrintProps) {
  return (
    <figure className={`print${wide ? " print--wide" : ""}`} style={{ margin: 0 }}>
      <div className="print__mat stock">
        <div className="print__frame" data-slot={`print-${number}`} data-alt="A photograph from the gallery">
          <Image
            src={src}
            alt=""
            fill
            sizes={wide ? "(max-width: 60rem) 90vw, 36rem" : "(max-width: 60rem) 90vw, 26rem"}
            priority={priority}
            style={{ objectFit: "cover" }}
          />
        </div>
        <figcaption className="print__edition">
          <span className="print__blank" aria-hidden="true" />
          <span aria-hidden="true">/23</span>
          <span className="visually-hidden">A print, one of 23</span>
        </figcaption>
      </div>
    </figure>
  )
}
