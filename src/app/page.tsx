"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { successNotification } from "./component/Notification/ToastNotification";

export default function Home() {
  const handleClick=()=>{
                successNotification("hello")
    
  }
  return (
    <div  onClick={handleClick}>
      helo fom home
    </div>
  );
}
