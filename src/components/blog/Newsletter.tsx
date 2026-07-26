import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-gray-50 py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-4xl font-black">Stay in the loop</h2>
        <p className="mt-4 text-gray-500 text-lg">
          Get the latest tech insights delivered to your inbox.
        </p>
        <div className="mt-8 flex gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-6 py-4 rounded-xl border border-black/10 font-medium focus:border-black focus:outline-none"
          />
          <button className="bg-black text-white px-6 py-4 rounded-xl font-bold hover:bg-gray-800 transition flex items-center gap-2">
            Subscribe
            <ArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    </section>
  );
}