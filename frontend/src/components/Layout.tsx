import { Link, Outlet } from 'react-router-dom';

function LayoutComponent() {
    return (
      <div className="flex flex-col">
        <nav className="navbar fixed top-0"><Link to="/">Home</Link></nav>
        <main>
          <Outlet /> {/* Nested routes render here */}
        </main>
      </div>
    );
  }

  export default LayoutComponent;