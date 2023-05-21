import Profile from '@/components/Profile/Profile'
import RiwayatKonsultasi from '@/components/Profile/RiwayatKonsultasi'
import MainLayout from '@/layouts/mainLayout'
import React from 'react'

function ProfilePage() {
  return (
    <MainLayout>
      <Profile />
      <RiwayatKonsultasi />
    </MainLayout>
  )
}

export default ProfilePage
