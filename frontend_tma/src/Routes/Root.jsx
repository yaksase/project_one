import { Outlet } from "react-router-dom";
import BottomMenu from "../Components/BottomMenu";
import TopMenu from "../Components/TopMenu";

export default function Root() {
  return (
    <>
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <TopMenu></TopMenu>
      <main className="mainContent">
        <Outlet></Outlet>
      </main>
      <BottomMenu></BottomMenu>
    </>
  )
}