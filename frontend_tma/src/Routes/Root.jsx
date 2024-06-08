import { Outlet } from "react-router-dom";
import BottomMenu from "../Components/BottomMenu";

export default function Root() {
  return (
    <>
      <Outlet></Outlet>
      <BottomMenu></BottomMenu>
    </>
  )
}