import React from 'react'
import Layout from '../routes/Layout'
import World from '../world/World'
import CreateMapFormDialog from './CreateMapFormDialog'


const HomePage = () => {
  return (
    <Layout>
      <World />
      <CreateMapFormDialog />
    </Layout>
  )
}

export default HomePage