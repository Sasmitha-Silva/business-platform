import Link from "next/link";
import { Users, Globe, MapPin, ShieldCheck, Award, ArrowRight, Flag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Global Community & Districts — Rotaract Business Network",
  description:
    "Connect with 28,000+ Rotaract entrepreneurs across 45 global districts driven by Rotary's ethos of Service Above Self.",
};

const districts = [
  {
    id: "3220",
    number: "3220",
    name: "Sri Lanka & Maldives",
    location: "Colombo, Sri Lanka",
    members: "1,420+",
    businesses: "142 Verified",
    drr: "Anand Vardhan",
    color: "from-[#D41367]/10 to-pink-50",
  },
  {
    id: "9110",
    number: "9110",
    name: "Lagos & Ogun State",
    location: "Lagos, Nigeria",
    members: "2,100+",
    businesses: "185 Verified",
    drr: "Ayodeji Balogun",
    color: "from-amber-500/10 to-amber-50",
  },
  {
    id: "3141",
    number: "3141",
    name: "Mumbai & Thane",
    location: "Mumbai, India",
    members: "3,800+",
    businesses: "310 Verified",
    drr: "Priya Sharma",
    color: "from-[#0050A2]/10 to-blue-50",
  },
  {
    id: "9212",
    number: "9212",
    name: "Kenya, Ethiopia & S. Sudan",
    location: "Nairobi, Kenya",
    members: "1,150+",
    businesses: "98 Verified",
    drr: "David Ochieng",
    color: "from-emerald-500/10 to-emerald-50",
  },
  {
    id: "3291",
    number: "3291",
    name: "Kolkata & W. Bengal",
    location: "Kolkata, India",
    members: "1,600+",
    businesses: "124 Verified",
    drr: "Rahul Banerjee",
    color: "from-purple-500/10 to-purple-50",
  },
  {
    id: "3011",
    number: "3011",
    name: "Delhi NCR",
    location: "New Delhi, India",
    members: "2,400+",
    businesses: "210 Verified",
    drr: "Kavita Malhotra",
    color: "from-rose-500/10 to-rose-50",
  },
];

const fellowshipChapters = [
  { icon: Globe, title: "International Trade Council", desc: "Connecting cross-border exporters and importers across 120 countries." },
  { icon: Award, title: "Young Entrepreneurs Forum", desc: "Peer-to-peer mentoring and pitch sessions for startup founders." },
  { icon: ShieldCheck, title: "Ethics & Compliance Guild", desc: "Setting standards for verified business practices and Rotary integrity." },
];

export default function CommunityPage() {
  return (
    <div className="bg-white min-h-screen pb-16 pt-6">
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-[#D41367] via-[#C20E5B] to-[#9E002B] rounded-[2.5rem] p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/15 backdrop-blur-md text-amber-300 text-xs font-extrabold rounded-full border border-white/20">
              <Globe className="w-3.5 h-3.5" /> Rotary Global Network
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Global Rotaract Community & Districts
            </h1>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              Connect with 28,000+ Rotaract entrepreneurs, district leaders, and verified business owners united by Rotary&apos;s ethos of &quot;Service Above Self.&quot;
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button className="bg-white text-[#D41367] hover:bg-white/90 font-extrabold rounded-full px-6 h-11 text-xs gap-2 shadow-lg" asChild>
                <Link href="/auth/signup">Join Community Network <ArrowRight className="w-4 h-4" /></Link>
              </Button>
              <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-6 h-11 text-xs font-semibold bg-transparent">
                Explore Districts
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Global Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-x divide-border">
          <div>
            <p className="text-3xl font-extrabold text-[#D41367]">28,000+</p>
            <p className="text-xs text-muted-foreground font-semibold mt-1">Global Leaders</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-[#F7A81B]">45</p>
            <p className="text-xs text-muted-foreground font-semibold mt-1">Active R.I. Districts</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-[#0050A2]">120+</p>
            <p className="text-xs text-muted-foreground font-semibold mt-1">Countries Represented</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-[#D41367]">1,200+</p>
            <p className="text-xs text-muted-foreground font-semibold mt-1">Verified Entities</p>
          </div>
        </div>
      </section>

      {/* Districts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#D41367] uppercase tracking-wider">REGIONAL CHAPTERS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-0.5">
              Active Rotaract Districts
            </h2>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl border-border bg-white text-xs font-bold" asChild>
            <Link href="/directory">View All Members</Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {districts.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-3xl border border-border p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className={`h-28 rounded-2xl bg-gradient-to-br ${d.color} p-4 flex items-center justify-between mb-4 border border-border/40`}>
                  <span className="bg-white/90 backdrop-blur-md text-[#D41367] text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
                    District {d.number}
                  </span>
                  <Flag className="w-6 h-6 text-[#D41367]/40" />
                </div>
                <h3 className="font-extrabold text-lg text-foreground">{d.name}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D41367]" /> {d.location}
                </p>

                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border/60 text-xs">
                  <div>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase">MEMBERS</p>
                    <p className="font-extrabold text-foreground mt-0.5">{d.members}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase">BUSINESSES</p>
                    <p className="font-extrabold text-[#D41367] mt-0.5">{d.businesses}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">DRR: <strong className="text-foreground">{d.drr}</strong></span>
                <Button size="sm" variant="ghost" className="text-[#D41367] font-bold text-xs hover:bg-pink-50 rounded-xl" asChild>
                  <Link href={`/directory?district=${d.number}`}>Explore →</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fellowship Chapters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-[#F7A81B] uppercase tracking-wider">NETWORKING GROUPS</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-0.5">
            Specialized Fellowship Guilds
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {fellowshipChapters.map((f) => (
            <div key={f.title} className="bg-white rounded-3xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 text-[#D41367] flex items-center justify-center">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-foreground">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
