import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold mb-4">Products</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-primary">LAN Cabling</Link></li>
            <li><Link href="#" className="hover:text-primary">Fiber Optic</Link></li>
            <li><Link href="#" className="hover:text-primary">Racks & Cabinets</Link></li>
            <li><Link href="#" className="hover:text-primary">Networking</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-primary">Contact Us</Link></li>
            <li><Link href="#" className="hover:text-primary">FAQ</Link></li>
            <li><Link href="#" className="hover:text-primary">Warranty</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-primary">About Us</Link></li>
            <li><Link href="#" className="hover:text-primary">Careers</Link></li>
            <li><Link href="#" className="hover:text-primary">Press</Link></li>
          </ul>
        </div>
        <div>
          <Image src="/assets/interlink-logo.png" alt="Interlink Logo" width={150} height={50} className="brightness-0 invert" />
          <p className="text-sm mt-4">The Best of The World Class Cabling System</p>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/20">
        <div className="container py-4 text-center text-sm text-secondary-foreground/60">
          © {new Date().getFullYear()} Interlink Communication PLC. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};