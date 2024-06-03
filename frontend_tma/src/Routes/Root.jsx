import { Outlet } from "react-router-dom";
import BottomMenu from "../Components/BottomMenu";
import WebApp from "@twa-dev/sdk";

export default function Root() {
  alert(`Hello man ${WebApp.initDataUnsafe.user.first_name}`)
  return (
    <>
      <Outlet></Outlet>
      <BottomMenu></BottomMenu>
    </>
  )
}