import * as React from 'react'
import '../../microsites/templates/template-1/src/index.css'
import MicrositeApp from '../../microsites/templates/template-1/src/App'
import { TemplateBasePathProvider } from '../../microsites/templates/template-1/src/lib/basePath'

export default function ProjectNameMicrosite() {
  return (
    <TemplateBasePathProvider basePath="/project-name">
      <MicrositeApp />
    </TemplateBasePathProvider>
  )
}

