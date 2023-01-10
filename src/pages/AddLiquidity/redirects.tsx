import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import AddLiquidity from './index'

const OLD_PATH_STRUCTURE = /^(0x[a-fA-F0-9]{40})-(0x[a-fA-F0-9]{40})$/
export function RedirectOldAddLiquidityPathStructure() {
  const props = useParams();
  const { currencyIdA } = props;
  const match = currencyIdA?.match(OLD_PATH_STRUCTURE)
  if (match?.length) {
    return <Navigate to={`/add/${match[1]}/${match[2]}`} />
  }

  return <AddLiquidity {...props} />
}

export function RedirectDuplicateTokenIds() {
  const props = useParams();
  const { currencyIdA, currencyIdB } = props;
  if (currencyIdA?.toLowerCase() === currencyIdB?.toLowerCase()) {
    return <Navigate to={`/add/${currencyIdA}`} />
  }
  return <AddLiquidity {...props} />
}
