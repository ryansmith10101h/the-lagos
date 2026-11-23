import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-lagos-dark flex items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-md space-y-6">
        <div className="inline-flex items-center space-x-2 text-lagos-gold text-xs uppercase tracking-[0.3em]">
          <Compass className="w-4 h-4 text-lagos-gold animate-spin-slow" />
          <span>404 Coordinate</span>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl text-lagos-cream font-bold">
          Lost in Lagos
        </h1>

        <p className="text-sm text-lagos-cream/70 font-light leading-relaxed">
          The page or private reservation coordinate you are seeking does not exist or has been relocated within the sanctuary.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center space-x-2 bg-lagos-gold hover:bg-lagos-bronze text-lagos-dark font-bold px-6 py-3 text-xs uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Sanctuary</span>
          </Link>

          <Link
            href="/menu"
            className="inline-flex items-center justify-center px-6 py-3 border border-lagos-border text-lagos-cream hover:border-lagos-gold text-xs uppercase tracking-widest transition-colors"
          >
            Explore Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
