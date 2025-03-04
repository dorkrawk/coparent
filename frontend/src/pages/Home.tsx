import Button from "../components/Button";

function Home() {
  return <div>
      <Button text="Start routine" classes="btn-success btn-lg" onClick={() => console.log('clicked')} />
  </div>
}

export default Home;