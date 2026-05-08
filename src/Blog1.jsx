import { useNavigate } from "react-router-dom";

function Blog1() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 z-50 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white p-3 rounded-full shadow-lg transition hover:scale-110"
      >
        ←
      </button>

      {/* IMAGE */}
      <img
        src="/blog1.jpg"
        className="w-full max-h-[400px] object-cover rounded-xl mb-10"
      />

      {/* TITLE */}
      <h1 className="text-5xl font-bold mb-6">
        Deployment Philosophy
      </h1>

      {/* CONTENT */}
      <p className="text-gray-400 max-w-3xl leading-7">
        My DevOps philosophy focuses on automation, scalability, and resilience.
        Systems should be self-healing, observable, and easy to deploy.
        Infrastructure must be reproducible using IaC and deployments should be zero-downtime.
      </p>

    </div>
  );
}

export default Blog1;