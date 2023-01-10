import React from 'react'
import { Navigate, useParams } from 'react-router-dom'

const OLD_PATH_STRUCTURE = /^(0x[a-fA-F0-9]{40})-(0x[a-fA-F0-9]{40})$/

export function RedirectOldRemoveLiquidityPathStructure() {
  const params = useParams();

  const { tokens = '' } = params;

  if (!OLD_PATH_STRUCTURE.test(tokens)) {
    return <Navigate to="/pool" />
  }
  const [currency0, currency1] = tokens.split('-')

  return <Navigate to={`/remove/${currency0}/${currency1}`} />
}

export default RedirectOldRemoveLiquidityPathStructure
