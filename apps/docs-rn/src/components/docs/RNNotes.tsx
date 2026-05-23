import { Smartphone } from "lucide-react"

interface RNNotesProps {
  notes: string[]
}

export function RNNotes({ notes }: RNNotesProps) {
  if (!notes.length) return null

  return (
    <div className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3">
      <div className="flex items-center gap-2 mb-2">
        <Smartphone className="size-4 text-brand-600 shrink-0" />
        <h3 className="text-sm font-semibold text-brand-700">React Native Notes</h3>
      </div>
      <ul className="space-y-1.5 pl-1">
        {notes.map((note, i) => (
          <li key={i} className="flex gap-2 text-xs text-brand-700 leading-relaxed">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
            {note}
          </li>
        ))}
      </ul>
    </div>
  )
}
