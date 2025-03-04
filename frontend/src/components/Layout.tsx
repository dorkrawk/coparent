import { Link, Outlet } from 'react-router-dom';

function LayoutComponent() {
    return (
      <div>
        <nav><Link to="/">Home</Link></nav>
        <main>
          <Outlet /> {/* Nested routes render here */}
        </main>
        <footer>Footer Content</footer>
      </div>
    );
  }

  export default LayoutComponent;