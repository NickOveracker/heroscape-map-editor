import React from 'react'
import Layout from '../routes/Layout'
import World from '../world/World'
import CreateMapFormDialog from './CreateMapFormDialog'
import EditMapFormDialog from './EditMapFormDialog'


const HomePage = () => {
  return (
    <Layout>
      <World />
      <CreateMapFormDialog />
      <EditMapFormDialog />
    </Layout>
  )
}

export default HomePage