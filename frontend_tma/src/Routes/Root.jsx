import { Outlet } from "react-router-dom";
import BottomMenu from "../Components/BottomMenu";
import TopMenu from "../Components/TopMenu";

export default function Root() {
  return (
    <>
      <TopMenu></TopMenu>
      <Outlet></Outlet>
      <BottomMenu></BottomMenu>
    </>
  )
}