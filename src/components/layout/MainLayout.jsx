import Sidebar from './Sidebar';
import Topbar from './Topbar';

// ── Figma background glow ellipses (node 269:28365 — MacBook Pro 16" - 2) ──
// These three blurred teal ellipses create the signature glow over the dark diamond texture.
const imgEllipse1 = 'https://www.figma.com/api/mcp/asset/249bed59-911d-4de9-8367-6a3bfee21c7e';
const imgEllipse2 = 'https://www.figma.com/api/mcp/asset/456615b4-cba1-48f5-a4ab-3a5675224ba2';
const imgEllipse3 = 'https://www.figma.com/api/mcp/asset/093dd67d-7325-4984-ba75-e8f125240528';

// Diamond tile as inline SVG data-URI — each 80×80 tile has 4 shaded faces
// creating the 3D embossed look matching the Figma background texture.
const DIAMOND_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpolygon points='40%2C0 80%2C40 40%2C80 0%2C40' fill='%230b1624'/%3E%3Cpolygon points='40%2C0 80%2C40 40%2C40' fill='%23101e30'/%3E%3Cpolygon points='40%2C80 80%2C40 40%2C40' fill='%23070e18'/%3E%3Cpolygon points='40%2C0 0%2C40 40%2C40' fill='%230d1c2c'/%3E%3Cpolygon points='40%2C80 0%2C40 40%2C40' fill='%23060c16'/%3E%3C/svg%3E")`;

export default function MainLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', color: '#fff' }}>

      {/* ── Full-viewport background layer (fixed, behind everything) ── */}
      {/* <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          // backgroundColor: '#060c18',
          backgroundImage: DIAMOND_SVG,
          backgroundSize: '80px 80px',
          overflow: 'hidden',
        }}
      >
      </div> */}

      {/* Background Video */}
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-10"
      >
        <source src="/Base.mp4" type="video/mp4" />
      </video> */}

      {/* Overlay (optional for dark effect) */}
      {/* <img src="/Contact Gradient.png" alt="" /> */}
      {/* <div className="bg-[url('/Rectangle.png')] absolute top-0 left-0 w-full h-full z-0"></div>
      <div className="bg-[url('/Contact.png')] absolute top-0 left-0 w-full h-full z-20 object-cover"></div>
      <div className="absolute top-0 left-0 w-full h-full z-20 bg-black/60"></div> */}

      {/* ── Sidebar (position:fixed, z-index:50 — always on top) ── */}
      <Sidebar />

      {/* ── Scrollable page shell ── */}
      <div
        className='z-30'
        style={{
          position: 'relative',
          // zIndex: 1,
          // paddingLeft: 88,  
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Topbar />
        <main style={{ padding: '24px 36px 40px' }} className='h-[calc(100vh-110px)] overflow-y-auto'>
          {children}
        </main>
      </div>
    </div>
  );
}
