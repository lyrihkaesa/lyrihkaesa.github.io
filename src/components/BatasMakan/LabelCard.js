import React from 'react'
import LabelV1, { renderLabelV1Html } from './LabelV1'
import LabelV2, { renderLabelV2Html } from './LabelV2'

/**
 * LabelCard Component Wrapper
 * Memilih tampilan LabelV1 atau LabelV2 sesuai versi (`lbl.labelVersion` atau prop `version`)
 */
export function LabelCard({ lbl = {}, version, id }) {
  const ver = version || lbl.labelVersion || 'v2'
  if (ver === 'v1') {
    return <LabelV1 lbl={lbl} id={id} />
  }
  return <LabelV2 lbl={lbl} id={id} />
}

/**
 * Helper render HTML untuk popup printer window
 */
export function renderLabelHtml(lbl) {
  const ver = lbl.labelVersion || 'v2'
  if (ver === 'v1') {
    return renderLabelV1Html(lbl)
  }
  return renderLabelV2Html(lbl)
}

export default LabelCard
