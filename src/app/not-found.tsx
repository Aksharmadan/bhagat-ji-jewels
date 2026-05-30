import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <Image src="/logo.png" alt="" width={80} height={80} className="mb-8 opacity-80" />
      <p className="text-[10px] tracking-[0.4em] text-text-muted uppercase">404</p>
      <h1 className="font-display mt-4 text-4xl text-text md:text-5xl">This page has moved on</h1>
      <p className="mt-4 max-w-md text-text-muted">
        Like a rare piece from our vault — what you seek isn&apos;t here. Return to our collections.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn-gold">
          Home
        </Link>
        <Link href="/collections" className="btn-outline">
          <span>Collections</span>
        </Link>
      </div>
    </div>
  );
}
