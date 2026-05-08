import { motion } from "framer-motion";

export default function ProfileCard() {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white text-black rounded-2xl p-5 w-[260px] shadow-lg"
    >
      <div className="bg-orange-500 rounded-xl h-44 flex items-center justify-center text-white font-bold">
        IMAGE
      </div>

      <h2 className="mt-4 font-bold text-lg">MARK SMITH</h2>

      <p className="text-sm text-gray-600 mt-2">
        A Product Designer who has crafted countless experiences.
      </p>
    </motion.div>
  );
}