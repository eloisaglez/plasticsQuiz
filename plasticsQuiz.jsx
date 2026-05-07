import React, { useState, useEffect, useCallback, useRef } from "react";
import { Check, X, Trophy, Lightbulb, Timer, ArrowRight, RotateCcw } from 'lucide-react';

const QUESTIONS = [
  // SESSION 1
  { session: 1, q: "What is the correct definition of plastic?", options: ["A material that is always flexible and soft", "A mouldable material under pressure and temperature that maintains its shape", "A material that can only come from petroleum", "A material that is always biodegradable"], correct: 1, explanation: "Plastics are mouldable under the correct conditions and keep their shape when those conditions are lifted." },
  { session: 1, q: "Where do synthetic plastics come from?", options: ["Corn starch", "Petroleum and its derivatives", "Latex from trees", "Recycled materials only"], correct: 1, explanation: "Most plastics we use are synthetic — made from petroleum." },
  { session: 1, q: "Which of the following is a natural plastic?", options: ["PVC", "Polystyrene", "Latex", "ABS"], correct: 2, explanation: "Latex is obtained from the sap of the Hevea brasiliensis tree." },
  { session: 1, q: "What is a monomer?", options: ["The basic repeating unit in a plastic's structure", "A machine for manufacturing plastics", "The recycling code on plastic objects", "A type of thermoset plastic"], correct: 0, explanation: "Monomers are mainly carbon and hydrogen bonds that repeat to form chains." },
  { session: 1, q: "The chain formed by a bond of monomers is called a…", options: ["Thermoset", "Nurdle", "Polymer", "Elastomer"], correct: 2, explanation: "A polymer is a long chain of repeating monomer units." },
  { session: 1, q: "The three main types of plastics by structure are:", options: ["PET, PVC and HDPE", "Thermosets, thermoplastics and elastomers", "ABS, PLA and Filaflex", "Synthetic, natural and recycled"], correct: 1, explanation: "Classification is based on polymer chain structure." },
  { session: 1, q: "What happens to thermosets when heated after forming?", options: ["They become soft and can be reshaped", "They become elastic", "They degrade or decompose", "They become stronger"], correct: 2, explanation: "Thermosets have cross-linked chains — they cannot be remelted." },
  { session: 1, q: "What is the main characteristic of thermoplastics?", options: ["They cannot be melted once formed", "They can be softened and formed many times", "They are always flexible", "They are always biodegradable"], correct: 1, explanation: "Thermoplastics have weak bonds, allowing repeated melting." },
  { session: 1, q: "What is the key property of elastomers?", options: ["They can be remelted many times", "They are very hard and rigid", "They recover their shape when forces stop", "They are always transparent"], correct: 2, explanation: "Elastomers have coiled polymer chains — very flexible!" },
  { session: 1, q: "True or False: Most plastics we use are synthetic.", options: ["True", "False", "", ""], correct: 0, explanation: "Most plastics come from petroleum and its derivatives.", twoOptions: true },
  { session: 1, q: "True or False: Elastomers can be remelted after forming.", options: ["True", "False", "", ""], correct: 1, explanation: "Elastomers CANNOT be remelted — they degrade with heat.", twoOptions: true },

  // SESSION 2
  { session: 2, q: "Melamine (a thermoset) is used for:", options: ["Tyres and elastic bands", "Kitchen cupboards and wooden board coating", "Water bottles", "Bags and packaging film"], correct: 1, explanation: "Melamine resists high temperatures and chemicals — ideal for kitchens." },
  { session: 2, q: "Which best describes Bakelite?", options: ["Flexible and transparent", "Hard, brittle, dark thermoset", "Soft and elastic", "Lightweight, breaks easily"], correct: 1, explanation: "Bakelite is used for handles, electrical accessories and plugs." },
  { session: 2, q: "What is PET used for?", options: ["Pipes and window profiles", "Water bottles and textile fibres", "Car bodies", "Kitchen cupboards"], correct: 1, explanation: "PET (RIC 1) is lightweight, transparent and fully recyclable." },
  { session: 2, q: "What is the RIC number for PVC?", options: ["1", "3", "5", "6"], correct: 1, explanation: "PVC = RIC 3. Used for pipes and cable insulation." },
  { session: 2, q: "HDPE (RIC 2) is:", options: ["Transparent and lightweight", "Opaque, inflexible and chemical resistant", "Soft, flexible and easily scratched", "Very lightweight and breaks easily"], correct: 1, explanation: "HDPE is non-toxic and used for milk bottles, pipes and bags." },
  { session: 2, q: "LDPE (RIC 4) is mainly used for:", options: ["Water bottles", "Bags and packaging film", "Pipes and cables", "Yoghurt pots"], correct: 1, explanation: "LDPE is soft, flexible and easily scratched." },
  { session: 2, q: "Polypropylene (PP, RIC 5) is used for:", options: ["Tyres", "Car bodies", "Toys, folders and packaging", "Wetsuits"], correct: 2, explanation: "PP is easy to model and dye, resistant to solvents." },
  { session: 2, q: "Expanded polystyrene is also known as:", options: ["Bakelite", "Styrofoam", "Neoprene", "Melamine"], correct: 1, explanation: "Styrofoam is widely used for packaging and thermal insulation." },
  { session: 2, q: "Which elastomer is ideal for wetsuits?", options: ["Silicone", "Rubber", "Neoprene", "PVC"], correct: 2, explanation: "Neoprene is flexible, insulated and waterproof." },
  { session: 2, q: "Silicones are mainly used for:", options: ["Tyres and shoe soles", "Joint sealing, insulation and medical prostheses", "Bags and film", "Wetsuits and drive belts"], correct: 1, explanation: "Silicones are flexible, soft and very durable elastomers." },
  { session: 2, q: "Which RIC numbers are easily recyclable?", options: ["3, 6 and 7", "1, 2, 4 and 5", "1, 3, 5 and 7", "All of them"], correct: 1, explanation: "PET, HDPE, LDPE and PP are the easiest to recycle." },
  { session: 2, q: "RIC 7 identifies:", options: ["The most recyclable plastics", "Mixtures of resins (nylon, ABS…) — hard to recycle", "Only biodegradable plastics", "Only PET and HDPE"], correct: 1, explanation: "RIC 7 plastics are often very difficult or impossible to recycle." },
  { session: 2, q: "True or False: Rubber is a thermoplastic.", options: ["True", "False", "", ""], correct: 1, explanation: "Rubber is an ELASTOMER, not a thermoplastic.", twoOptions: true },
  { session: 2, q: "True or False: PET (RIC 1) is fully recyclable.", options: ["True", "False", "", ""], correct: 0, explanation: "PET is lightweight, transparent and fully recyclable!", twoOptions: true },

  // SESSION 3
  { session: 3, q: "PLA (polylactic acid) is created from:", options: ["Petroleum derivatives", "Natural materials like corn starch or sugar cane", "Recycled ABS", "Rubber and latex"], correct: 1, explanation: "PLA is biodegradable and from plant-based materials." },
  { session: 3, q: "What is the main safety concern with ABS?", options: ["It is highly flammable", "It releases harmful gases — ventilation needed!", "It causes electric shocks", "It melts at room temperature"], correct: 1, explanation: "Always ensure good ventilation when printing with ABS." },
  { session: 3, q: "At what temperature do PLA parts break down?", options: ["230–260 °C", "100 °C", "50–60 °C", "0 °C"], correct: 2, explanation: "PLA cannot withstand high temperatures — a key disadvantage." },
  { session: 3, q: "Which statement about PLA is correct?", options: ["Not biodegradable but recyclable", "Biodegradable, no toxic gases when printing", "Needs ventilated environments", "Needs a heated print bed"], correct: 1, explanation: "PLA is the more environmentally friendly 3D printing option." },
  { session: 3, q: "Which is an advantage of using plastics?", options: ["They decompose quickly in nature", "They make vehicles lighter → less fuel → fewer emissions", "They are all biodegradable", "They don't pollute the oceans"], correct: 1, explanation: "Lighter vehicles reduce greenhouse gas emissions." },
  { session: 3, q: "What is the main disadvantage of plastics?", options: ["Too expensive to produce", "Their durability — most are not biodegradable", "Too heavy for transport", "Cannot be used for food"], correct: 1, explanation: "Durability is both their main advantage AND disadvantage!" },
  { session: 3, q: "What are 'mermaid tears'?", options: ["A biodegradable plastic", "Tiny plastic bits in oceans ingested by marine animals", "A 3D printing filament", "Contaminated water drops"], correct: 1, explanation: "Despite the name, mermaid tears cause serious environmental harm." },
  { session: 3, q: "The 'rule of the 3 Rs' refers to:", options: ["Remove, Replace, Reject", "Reduce, Recycle, Reuse", "Reduce, Repair, Recycle", "Read, Research, Report"], correct: 1, explanation: "These three actions help minimise environmental impact." },
  { session: 3, q: "The 3 Rs can be extended to 5 Rs. The extra two are:", options: ["Remove and Replace", "Repair and Recover", "Reject and Return", "Redesign and Rethink"], correct: 1, explanation: "5 Rs: Reduce, Repair, Recover, Recycle, Reuse." },
  { session: 3, q: "Crushed recycled plastic pieces are called:", options: ["Mermaid tears", "Nurdles", "Monomers", "PLA pellets"], correct: 1, explanation: "Nurdles are mixed with additives and dyes to create new parts." },
  { session: 3, q: "In extrusion, plastic is:", options: ["Injected into a cold mould", "Pushed through a hot tube by a rotating worm", "Placed between two moulds with pressure", "Heated as a sheet with vacuum"], correct: 1, explanation: "Extrusion makes long products like pipes and profiles." },
  { session: 3, q: "Injection moulding is used to make:", options: ["Pipes and profiles", "Kitchen appliances, toys and bowls", "Yoghurt pots and egg cups", "Only thermoset plugs"], correct: 1, explanation: "Melted plastic is injected into a cold mould where it solidifies." },
  { session: 3, q: "Blow moulding is used to form:", options: ["Solid plugs", "Bottles, toys and hollow objects", "Long pipes", "Flat sheets and films"], correct: 1, explanation: "Air is blown inside a tube until it fills the mould shape." },
  { session: 3, q: "In vacuum forming, what forces the plastic to adapt?", options: ["Compressed air", "A vacuum (air extraction)", "A rotating worm", "A piston"], correct: 1, explanation: "The vacuum sucks air out, pressing the sheet against the mould." },
  { session: 3, q: "Compression moulding is used with:", options: ["Only thermoplastics", "Thermoset plastics", "Only elastomers", "All types equally"], correct: 1, explanation: "Pressure + heat between a mould and counter mould." },
  { session: 3, q: "True or False: ABS is biodegradable.", options: ["True", "False", "", ""], correct: 1, explanation: "ABS is NOT biodegradable, but it IS recyclable.", twoOptions: true },
  { session: 3, q: "True or False: PLA does NOT need a heated print bed.", options: ["True", "False", "", ""], correct: 0, explanation: "Correct! This is one of PLA's advantages over ABS.", twoOptions: true },
];

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12"];
const SHAPES = ["▲", "◆", "●", "■"];
const SESSION_NAMES = { 1: "Session 1: Definition & Structure", 2: "Session 2: Types & RIC Codes", 3: "Session 3: 3D Print, Dilemma & Manufacturing" };

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export default function PlasticsQuiz() {
  const [screen, setScreen] = useState("menu");
  const [sessionFilter, setSessionFilter] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [timer, setTimer] = useState(20);
  const [timerActive, setTimerActive] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [timerDuration, setTimerDuration] = useState(20);
  const timerRef = useRef(null);

  const startQuiz = (session) => {
    setSessionFilter(session);
    const filtered = session === 0 ? QUESTIONS : QUESTIONS.filter(q => q.session === session);
    setQuestions(shuffle(filtered));
    setCurrent(0);
    setRevealed(false);
    setScreen("quiz");
    setTimer(timerDuration);
    setTimerActive(false);
  };

  const startTimer = useCallback(() => {
    setTimer(timerDuration);
    setTimerActive(true);
  }, [timerDuration]);

  useEffect(() => {
    if (timerActive && timer > 0) {
      timerRef.current = setTimeout(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0 && timerActive) {
      setTimerActive(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [timer, timerActive]);

  const reveal = () => {
    setRevealed(true);
    setTimerActive(false);
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setRevealed(false);
      setTimer(timerDuration);
      setTimerActive(false);
    } else {
      setScreen("done");
    }
  };

  const cq = questions[current];

  if (screen === "menu") {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', system-ui, sans-serif", padding: 20 }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at 20% 30%, rgba(59,130,246,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(168,85,247,0.1) 0%, transparent 50%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 700 }}>
          <div style={{ fontSize: 56, marginBottom: 4 }}>🧪</div>
          <h1 style={{ color: "#fff", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, margin: "0 0 6px", letterSpacing: "-1px" }}>PLASTIC MATERIALS</h1>
          <p style={{ color: "#94a3b8", fontSize: "clamp(14px, 2.5vw, 18px)", margin: "0 0 30px", letterSpacing: 2, textTransform: "uppercase" }}>Classroom Quiz · 3º ESO</p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
            <span style={{ color: "#cbd5e1", fontSize: 14, fontWeight: 600 }}>TIMER:</span>
            {[15, 20, 30].map(t => (
              <button key={t} onClick={() => setTimerDuration(t)} style={{ padding: "8px 18px", borderRadius: 20, border: timerDuration === t ? "2px solid #3b82f6" : "2px solid #334155", background: timerDuration === t ? "#3b82f6" : "transparent", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all .2s" }}>
                {t}s
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
            {[1, 2, 3].map(s => (
              <button key={s} onClick={() => startQuiz(s)} style={{ padding: "16px 24px", borderRadius: 14, border: "none", background: `linear-gradient(135deg, ${COLORS[s - 1]}dd, ${COLORS[s - 1]}88)`, color: "#fff", fontSize: "clamp(14px, 2.5vw, 17px)", fontWeight: 700, cursor: "pointer", textAlign: "left", transition: "transform .15s, box-shadow .15s", boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }}
                onMouseEnter={e => { e.target.style.transform = "scale(1.02)"; e.target.style.boxShadow = "0 6px 25px rgba(0,0,0,0.4)"; }}
                onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)"; }}>
                <span style={{ opacity: 0.7, fontSize: 13 }}>SESSION {s}</span><br />
                {SESSION_NAMES[s]}
                <span style={{ float: "right", opacity: 0.6, fontSize: 13, marginTop: -20 }}>{QUESTIONS.filter(qq => qq.session === s).length} Qs</span>
              </button>
            ))}
          </div>

          <button onClick={() => startQuiz(0)} style={{ padding: "16px 40px", borderRadius: 14, border: "2px solid #a78bfa", background: "linear-gradient(135deg, #7c3aed, #a78bfa)", color: "#fff", fontSize: "clamp(15px, 2.5vw, 18px)", fontWeight: 800, cursor: "pointer", letterSpacing: 1, boxShadow: "0 4px 20px rgba(124,58,237,0.4)", transition: "transform .15s" }}
            onMouseEnter={e => e.target.style.transform = "scale(1.03)"}
            onMouseLeave={e => e.target.style.transform = "scale(1)"}>
            🎯 ALL SESSIONS ({QUESTIONS.length} Questions)
          </button>
        </div>
      </div>
    );
  }

  if (screen === "done") {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a, #1e3a5f)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', system-ui, sans-serif", textAlign: "center", padding: 20 }}>
        <div style={{ fontSize: 72, marginBottom: 10 }}>🎉</div>
        <h1 style={{ color: "#fff", fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, margin: "0 0 10px" }}>Quiz Complete!</h1>
        <p style={{ color: "#94a3b8", fontSize: 18, margin: "0 0 30px" }}>You covered {questions.length} questions</p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={() => { setQuestions(shuffle(questions)); setCurrent(0); setRevealed(false); setTimer(timerDuration); setTimerActive(false); setScreen("quiz"); }} style={{ padding: "14px 32px", borderRadius: 12, border: "none", background: "#3b82f6", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>🔄 Replay Same</button>
          <button onClick={() => setScreen("menu")} style={{ padding: "14px 32px", borderRadius: 12, border: "2px solid #475569", background: "transparent", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>🏠 Menu</button>
        </div>
      </div>
    );
  }

  const isTwoOpt = cq?.twoOptions;
  const timerPct = (timer / timerDuration) * 100;
  const timerColor = timer > 10 ? "#22c55e" : timer > 5 ? "#f59e0b" : "#ef4444";

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", fontFamily: "'Segoe UI', system-ui, sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", background: "#1e293b", borderBottom: "1px solid #334155", flexWrap: "wrap", gap: 8 }}>
        <button onClick={() => setScreen("menu")} style={{ background: "none", border: "none", color: "#94a3b8", fontSize: 14, cursor: "pointer", fontWeight: 600 }}>✕ Exit</button>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(13px, 2vw, 16px)", letterSpacing: 1 }}>
          Q {current + 1} / {questions.length}
          {sessionFilter > 0 && <span style={{ color: "#94a3b8", fontWeight: 400, marginLeft: 10 }}>Session {sessionFilter}</span>}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {!timerActive && !revealed && <button onClick={startTimer} style={{ padding: "6px 16px", borderRadius: 8, border: "none", background: "#22c55e", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>▶ Start Timer</button>}
          {!revealed && <button onClick={reveal} style={{ padding: "6px 16px", borderRadius: 8, border: "none", background: "#f59e0b", color: "#000", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>👁 Reveal</button>}
          {revealed && <button onClick={next} style={{ padding: "6px 16px", borderRadius: 8, border: "none", background: "#3b82f6", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{current < questions.length - 1 ? "Next →" : "Finish 🏁"}</button>}
        </div>
      </div>

      {/* Timer bar */}
      <div style={{ height: 6, background: "#1e293b", position: "relative" }}>
        <div style={{ height: "100%", width: `${timerPct}%`, background: timerColor, transition: "width 1s linear, background 0.5s", borderRadius: "0 3px 3px 0" }} />
      </div>

      {/* Question */}
      <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 20px 16px", minHeight: "18vh" }}>
        <div style={{ maxWidth: 900, textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: "clamp(20px, 4vw, 36px)", fontWeight: 800, margin: 0, lineHeight: 1.3 }}>{cq?.q}</h2>
          {(timerActive || timer === 0) && !revealed && (
            <div style={{ marginTop: 14, fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, color: timerColor, fontVariantNumeric: "tabular-nums", transition: "color 0.5s" }}>{timer}</div>
          )}
        </div>
      </div>

      {/* Explanation (after reveal) */}
      {revealed && (
        <div style={{ padding: "0 20px 12px", display: "flex", justifyContent: "center", animation: "fadeIn 0.4s ease" }}>
          <div style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 12, padding: "12px 20px", maxWidth: 700, textAlign: "center" }}>
            <span style={{ color: "#4ade80", fontWeight: 700, fontSize: "clamp(13px, 2vw, 15px)" }}>💡 {cq?.explanation}</span>
          </div>
        </div>
      )}

      {/* Options grid */}
      <div style={{ flex: 1, padding: "8px 16px 16px", display: "grid", gridTemplateColumns: isTwoOpt ? "1fr 1fr" : "1fr 1fr", gridTemplateRows: isTwoOpt ? "1fr" : "1fr 1fr", gap: 12, maxHeight: "55vh", minHeight: 200 }}>
        {cq?.options.map((opt, i) => {
          if (isTwoOpt && i >= 2) return null;
          const isCorrect = i === cq.correct;
          const bg = revealed
            ? isCorrect
              ? "#22c55e"
              : "rgba(255,255,255,0.05)"
            : COLORS[i];
          const opacity = revealed && !isCorrect ? 0.3 : 1;
          return (
            <div key={i} onClick={!revealed ? reveal : undefined} style={{
              background: bg,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              padding: "16px 20px",
              cursor: revealed ? "default" : "pointer",
              opacity,
              transition: "all 0.4s ease",
              position: "relative",
              overflow: "hidden",
              boxShadow: revealed && isCorrect ? "0 0 30px rgba(34,197,94,0.5)" : "0 4px 15px rgba(0,0,0,0.3)",
              border: revealed && isCorrect ? "3px solid #4ade80" : "3px solid transparent",
            }}>
              <span style={{ fontSize: "clamp(24px, 4vw, 40px)", opacity: 0.5, fontWeight: 900 }}>{SHAPES[i]}</span>
              <span style={{ color: "#fff", fontSize: "clamp(15px, 2.8vw, 24px)", fontWeight: 700, textAlign: "center", lineHeight: 1.3, textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>{opt}</span>
              {revealed && isCorrect && <span style={{ position: "absolute", top: 10, right: 14, fontSize: "clamp(24px, 3vw, 36px)" }}>✅</span>}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
        button:hover { filter: brightness(1.1); }
      `}</style>
    </div>
  );
}
