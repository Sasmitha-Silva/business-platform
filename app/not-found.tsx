import Link from "next/link";
import { ArrowLeft, Compass, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-slate-50/50">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-pink-50 border border-pink-100 flex items-center justify-center mx-auto shadow-inner">
          <Compass className="w-10 h-10 text-[#D41367] animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black tracking-widest uppercase text-[#D41367]">
            404 — Page Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Lost in the Directory?
          </h1>
          <p className="text-sm text-slate-500 font-normal leading-relaxed max-w-sm mx-auto">
            The page or enterprise profile you are looking for doesn&apos;t exist or may have been relocated.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            asChild
            className="w-full sm:w-auto bg-[#D41367] hover:bg-[#B80E56] text-white rounded-xl text-xs font-bold h-10 px-5 gap-2 shadow-xs cursor-pointer"
          >
            <Link href="/directory">
              <Search className="w-3.5 h-3.5" />
              <span>Browse Directory</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto rounded-xl border-slate-200 text-xs font-bold h-10 px-5 gap-2 hover:bg-slate-50 cursor-pointer"
          >
            <Link href="/">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return Home</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
