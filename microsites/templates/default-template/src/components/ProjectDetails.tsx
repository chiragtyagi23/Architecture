import { useCampaignData } from '../lib/CampaignDataContext'

export function ProjectDetails() {
  const { showFacts, facts } = useCampaignData()
  if (!showFacts) return null

  return (
    <section className="hs-section" id="details">
      <div className="hs-section-title">
        <h2>Project overview</h2>
      </div>
      <div className="hs-panel">
        <table className="hs-spec-table">
          <tbody>
            {facts.map((f) => (
              <tr key={f.key}>
                <th scope="row">{f.key}</th>
                <td>{f.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
