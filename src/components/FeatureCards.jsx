import { motion } from "framer-motion";

export default function FeatureCards() {
  return (
    <div className="flex gap-5 mt-10">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-orange-500 text-white p-5 rounded-2xl w-56 h-28"
      >
        Dynamic Animation
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-lime-400 text-black p-5 rounded-2xl w-56 h-28"
      >
        React, Framer
      </motion.div>
    </div>
  );
}