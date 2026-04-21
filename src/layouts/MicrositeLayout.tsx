import '../../microsites/templates/luxury-template/src/index.css'
import '../../microsites/templates/affordable-template/src/index.css'

export default function MicrositeLayout({ children }: { children: React.ReactNode }) {
  return <div className="m-0 w-full min-w-full box-border overflow-x-hidden">{children}</div>
}

