import { useState } from "react";
import { Outlet } from "react-router-dom";
import { TonConnectUIProvider } from '@tonconnect/ui-react';

import BottomMenu from "../Components/BottomMenu/BottomMenu";
import TopMenu from "../Components/TopMenu/TopMenu";
import Invite from "./Invite/Invite";
import Leaderboard from "./Leaderboard/Leaderboard";
import Wallet from './Wallet/Wallet';

export default function Root() {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showWallet, setShowWallet] = useState(false);

  return (
    <>
      <TonConnectUIProvider>
      <Invite isActive={showInvite} onClose={() => setShowInvite(false)}></Invite>
      <Leaderboard isActive={showLeaderboard} onClose={() => setShowLeaderboard(false)}></Leaderboard>
      <Wallet isActive={showWallet} onClose={() => setShowWallet(false)}></Wallet>

      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <TopMenu
        onInviteClick={() => setShowInvite(true)}
        onLeaderboardClick={() => setShowLeaderboard(true)}
        onWalletClick={() => setShowWallet(true)}></TopMenu>
      <main className="mainContent">
        <Outlet></Outlet>
      </main>
      <BottomMenu></BottomMenu>
      </TonConnectUIProvider>
    </>
  )
}