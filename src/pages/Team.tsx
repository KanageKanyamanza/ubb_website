import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";
import { team } from "../data/team";
import { ArrowRight, Briefcase, X } from "lucide-react";

type TeamMember = typeof team[number];

// ── Modal ──────────────────────────────────────────────────────
function MemberModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gold/30 shadow-2xl"
          style={{ background: "linear-gradient(160deg, #1A1A1A 0%, #0D0D0D 100%)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gold top line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/5 border border-border-subtle flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/10 transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Photo */}
            <div className="relative aspect-[3/4] sm:aspect-auto sm:min-h-[400px] overflow-hidden rounded-tl-2xl rounded-bl-2xl">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gold/5 mix-blend-overlay" />
            </div>

            {/* Info */}
            <div className="p-7 flex flex-col gap-5">
              {member.badge && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold border border-gold/30 text-[10px] font-bold uppercase tracking-widest self-start rounded-full">
                  {member.badge}
                </span>
              )}

              <div>
                <h2 className="text-2xl md:text-3xl font-serif text-text-primary italic leading-snug mb-1">
                  {member.name}
                </h2>
                <p className="text-gold text-xs uppercase tracking-widest font-medium">{member.role}</p>
              </div>

              <div className="w-10 h-0.5 bg-gold" />

              <p className="text-text-secondary text-sm leading-relaxed flex-1">
                {member.bio}
              </p>

              {/* Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {member.chips.map((chip) => (
                  <span
                    key={chip}
                    className="px-3 py-1.5 bg-bg-card border border-border-subtle text-text-muted text-[10px] uppercase tracking-wider rounded-full hover:border-gold/50 hover:text-gold transition-all"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom gold line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function Team() {
  const [founder, ...members] = team;
  const [selected, setSelected] = useState<TeamMember | null>(null);

  return (
    <div className="flex flex-col w-full min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-bg-primary" />
        <div className="absolute inset-0 gold-glow opacity-40" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 blur-3xl rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <span className="text-gold text-[11px] uppercase tracking-[0.35em] font-medium block mb-5">
              Les Visages derrière UBB
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-text-primary italic mb-6 leading-tight">
              Notre Équipe
            </h1>
            <GoldDivider className="mx-auto mb-6" />
            <p className="text-text-secondary text-lg md:text-xl font-serif italic">
              Des experts engagés au service des PME africaines
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Fondateur (featured) ─────────────────────────────── */}
      <section className="py-20 bg-bg-secondary relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold/4 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-16">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
              <span className="text-gold text-[11px] uppercase tracking-[0.35em] font-medium">Fondateur & Directeur Général</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border border-gold/25 rounded-xl pointer-events-none z-0" />
                <div className="relative z-10 overflow-hidden rounded-xl border border-border-subtle shadow-2xl group aspect-[4/5]">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gold/5 mix-blend-overlay" />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="flex flex-col gap-6">
                {founder.badge && (
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 text-gold border border-gold/30 text-xs font-bold uppercase tracking-widest self-start rounded-full">
                    {founder.badge}
                  </span>
                )}
                <div>
                  <h2 className="text-4xl md:text-5xl font-serif text-text-primary italic mb-2">
                    {founder.name}
                  </h2>
                  <p className="text-gold font-medium uppercase tracking-[0.2em] text-sm">
                    {founder.role}
                  </p>
                </div>
                <div className="w-12 h-0.5 bg-gold" />
                <p className="text-text-secondary text-lg leading-relaxed font-light">
                  {founder.bio}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {founder.chips.map((chip) => (
                    <span
                      key={chip}
                      className="px-3 py-1.5 bg-bg-card border border-border-subtle text-text-muted text-[11px] uppercase tracking-wider rounded-full hover:border-gold/50 hover:text-gold transition-all"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Team Grid ────────────────────────────────────────── */}
      <section className="py-24 bg-bg-primary relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-gold/3 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-gold text-[11px] uppercase tracking-[0.35em] font-medium block mb-4">L'équipe</span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-text-primary mb-5">Nos Experts</h2>
              <GoldDivider className="mx-auto" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {members.map((member, idx) => (
              <AnimatedSection key={member.id} delay={idx * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="group relative bg-bg-card border border-border-subtle rounded-xl overflow-hidden hover:border-gold/40 hover:shadow-[0_8px_40px_rgba(201,151,58,0.12)] transition-all duration-500"
                >
                  {/* Photo */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/20 to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="w-6 h-0.5 bg-gold mb-3 group-hover:w-10 transition-all duration-300" />
                    <h3 className="font-serif text-lg text-text-primary italic leading-snug mb-1 group-hover:text-gold transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-text-muted text-[11px] uppercase tracking-wider font-medium mb-4">
                      {member.role}
                    </p>

                    {/* Voir plus button */}
                    <button
                      onClick={() => setSelected(member)}
                      className="inline-flex items-center gap-1.5 text-xs text-gold/70 hover:text-gold font-medium transition-colors group/btn"
                    >
                      Voir le profil
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join CTA ──────────────────────────────────────────── */}
      <section className="py-24 bg-bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 gold-glow opacity-30" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <AnimatedSection>
            <span className="text-gold text-[11px] uppercase tracking-[0.35em] font-medium block mb-5">
              Rejoindre l'aventure
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-text-primary mb-6 leading-tight">
              Rejoignez l'Aventure UBB
            </h2>
            <GoldDivider className="mx-auto mb-8" />
            <p className="text-text-secondary leading-relaxed mb-10 text-lg">
              Vous partagez nos valeurs et souhaitez contribuer à l'essor des PME africaines ?
              Nous cherchons des talents passionnés pour renforcer notre équipe.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/jobs"
                className="group inline-flex items-center gap-2 px-8 py-4 font-bold uppercase tracking-widest text-sm text-bg-primary rounded-full transition-all duration-300 hover:shadow-[0_0_28px_rgba(201,151,58,0.5)] hover:scale-105 active:scale-95"
                style={{ background: "linear-gradient(135deg, #E8BC6A 0%, #C9973A 60%, #A87B28 100%)" }}
              >
                <Briefcase className="w-4 h-4" />
                Voir nos opportunités
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/inscription"
                className="inline-flex items-center gap-2 px-8 py-4 font-bold uppercase tracking-widest text-sm text-gold border border-gold/50 rounded-full hover:bg-gold/10 hover:border-gold transition-all duration-300 hover:scale-105"
              >
                S'inscrire
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Modal ─────────────────────────────────────────────── */}
      {selected && (
        <MemberModal member={selected} onClose={() => setSelected(null)} />
      )}

    </div>
  );
}
