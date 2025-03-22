import Layout from './Layout'

const Home = ({ user }) => {
  return (
    <>
      <h1>Welcome</h1>
      <p>{`Hello ${user.name}, welcome to your first Inertia app!`}</p>
    </>
  )
}

Home.layout = page => <Layout children={page} title="Welcome" />

export default Home