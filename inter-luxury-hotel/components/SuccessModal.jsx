"use client";

import Modal from "./Modal";
import { useUI } from "@/context/UIContext";
import { CheckCircle2 } from "lucide-react";

export default function SuccessModal() {
  const { successMsg, closeSuccess } = useUI();

  return (
    <Modal open={!!successMsg} onClose={closeSuccess} maxWidth="max-w-sm">
      <div className="p-8 text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center mb-5">
          <CheckCircle2 className="text-gold" size={28} />
        </div>
        <h3 className="font-display text-xl text-cream mb-2">All Set</h3>
        <p className="text-sm text-cream-dim leading-relaxed">{successMsg}</p>
        <button onClick={closeSuccess} className="btn-primary w-full mt-6">
          Continue
        </button>
      </div>
    </Modal>
  );
}
