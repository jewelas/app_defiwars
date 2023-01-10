import React from 'react'
import { Button, ButtonProps, useWalletModal} from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import useAuth from 'hooks/useAuth'
import i18n from "../../i18n";

const UnlockButton: React.FC<ButtonProps> = (props) => {
  const TranslateString = useI18n()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Button onClick={onPresentConnectModal} {...props}>
      {i18n.t('connectWallet', 'Connect Wallet')}
    </Button>
  )
}

export default UnlockButton
