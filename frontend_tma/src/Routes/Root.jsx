import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { TonConnectUIProvider } from '@tonconnect/ui-react';

import BottomMenu from "../Components/BottomMenu/BottomMenu";
import TopMenu from "../Components/TopMenu/TopMenu";
import Invite from "./Invite/Invite";
import Leaderboard from "./Leaderboard/Leaderboard";
import Wallet from './Wallet/Wallet';
import LoadingScreen from "../Components/LoadingScreen/LoadingScreen";

import axiosInstance from "../axios";

export default function Root() {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showWallet, setShowWallet] = useState(false);

  const [personalInfo, setPersonalInfo] = useState(null);

  function updatePersonalInfo() {
    axiosInstance.get('/api/me')
      .then((res) => {
        setPersonalInfo(res.data);
      })
  }
  
  useEffect(() => {
    updatePersonalInfo();
  }, [])

  if (personalInfo == null) {
    return <LoadingScreen></LoadingScreen>
  }
  return (
    <>
      <TonConnectUIProvider manifestUrl="http://localhost:5173/tonconnect-manifest.json">
      <Invite isActive={showInvite} onClose={() => setShowInvite(false)}></Invite>
      <Leaderboard isActive={showLeaderboard} onClose={() => setShowLeaderboard(false)}></Leaderboard>
      <Wallet isActive={showWallet} onClose={() => setShowWallet(false)} updatePersonalInfo={updatePersonalInfo}></Wallet>

      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <TopMenu
        onInviteClick={() => setShowInvite(true)}
        onLeaderboardClick={() => setShowLeaderboard(true)}
        onWalletClick={() => setShowWallet(true)}
        personalInfo={personalInfo}></TopMenu>
      <main className="mainContent">
        <Outlet context={{ personalInfo, updatePersonalInfo }}></Outlet>
      </main>
      <BottomMenu></BottomMenu>
      </TonConnectUIProvider>
    </>
  )
}