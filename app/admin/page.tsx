"use client"

import dynamic from "next/dynamic"

// Browser only: the admin key is read from sessionStorage, which the server cannot see
const AdminScreen = dynamic(() => import("./admin-screen"), { ssr: false })

export default function AdminPage() {
  return <AdminScreen />
}
