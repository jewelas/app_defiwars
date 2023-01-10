import React, { useEffect } from "react"
import { useWeb3React } from "@web3-react/core";
import { NetworkContextName } from '../../constants'
import { network } from '../../connectors'
import { Navigate, useLocation } from "react-router-dom";
import { useActiveWeb3React } from 'hooks';
import { useEagerConnect, useInactiveListener } from '../../hooks';
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { account } = useActiveWeb3React();
  const location = useLocation();

  const isInWar = useSelector(state => state.user.isInWar);

  const { activate: activateNetwork } = useWeb3React(
    NetworkContextName
  )

  const triedEager = useEagerConnect()

  useEffect(() => {
    if(triedEager) {
      activateNetwork(network);
    }
  }, [triedEager]);


  if (!account || !isInWar)
    return <Navigate to="/" state={{ from: location }} />

  return children;
};

export default ProtectedRoute;
