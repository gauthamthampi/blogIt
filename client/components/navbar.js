'use client'
import Link from 'next/link';

export default function Navbar() {

  return (
    <div>
    <nav className="bg-gradient-to-r from-[#42275a] to-[#734b6d] p-4 flex justify-between items-center">
      <div className="flex items-center">
      <div>
  <span role="img" aria-label="logo" className="font-pacifico text-2xl text-white">blogIt📝</span>
</div>
      </div>
      <div className="flex space-x-4">
        <Link href="/login" className="text-white hover:bg-[#5e3f6a] px-4 py-2 rounded-md">
          Login
        </Link>
        <Link href="/signup" className="text-white hover:bg-[#5e3f6a] px-4 py-2 rounded-md">
          Signup
        </Link>
      </div>
    </nav>
  </div>
  );
}
