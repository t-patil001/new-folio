  import emailjs from "@emailjs/browser";
  import { Routes, Route } from "react-router-dom";
  import { Home, Folder, Wrench, Pencil, Mail, Briefcase } from "lucide-react";
  import { useEffect, useState, useRef } from "react";
  import { FaLinkedin, FaTwitter } from "react-icons/fa";
  import { HiOutlineDocumentText } from "react-icons/hi";
  import { useNavigate } from "react-router-dom";
  import {
    SiGit, SiGithub, SiGitlab, SiBitbucket, SiJenkins,
    SiGithubactions, SiCircleci, SiDocker, SiKubernetes,
    SiTerraform, SiPrometheus, SiGrafana,
    SiGooglecloud,
    SiDigitalocean, SiNginx
  } from "react-icons/si";

  import { FaServer, FaAws } from "react-icons/fa";


  function HomePage() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [form, setForm] = useState({
      name: "",
      email: "",
      message: "",
    });

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const sendEmail = (e) => {
      e.preventDefault();

      emailjs.send(
        "service_yzoa69q",
        "template_zqogehd",
        form,
        "UwlrvWcKxJrTjg5yw"
      )
      .then(() => {
        alert("Message sent 🚀");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        alert("Failed ❌");
      });
    };
    const navigate = useNavigate();
    const [activeBlog, setActiveBlog] = useState(null);

    // ✅ NEW: counter state
    const [counts, setCounts] = useState({
      years: 0,
      projects: 0,
      clients: 0,
    });

    const [active, setActive] = useState(null);
    const navRef = useRef(null);
    const [highlight, setHighlight] = useState({ left: 0, width: 0 });

    useEffect(() => {
      const move = (e) => setPos({ x: e.clientX, y: e.clientY });
      window.addEventListener("mousemove", move);
      return () => window.removeEventListener("mousemove", move);
    }, []);

    // ✅ NEW: counter animation (ONLY THIS ADDED)
    useEffect(() => {
    const section = document.getElementById("home");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const steps = 50;

          const timer = setInterval(() => {
            start++;

            setCounts({
              years: Math.min(Math.floor((2 / steps) * start), 2),
              projects: Math.min(Math.floor((20 / steps) * start), 20),
              clients: Math.min(Math.floor((16 / steps) * start), 16),
            });

            if (start >= steps) clearInterval(timer);
          }, 20);
        }
      },
      { threshold: 0.5 }
    );

    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

    const NavItem = ({ icon, label, target, index, setActive }) => (
      <a
        href={`#${target}`}
        onMouseEnter={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const parentRect = navRef.current.getBoundingClientRect();

          setHighlight({
            left: rect.left - parentRect.left,
            width: rect.width,
          });

          setActive(index);
        }}
        onMouseLeave={() => setActive(null)}
        className="relative group cursor-pointer p-2 rounded-full flex items-center justify-center z-10"
      >
        {icon}

        {/* Tooltip */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-700 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          {label}
        </div>
      </a>
    );  

    return (
      <div className="min-h-screen bg-black flex justify-center items-center p-6">

        {/* CURSOR */}
        <div
          className="fixed w-4 h-4 bg-white rounded-full pointer-events-none z-50"
          style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
        />

        {/* MAIN CONTAINER */}
        <div className="bg-[#0b0b0b] w-full max-w-6xl rounded-[40px] px-8 py-14 text-white relative shadow-2xl">

          {/* NAVBAR */}
          <div className="sticky top-6 z-50 flex justify-center mb-8">
            <div
              ref={navRef}
              className="relative backdrop-blur-xl bg-[#111]/80 px-6 py-3 rounded-full flex gap-6 text-gray-300 border border-gray-700 shadow-lg"
            >

              {/* 🔥 Sliding highlight */}
              <div
                className={`absolute top-3 h-8 w-10 bg-white/10 rounded-full transition-all duration-300 ${
                  active !== null ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  left: highlight.left - 6,
                  width: highlight.width + 12,
                }}
              />
              <NavItem icon={<Home size={18} />} label="Home" target="home" index={0} setActive={setActive} />
              <NavItem icon={<Folder size={18} />} label="Projects" target="projects" index={1} setActive={setActive} />
              <NavItem icon={<Briefcase size={18} />} label="Work" target="work" index={2} setActive={setActive} />
              <NavItem icon={<Wrench size={18} />} label="Tools" target="tools" index={3} setActive={setActive} />
              <NavItem icon={<Pencil size={18} />} label="Blog" target="blog" index={4} setActive={setActive} />
              <NavItem icon={<Mail size={18} />} label="Contact" target="contact" index={5} setActive={setActive} />
            </div>
          </div>

          {/* GRID */}
          <div className="flex items-start gap-20">

            {/* LEFT */}
            <div className="w-[340px] flex-shrink-0 sticky top-24 h-fit">
              <div className="bg-[#d9d9d9]/90 backdrop-blur-sm rounded-2xl p-8 relative overflow-visible">

                

                <img
                  src="/photo1.jpg"   // 👉 your image path
                  alt="photo"
                  className="rounded-xl h-72 w-full object-cover"
                />

                <h2 className="mt-6 text-black text-3xl font-bold">
                  Tirthraj Patil
                </h2>

                <p className="text-gray-600 text-base mt-3 leading-relaxed">
                  I build systems that scale.<br />
                  I automate what slows teams down.<br />
                  I ensure reliability in production.
                </p>

                <div className="flex gap-5 mt-6 text-gray-700 text-xl">

                  {/* Resume */}
                  <a
                    href="/tirthraj-resume.pdf"   // 👉 put resume in public folder
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group hover:scale-110 hover:text-black transition"
                  >
                    <HiOutlineDocumentText />

                    {/* Tooltip */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                      Resume
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/tirthraj-patil-046ba8351"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 hover:text-blue-700 transition"
                  >
                    <FaLinkedin />
                  </a>

                  {/* Twitter */}
                  <a
                    href="https://twitter.com/your-handle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 hover:text-sky-500 transition"
                  >
                    <FaTwitter />
                  </a>

                </div>

              </div>
            </div>

            {/* RIGHT */}
            <div className="flex-1 max-w-[900px]">

              {/* HOME */}
              <section id="home" className="scroll-mt-24">

                {/* TERMINAL HEADER */}
                <div className="font-mono leading-tight">

                  <p className="text-lg">
                    <span className="text-green-400">tirthtraj@DevOps</span>:
                    <span className="text-blue-400">/Profile</span>
                    <span className="text-white">$ whoami</span>
                    <span className="ml-1 inline-block w-[2px] h-[1em] bg-white animate-blink"></span>
                  </p>

                  <div className="mt-4 leading-[0.85]">
                    <h1 className="text-[120px] font-extrabold text-white tracking-tight">
                      DEVOPS
                    </h1>
                    <h1 className="text-[120px] font-extrabold text-gray-700 -mt-2 tracking-tight">
                      ENGINEER
                    </h1>
                  </div>

                </div>

                <p className="mt-6 text-gray-400 max-w-lg leading-relaxed">
                  I specialize in designing, automating, and optimizing cloud infrastructure
                  for modern web applications. My work focuses on delivering scalable and resilient systems
                  that support high availability, performance, cost effective and continuous delivery. 
                  By leveraging Infrastructure as Code, CI/CD pipelines, and cloud-native tooling, I build 
                  platforms that are efficient, secure, and easy to maintain.
                </p>

                {/* ✅ ONLY THIS BLOCK UPDATED */}
                <div className="flex gap-12 mt-10">
                  <div>
                    <h2 className="text-5xl font-bold">+{counts.years}</h2>
                    <p className="text-gray-500 text-xs">YEARS</p>
                  </div>
                  <div>
                    <h2 className="text-5xl font-bold">+{counts.projects}</h2>
                    <p className="text-gray-500 text-xs">PROJECTS</p>
                  </div>
                  <div>
                    <h2 className="text-5xl font-bold">+{counts.clients}</h2>
                    <p className="text-gray-500 text-xs">CLIENTS</p>
                  </div>
                </div>

              </section>

              {/* PROJECTS */}
              <section id="projects" className="mt-16 scroll-mt-24">
                <p className="text-lg font-mono">
                  <span className="text-green-400">tirthtraj@DevOps</span>:
                  <span className="text-blue-400">/Profile</span>
                  <span className="text-white">$ show --projects</span>
                  <span className="ml-1 inline-block w-[2px] h-[1em] bg-white animate-blink"></span>
                </p>
                {/* Heading */}
                <h2 className="text-[48px] md:text-[56px] font-extrabold tracking-tight">
                  RECENT <span className="text-gray-600">PROJECTS</span>
                </h2>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-8 mt-12">

                  {/* Project 1 */}
                  <div className="cursor-pointer relative">
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src="/project1.png"
                        className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>

                    {/* ✅ FIXED: title + arrow in same row */}
                    <div className="mt-4 flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        Production Ready E-commerce projects
                      </h3>

                      <a
                        href="/project1"
                        className="relative group inline-flex items-center justify-center"
                      >
                        <span className="text-white text-lg hover:scale-110 transition">
                          ↗
                        </span>

                        {/* Tooltip (only on arrow hover) */}
                        <div className="absolute -top-8 right-0 bg-gray-700 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                          stack
                        </div>
                      </a>
                    </div>

                    {/* description */}
                    <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                      Delivered scalable, production-ready e-commerce systems with Kubernetes,
                      Docker Compose, CI/CD pipelines, and modern backend service integrations.
                    </p>
                  </div>

                  {/* Project 2 */}
                  <div className="group cursor-pointer relative">
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src="/project2.png"
                        className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>

                    {/* title + arrow (same as project 1) */}
                    <div className="mt-4 flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        Modern Dating Platforms
                      </h3>

                      <a
                        href="/project2"
                        className="relative group inline-flex items-center justify-center"
                      >
                        <span className="text-white text-lg hover:scale-110 transition">
                          ↗
                        </span>

                        {/* Tooltip */}
                        <div className="absolute -top-8 right-0 bg-gray-700 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                          stack
                        </div>
                      </a>
                    </div>

                    {/* description */}
                    <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                      Developed scalable apps using Kubernetes, Docker Compose, and CI/CD automation.
                      Optimized for real-time features and high availability.
                    </p>
                  </div>

                  {/* Project 3 */}
                  <div className="group cursor-pointer relative">
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src="/project3.png"
                        className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>

                    {/* title + arrow (same as project 1) */}
                    <div className="mt-4 flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        Super Apps/Website
                      </h3>

                      <a
                        href="/project3"
                        className="relative group inline-flex items-center justify-center"
                      >
                        <span className="text-white text-lg hover:scale-110 transition">
                          ↗
                        </span>

                        {/* Tooltip */}
                        <div className="absolute -top-8 right-0 bg-gray-700 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                          stack
                        </div>
                      </a>
                    </div>

                    {/* description */}
                    <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                      These platforms offer comprehensive features including e-commerce, service booking, ticketing, grocery delivery, and other real-world use cases.
                    </p>
                  </div>

                  {/* Project 4 */}
                  <div className="group cursor-pointer relative">
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src="/project4.png"
                        className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>

                    {/* title + arrow (same as project 1) */}
                    <div className="mt-4 flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        ride-sharing platform
                      </h3>

                      <a
                        href="/project3"
                        className="relative group inline-flex items-center justify-center"
                      >
                        <span className="text-white text-lg hover:scale-110 transition">
                          ↗
                        </span>

                        {/* Tooltip */}
                        <div className="absolute -top-8 right-0 bg-gray-700 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                          stack
                        </div>
                      </a>
                    </div>
                    
                    {/* description */}
                    <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                      Developed distributed systems enabling real-time ride matching and tracking using Kubernetes and CI/CD pipelines.
  Optimized for performance, fault tolerance, and high concurrency.
                    </p>
                  </div>
                  
                  {/* Project 5 */}
                  <div className="group cursor-pointer relative">
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src="/project5.png"
                        className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>

                    {/* title + arrow (same as project 1) */}
                    <div className="mt-4 flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        Other Production ready Deployments 
                      </h3>

    
                    </div>

                    {/* description */}
                    <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                      These platforms offer comprehensive features including shipment, ai voice and chat, carrier, doctor appointment and other real-world use cases.
                    </p>
                  </div>

                </div>

              </section>

              {/* EXPERIENCE */}
              <section id="work" className="mt-16 scroll-mt-24">
                <p className="text-lg font-mono">
                  <span className="text-green-400">tirthtraj@DevOps</span>:
                  <span className="text-blue-400">/Profile</span>
                  <span className="text-white">$ cat /var/log/experience.log</span>
                  <span className="ml-1 inline-block w-[2px] h-[1em] bg-white animate-blink"></span>
                </p>
              <h2 className="text-[64px] font-extrabold leading-none">WORK</h2>
              <h2 className="text-[64px] font-extrabold text-gray-600 -mt-2 leading-none">
                EXPERIENCE
              </h2> 

              <div className="mt-6 space-y-5">

                <div>
                  <h3 className="text-lg font-semibold">DevOps Engineer</h3>
                  <p className="text-gray-400 text-sm">
                    <p>3Embed Software Technologies Pvt. Ltd.</p>
                    <p>Appscrip • 2025 – Present </p>
                  </p>
                  <p className="text-gray-500 text-sm mt-2 max-w-xl">
                    <p>Built and optimized cost-efficient, scalable cloud systems across multi-cloud environments.</p>
                    <p>Automated deployments using Kubernetes, Docker, and CI/CD for reliability and speed.</p>
                    <p>Enhanced observability and reduced costs through monitoring and self-hosted solutions.</p>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">DevOps Engineer</h3>
                  <p className="text-gray-400 text-sm">
                    Hisanlabs Pvt. Ltd. • 2024 – 2025
                  </p>
                  <p className="text-gray-500 text-sm mt-2 max-w-xl">
                    <p>Developed scalable cloud systems using AWS, Docker, and Kubernetes.</p>
                    <p>Automated deployments with CI/CD and Terraform.</p>
                    <p>Improved reliability through monitoring and scripting.</p>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">DevOps Intern</h3>
                  <p className="text-gray-400 text-sm">
                    cloudblitz greamio technologies Pvt. ltd. • 2023 – 2024
                  </p>
                  <p className="text-gray-500 text-sm mt-2 max-w-xl">
                    <p>Worked on deploying applications and managing cloud environments.</p>
                    <p>Worked on CI/CD pipelines, containerization, and monitoring.</p>
                  </p>
                </div>

              </div>
            </section>

              {/* TOOLS */}
              <section id="tools" className="mt-16 scroll-mt-24">

                {/* HEADER FIRST */}
                <p className="text-lg font-mono">
                  <span className="text-green-400">tirthtraj@DevOps</span>:
                  <span className="text-blue-400">/Profile</span>
                  <span className="text-white">$ tools --list</span>
                  <span className="ml-1 inline-block w-[2px] h-[1em] bg-white animate-blink"></span>
                </p>

                <h2 className="text-[64px] font-extrabold leading-none">
                  MY
                </h2>

                <h2 className="text-[64px] font-extrabold text-gray-600 mt-1 leading-none">
                  ARSENAL
                </h2>

                {/* ✅ GRID AFTER HEADING */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl">

                  {[
                    { name: "Git", icon: <SiGit /> },
                    { name: "GitHub", icon: <SiGithub /> },
                    { name: "GitLab", icon: <SiGitlab /> },
                    { name: "Bitbucket", icon: <SiBitbucket /> },
                    { name: "Jenkins", icon: <SiJenkins /> },
                    { name: "GitHub Actions", icon: <SiGithubactions /> },
                    { name: "CircleCI", icon: <SiCircleci /> },

                    { name: "Argo CD", icon: <SiKubernetes /> },
                    { name: "Docker", icon: <SiDocker /> },
                    { name: "Kubernetes", icon: <SiKubernetes /> },
                    { name: "Terraform", icon: <SiTerraform /> },

                    { name: "Prometheus", icon: <SiPrometheus /> },
                    { name: "Grafana", icon: <SiGrafana /> },
                    { name: "SigNoz", icon: <FaServer /> },
                    { name: "New Relic", icon: <FaServer /> },

                    { name: "AWS", icon: <FaAws /> },
                    { name: "GCP", icon: <SiGooglecloud /> },
                    { name: "Azure", icon: <FaServer /> },
                    { name: "OCI", icon: <FaServer /> },
                    { name: "DigitalOcean", icon: <SiDigitalocean /> },
                    { name: "Hetzner", icon: <FaServer /> },

                    { name: "Docker Hub", icon: <SiDocker /> },
                    { name: "Amazon ECR", icon: <FaAws /> },
                    { name: "GCR", icon: <SiGooglecloud /> },
                    { name: "NGINX", icon: <SiNginx /> },

                  ].map((tool, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-3 bg-[#111] px-4 py-3 rounded-xl 
                                transition duration-300 hover:scale-110 hover:-translate-y-1
                                hover:bg-[#1a1a1a] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                    >
                      <div className="text-xl text-white">{tool.icon}</div>
                      <span className="text-gray-300 text-sm">{tool.name}</span>
                    </div>

                  ))}

                </div>

              </section>

              {/* BLOG */}
              <section id="blog" className="mt-6 scroll-mt-24">
                <p className="text-lg font-mono">
                  <span className="text-green-400">tirthtraj@DevOps</span>:
                  <span className="text-blue-400">/Profile</span>
                  <span className="text-white">$ cat /etc/philosophy.conf</span>
                  <span className="ml-1 inline-block w-[2px] h-[1em] bg-white animate-blink"></span>
                </p>

                <h2 className="text-[64px] font-extrabold leading-none">
                  DEPLOYMENT
                </h2>

                <h2 className="text-[64px] font-extrabold text-gray-600 mt-1 leading-none">
                  PHILOSOPHY
                </h2>

                {/* 🔥 BLOG CARD */}
                <div className="group bg-[#111] rounded-xl p-4 mt-6 max-w-xl 
                                transform transition duration-300 ease-out
                                hover:scale-[1.03] hover:bg-[#1a1a1a]">

                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold max-w-lg">
                      Cost Efficient Infrastructure
                    </h3>

                    <span
                      onClick={() => setActiveBlog("blog1")}
                      className="cursor-pointer text-orange-500 text-xl hover:translate-x-1 hover:-translate-y-1 transition"
                    >
                      ↗
                    </span>
                  </div>

                  <p className="text-gray-400 mt-3 max-w-lg text-sm">
                    Build infrastructure that matches the client’s budget while keeping performance reliable and production ready.
                  </p>

                </div>
                <div className="group bg-[#111] rounded-xl p-4 mt-6 max-w-xl 
                                transform transition duration-300 ease-out
                                hover:scale-[1.03] hover:bg-[#1a1a1a]">

                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold max-w-lg">
                      Scalable by Design
                    </h3>

                    <span
                      onClick={() => setActiveBlog("blog2")}
                      className="cursor-pointer text-orange-500 text-xl hover:translate-x-1 hover:-translate-y-1 transition"
                    >
                      ↗
                    </span>
                  </div>

                  <p className="text-gray-400 mt-3 max-w-lg text-sm">
                    Ensure systems can scale horizontally and handle future growth without major architecture changes.
                  </p>

                </div>
                <div className="group bg-[#111] rounded-xl p-4 mt-6 max-w-xl 
                                transform transition duration-300 ease-out
                                hover:scale-[1.03] hover:bg-[#1a1a1a]">

                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold max-w-lg">
                      Security First Approach
                    </h3>

                    <span
                      onClick={() => setActiveBlog("blog3")}
                      className="cursor-pointer text-orange-500 text-xl hover:translate-x-1 hover:-translate-y-1 transition"
                    >
                      ↗
                    </span>
                  </div>

                  <p className="text-gray-400 mt-3 max-w-lg text-sm">
                    Apply secure configurations, environment isolation, secret management, and minimal exposure by default.
                  </p>

                </div>
                <div className="group bg-[#111] rounded-xl p-4 mt-6 max-w-xl 
                                transform transition duration-300 ease-out
                                hover:scale-[1.03] hover:bg-[#1a1a1a]">

                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold max-w-lg">
                      Automation Over Manual Work
                    </h3>

                    <span
                      onClick={() => setActiveBlog("blog4")}
                      className="cursor-pointer text-orange-500 text-xl hover:translate-x-1 hover:-translate-y-1 transition"
                    >
                      ↗
                    </span>
                  </div>

                  <p className="text-gray-400 mt-3 max-w-lg text-sm">
                    Automate deployments, monitoring, backups, and repetitive operational tasks to reduce human error.
                  </p>

                </div>
                <div className="group bg-[#111] rounded-xl p-4 mt-6 max-w-xl 
                                transform transition duration-300 ease-out
                                hover:scale-[1.03] hover:bg-[#1a1a1a]">

                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold max-w-lg">
                      High Availability Focus
                    </h3>

                    <span
                      onClick={() => setActiveBlog("blog5")}
                      className="cursor-pointer text-orange-500 text-xl hover:translate-x-1 hover:-translate-y-1 transition"
                    >
                      ↗
                    </span>
                  </div>

                  <p className="text-gray-400 mt-3 max-w-lg text-sm">
                    Design services with uptime and reliability in mind using redundancy, health checks, and recovery strategies.
                  </p>

                </div>
                <div className="group bg-[#111] rounded-xl p-4 mt-6 max-w-xl 
                                transform transition duration-300 ease-out
                                hover:scale-[1.03] hover:bg-[#1a1a1a]">

                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold max-w-lg">
                      Monitoring & Visibility
                    </h3>

                    <span
                      onClick={() => setActiveBlog("blog6")}
                      className="cursor-pointer text-orange-500 text-xl hover:translate-x-1 hover:-translate-y-1 transition"
                    >
                      ↗
                    </span>
                  </div>

                  <p className="text-gray-400 mt-3 max-w-lg text-sm">
                    Implement logging, metrics, and alerting to quickly identify issues and maintain system stability.
                  </p>

                </div>
                <div className="group bg-[#111] rounded-xl p-4 mt-6 max-w-xl 
                                transform transition duration-300 ease-out
                                hover:scale-[1.03] hover:bg-[#1a1a1a]">

                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold max-w-lg">
                      Simplicity Matters
                    </h3>

                    <span
                      onClick={() => setActiveBlog("blog7")}
                      className="cursor-pointer text-orange-500 text-xl hover:translate-x-1 hover:-translate-y-1 transition"
                    >
                      ↗
                    </span>
                  </div>

                  <p className="text-gray-400 mt-3 max-w-lg text-sm">
                    Keep infrastructure clean, maintainable, and easy for teams to understand and operate long term.
                  </p>

                </div>
                <div className="group bg-[#111] rounded-xl p-4 mt-6 max-w-xl 
                                transform transition duration-300 ease-out
                                hover:scale-[1.03] hover:bg-[#1a1a1a]">

                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold max-w-lg">
                      Performance Optimized
                    </h3>

                    <span
                      onClick={() => setActiveBlog("blog8")}
                      className="cursor-pointer text-orange-500 text-xl hover:translate-x-1 hover:-translate-y-1 transition"
                    >
                      ↗
                    </span>
                  </div>

                  <p className="text-gray-400 mt-3 max-w-lg text-sm">
                    Balance resource usage and application performance to achieve efficient and responsive systems.
                  </p>

                </div>
              </section>


              {/* CONTACT */}
              <section id="contact" className="mt-32 scroll-mt-40">
                <p className="text-lg font-mono">
                  <span className="text-green-400">tirthtraj@DevOps</span>:
                  <span className="text-blue-400">/Profile</span>
                  <span className="text-white">$ hire --devops</span>
                  <span className="ml-1 inline-block w-[2px] h-[1em] bg-white animate-blink"></span>
                </p>

                <h2 className="text-[64px] font-extrabold">LET'S WORK</h2>
                <h2 className="text-[64px] font-extrabold text-gray-600 -mt-2">
                  TOGETHER
                </h2>

                <form onSubmit={sendEmail} className="mt-12 space-y-4">

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-4 bg-[#1a1a1a] rounded-xl"
                    placeholder="Name"
                    required
                  />

                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-4 bg-[#1a1a1a] rounded-xl"
                    placeholder="Email"
                    required
                  />

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full p-4 bg-[#1a1a1a] rounded-xl"
                    placeholder="Message"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full bg-orange-500 p-4 rounded-xl hover:bg-orange-600 transition"
                  >
                    Submit
                  </button>

                </form>
              </section>


              {/* 🔥 BLOG OVERLAY */}
              {activeBlog === "blog1" && (
                <div className="fixed inset-0 bg-black z-50 overflow-y-auto animate-fadeInSmooth">

                  {/* BACK BUTTON */}
                  <button
                    onClick={() => setActiveBlog(null)}
                    className="fixed top-6 left-6 bg-[#1a1a1a] hover:bg-[#2a2a2a] p-3 rounded-full text-white"
                  >
                    ←
                  </button>

                  <div className="max-w-4xl mx-auto px-6 py-20">

                    {/* IMAGE ONLY HERE */}
                    <img
                      src="/blog1.jpg"
                      className="w-full max-h-[400px] object-cover rounded-xl mb-10"
                    />

                    

                    <p className="text-gray-400 leading-relaxed space-y-4">
                      Modern infrastructure should not only be powerful but also financially sustainable. Every deployment should be designed around the client’s actual business needs rather than unnecessary overprovisioning. The goal is to create systems that deliver reliability, performance, and scalability without increasing operational costs beyond what is required.

                      <br /><br />

                      A strong infrastructure strategy focuses on efficient resource utilization, optimized compute allocation, and smart scaling policies. Instead of deploying large servers from the beginning, systems should scale incrementally as traffic and workload increase. This approach helps startups and businesses maintain predictable operational expenses while still supporting future growth.

                      <br /><br />

                      Cost optimization also includes selecting the right cloud services, minimizing idle resources, implementing caching strategies, and automating shutdowns for unused environments. Monitoring resource consumption continuously allows businesses to identify inefficiencies before they become expensive problems.

                      The objective is to maintain a balance between performance and affordability while ensuring the infrastructure remains production ready at every stage.
                    </p>

                  </div>
                </div>
              )}
              {activeBlog === "blog2" && (
                <div className="fixed inset-0 bg-black z-50 overflow-y-auto animate-fadeInSmooth">

                  {/* BACK BUTTON */}
                  <button
                    onClick={() => setActiveBlog(null)}
                    className="fixed top-6 left-6 bg-[#1a1a1a] hover:bg-[#2a2a2a] p-3 rounded-full text-white"
                  >
                    ←
                  </button>

                  <div className="max-w-4xl mx-auto px-6 py-20">

                    {/* IMAGE ONLY HERE */}
                    <img
                      src="/blog2.jpg"
                      className="w-full max-h-[400px] object-cover rounded-xl mb-10"
                    />

                    

                    <p className="text-gray-400 leading-relaxed space-y-4">
                      Scalability should never be treated as an afterthought. Infrastructure must be designed with growth in mind from the very beginning. Applications and systems should be capable of handling increasing workloads without requiring complete architectural redesigns
                      <br /><br />

                      A scalable system allows businesses to expand confidently while maintaining stable performance during traffic spikes, product launches, or rapid user growth. Horizontal scaling, container orchestration, load balancing, and distributed services all contribute to building resilient and future-ready platforms.
                      <br /><br />
                      Scalability also improves deployment flexibility. Teams can independently scale applications, APIs, databases, and background services depending on workload requirements. Kubernetes-based deployments, autoscaling groups, and cloud-native architecture patterns ensure resources adapt dynamically to real-time demand.

                      The focus is on creating infrastructure that grows alongside the business while remaining efficient, maintainable, and operationally stable.

                    </p>

                  </div>
                </div>
              )}

              {activeBlog === "blog3" && (
                <div className="fixed inset-0 bg-black z-50 overflow-y-auto animate-fadeInSmooth">

                  {/* BACK BUTTON */}
                  <button
                    onClick={() => setActiveBlog(null)}
                    className="fixed top-6 left-6 bg-[#1a1a1a] hover:bg-[#2a2a2a] p-3 rounded-full text-white"
                  >
                    ←
                  </button>

                  <div className="max-w-4xl mx-auto px-6 py-20">

                    {/* IMAGE ONLY HERE */}
                    <img
                      src="/blog3.jpg"
                      className="w-full max-h-[400px] object-cover rounded-xl mb-10"
                    />

                    

                    <p className="text-gray-400 leading-relaxed space-y-4">
                      Security should be integrated into every layer of infrastructure rather than added later as a patch. Production environments must follow secure-by-default principles to reduce vulnerabilities and minimize exposure.                    <br /><br />
                      
                      This includes implementing proper access control, secret management, encrypted communication, environment isolation, firewall configurations, and least-privilege permissions across services and infrastructure. Secure CI/CD pipelines and automated vulnerability scanning further strengthen deployment reliability.
                      <br /><br />
                      Modern cloud infrastructure requires continuous monitoring, proactive patching, and infrastructure hardening to protect sensitive systems and user data. Security is not just about preventing attacks — it is about building trust, reliability, and operational confidence.

                      A strong security-first culture ensures deployments remain stable, compliant, and resilient against evolving threats while maintaining developer productivity.
                    </p>

                  </div>
                </div>
              )}

              {activeBlog === "blog4" && (
                <div className="fixed inset-0 bg-black z-50 overflow-y-auto animate-fadeInSmooth">

                  {/* BACK BUTTON */}
                  <button
                    onClick={() => setActiveBlog(null)}
                    className="fixed top-6 left-6 bg-[#1a1a1a] hover:bg-[#2a2a2a] p-3 rounded-full text-white"
                  >
                    ←
                  </button>

                  <div className="max-w-4xl mx-auto px-6 py-20">

                    {/* IMAGE ONLY HERE */}
                    <img
                      src="/blog4.jpg"
                      className="w-full max-h-[400px] object-cover rounded-xl mb-10"
                    />

                    

                    <p className="text-gray-400 leading-relaxed space-y-4">
                      Manual operational processes increase the chances of inconsistency, downtime, and human error. Automation helps standardize workflows, accelerate deployments, and improve infrastructure reliability.

                      CI/CD pipelines, Infrastructure as Code, automated testing, containerized deployments, monitoring integrations, and scripted operational tasks allow teams to deliver updates faster and more confidently. Repetitive work should be handled through automation so teams can focus on engineering and innovation.             
                      <br /><br />
                      Automated systems also improve scalability by ensuring infrastructure provisioning and deployments remain repeatable across environments. Whether deploying applications, managing backups, rotating secrets, or scaling services, automation creates consistency and operational efficiency.

                      Reliable automation reduces deployment risks while improving speed, observability, and recovery processes across modern cloud-native systems.
                    </p>

                  </div>
                </div>
              )}

              {activeBlog === "blog5" && (
                <div className="fixed inset-0 bg-black z-50 overflow-y-auto animate-fadeInSmooth">

                  {/* BACK BUTTON */}
                  <button
                    onClick={() => setActiveBlog(null)}
                    className="fixed top-6 left-6 bg-[#1a1a1a] hover:bg-[#2a2a2a] p-3 rounded-full text-white"
                  >
                    ←
                  </button>

                  <div className="max-w-4xl mx-auto px-6 py-20">

                    {/* IMAGE ONLY HERE */}
                    <img
                      src="/blog5.jpg"
                      className="w-full max-h-[400px] object-cover rounded-xl mb-10"
                    />

                    

                    <p className="text-gray-400 leading-relaxed space-y-4">
                      Modern applications are expected to remain available and responsive at all times. Infrastructure should be designed to minimize downtime and recover quickly from failures.

                      High availability is achieved through redundancy, health checks, load balancing, failover systems, distributed deployments, and backup recovery strategies. Services should continue operating even when individual components fail.   
                    
                      <br /><br />
                      Cloud-native architectures make it possible to distribute workloads across multiple instances, zones, or regions to improve uptime and fault tolerance. Monitoring and automated recovery systems help detect failures early and restore service continuity without significant disruption.

                      Reliable infrastructure builds customer trust and ensures businesses can operate continuously without unexpected interruptions impacting users or operations.

                    </p>

                  </div>
                </div>
              )}

              {activeBlog === "blog6" && (
                <div className="fixed inset-0 bg-black z-50 overflow-y-auto animate-fadeInSmooth">

                  {/* BACK BUTTON */}
                  <button
                    onClick={() => setActiveBlog(null)}
                    className="fixed top-6 left-6 bg-[#1a1a1a] hover:bg-[#2a2a2a] p-3 rounded-full text-white"
                  >
                    ←
                  </button>

                  <div className="max-w-4xl mx-auto px-6 py-20">

                    {/* IMAGE ONLY HERE */}
                    <img
                      src="/blog6.jpg"
                      className="w-full max-h-[400px] object-cover rounded-xl mb-10"
                    />

                    

                    <p className="text-gray-400 leading-relaxed space-y-4">
                      Infrastructure without visibility becomes difficult to maintain, troubleshoot, and optimize. Monitoring and observability provide real-time insight into system performance, application health, and operational stability.

                      Logging, metrics collection, tracing, and alerting systems allow teams to detect issues before they impact users. Tools like Prometheus, Grafana, ELK Stack, and cloud monitoring services help maintain infrastructure transparency across environments.
                      
                      <br /><br />
                      Effective monitoring enables proactive incident response, performance optimization, and capacity planning. Teams can quickly identify bottlenecks, unusual activity, failed deployments, or infrastructure inefficiencies using centralized dashboards and automated alerts.

                      Strong observability practices improve reliability, reduce downtime, and support data-driven operational decision making.
                    
                    </p>

                  </div>
                </div>
              )}

              {activeBlog === "blog7" && (
                <div className="fixed inset-0 bg-black z-50 overflow-y-auto animate-fadeInSmooth">

                  {/* BACK BUTTON */}
                  <button
                    onClick={() => setActiveBlog(null)}
                    className="fixed top-6 left-6 bg-[#1a1a1a] hover:bg-[#2a2a2a] p-3 rounded-full text-white"
                  >
                    ←
                  </button>

                  <div className="max-w-4xl mx-auto px-6 py-20">

                    {/* IMAGE ONLY HERE */}
                    <img
                      src="/blog7.jpg"
                      className="w-full max-h-[400px] object-cover rounded-xl mb-10"
                    />

                    

                    <p className="text-gray-400 leading-relaxed space-y-4">
                      Infrastructure should remain understandable, maintainable, and operationally efficient. Overcomplicated systems increase deployment risk, troubleshooting difficulty, and long-term maintenance costs.

                      A clean architecture prioritizes clarity, modularity, and operational simplicity. Teams should be able to understand infrastructure structure, deployment flows, and service dependencies without unnecessary complexity. 
                      <br /><br />
                      Using standardized workflows, reusable modules, clear documentation, and automation helps maintain consistency across environments. Simpler systems are easier to scale, secure, debug, and hand over between engineering teams.

                      The objective is to build infrastructure that remains sustainable and manageable as the organization grows.
                    
                    </p>

                  </div>
                </div>
              )}

              {activeBlog === "blog8" && (
                <div className="fixed inset-0 bg-black z-50 overflow-y-auto animate-fadeInSmooth">

                  {/* BACK BUTTON */}
                  <button
                    onClick={() => setActiveBlog(null)}
                    className="fixed top-6 left-6 bg-[#1a1a1a] hover:bg-[#2a2a2a] p-3 rounded-full text-white"
                  >
                    ←
                  </button>

                  <div className="max-w-4xl mx-auto px-6 py-20">

                    {/* IMAGE ONLY HERE */}
                    <img
                      src="/blog8.jpg"
                      className="w-full max-h-[400px] object-cover rounded-xl mb-10"
                    />

                    

                    <p className="text-gray-400 leading-relaxed space-y-4">
                      Infrastructure should deliver responsive and reliable performance while maintaining efficient resource usage. Optimization is essential for improving user experience, reducing latency, and maximizing infrastructure efficiency.

                      Performance-focused deployments consider application architecture, caching strategies, database optimization, load balancing, CDN integration, and efficient compute allocation. Systems should handle workload spikes smoothly without degrading stability.
                      <br /><br />
                      Continuous performance analysis helps identify bottlenecks and optimize infrastructure proactively. Monitoring CPU, memory, storage, network throughput, and application response times enables teams to maintain efficient operations.

                      A performance-optimized infrastructure ensures systems remain fast, stable, and scalable under real-world production conditions.
                    </p>

                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    );
  }
  /* ✅ NEW PAGE */
  function Project1() { 
    const [hoveredImage, setHoveredImage] = useState(null);
    const navigate = useNavigate();

    return (
      <div className="min-h-screen bg-black text-white py-20 px-6">
        
        {/* ✅ BACK BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="fixed top-6 left-6 z-50 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white p-3 rounded-full shadow-lg transition duration-300 hover:scale-110"
        >
          ←
        </button>

        <h1 className="text-4xl font-bold text-center mb-20">
          E-commerce System Architecture
        </h1>

        <div className="relative max-w-4xl mx-auto">

          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 w-[2px] h-full bg-gray-700 transform -translate-x-1/2"></div>

          {/* STEP 1 */}
          <div className="flex items-center justify-between mb-20">
            <div className="w-1/2 pr-20 flex justify-end">
              <div
                onMouseEnter={() => setHoveredImage("/gcp-cluster.png")}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img
                  src="/gcp-cluster.png"
                  className="w-[420px] rounded-xl shadow-2xl cursor-zoom-in transition duration-300 hover:scale-105"
                />
              </div>
            </div>

            {/* CENTER DOT */}
            <div className="relative w-0 flex justify-center">
              <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500 rounded-full z-10"></div>
            </div>

            {/* TEXT (MATCHED STYLE) */}
            <div className="w-1/2 pl-20 text-right">
              <h3 className="text-xl font-semibold mb-4 tracking-wide">
                Tech Stack
              </h3>

              <div className="text-gray-400 mt-2 space-y-1">
                <p><span className="text-white">Cloud:</span> GCP • GKE Autopilot • Artifact Registry</p>
                <p><span className="text-white">CI/CD:</span> Bitbucket Pipelines • Docker • ArgoCD</p>
                <p><span className="text-white">Kubernetes:</span> Deployments • Services • Ingress (LB)</p>
                <p><span className="text-white">Routing:</span> Host & Path-based</p>
                <p><span className="text-white">Databases:</span> Helm (StatefulSets + Services)</p>
                <p><span className="text-white">Observability:</span> Grafana Monitoring • New Relic Alerts</p>
              </div>
            </div>
          </div>

          {/* STEP 2 (FLIPPED) */}
          <div className="flex items-center justify-between mb-20">

            {/* LEFT SIDE → TEXT */}
            <div className="w-1/2 pr-20 text-left">
              <h3 className="text-xl font-semibold">Tech Stack</h3>

              <div className="text-gray-400 mt-2 space-y-1">
                <p><span className="text-white">Cloud:</span> AWS • Amazon EKS (Auto Scaling Node Groups)</p>
                <p><span className="text-white">CI:</span> Git Pipelines • Docker (Build & Push to Docker Hub)</p>
                <p><span className="text-white">CD:</span> ArgoCD (GitOps Deployment)</p>
                <p><span className="text-white">Container Registry:</span> Docker Hub</p>
                <p><span className="text-white">Orchestration:</span> Kubernetes</p>
                <p><span className="text-white">Networking:</span> Ingress • AWS Load Balancer</p>
                <p><span className="text-white">Databases:</span> Helm (StatefulSets)</p>
                <p><span className="text-white">Observability:</span> SigNoz</p>
              </div>
            </div>

            {/* CENTER DOT */}
            <div className="w-6 h-6 bg-purple-500 rounded-full z-10"></div>

            {/* RIGHT SIDE → IMAGE */}
            <div className="w-1/2 pl-20 flex justify-start">
              <div
                onMouseEnter={() => setHoveredImage("/eks.png")}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img
                  src="/eks.png"
                  className="w-[420px] rounded-xl shadow-2xl cursor-zoom-in transition duration-300 hover:scale-105"
                />
              </div>
            </div>

          </div>

          {/* STEP 3 */}
          <div className="flex items-center justify-between mb-20">
            <div className="w-1/2 pr-20 flex justify-end">
              <div
                onMouseEnter={() => setHoveredImage("/docker.png")}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img
                  src="/docker.png"
                  className="w-[420px] rounded-xl shadow-2xl cursor-zoom-in transition duration-300 hover:scale-105"
                />
              </div>
            </div>

            {/* CENTER DOT */}
            <div className="relative w-0 flex justify-center">
              <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500 rounded-full z-10"></div>
            </div>

            {/* TEXT (MATCHED STYLE) */}
            <div className="w-1/2 pl-20 text-right">
              <h3 className="text-xl font-semibold mb-4 tracking-wide">
                Tech Stack
              </h3>

              <div className="text-gray-400 mt-2 space-y-1">
                <p><span className="text-white">Cloud:</span> AWS • Azure • GCP • Hetzner (VM-based Deployment)</p>
                <p><span className="text-white">CI:</span> Git Pipelines • Docker (Image Build & Push)</p>
                <p><span className="text-white">Registry:</span> Docker Hub (Image Storage & Pull)</p>
                <p><span className="text-white">Runtime:</span> Docker Compose (Multi-container Orchestration)</p>
                <p><span className="text-white">Containers:</span> Web • API • Worker Services</p>
                <p><span className="text-white">Databases:</span> Docker Compose (PostgreSQL • Redis • MongoDB)</p>
                <p><span className="text-white">Storage:</span> Docker Volumes (Persistent Data)</p>
                <p><span className="text-white">Observability:</span> SigNoz (Metrics • Traces • Logs)</p>
              </div>
            </div>
          </div>

          

        </div>

        {/* 🔥 SMOOTH HOVER ZOOM */}
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-all duration-300 ${
            hoveredImage ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300"></div>

          {/* Image */}
          {hoveredImage && (
            <img
              src={hoveredImage}
              className="relative w-[95vw] max-h-[95vh] object-contain rounded-xl shadow-2xl animate-zoomIn"
            />
          )}
        </div>

      </div>
    );
  }
  function Project2() { 
    const [hoveredImage, setHoveredImage] = useState(null);
    const navigate = useNavigate();

    return (
      <div className="min-h-screen bg-black text-white py-20 px-6">
        
        {/* ✅ BACK BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="fixed top-6 left-6 z-50 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white p-3 rounded-full shadow-lg transition duration-300 hover:scale-110"
        >
          ←
        </button>

        <h1 className="text-4xl font-bold text-center mb-20">
          Dating Apps/Website Architecture
        </h1>

        <div className="relative max-w-4xl mx-auto">

          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 w-[2px] h-full bg-gray-700 transform -translate-x-1/2"></div>

          

          {/* STEP 2 (FLIPPED) */}
          <div className="flex items-center justify-between mb-20">

            {/* LEFT SIDE → TEXT */}
            <div className="w-1/2 pr-20 text-left">
              <h3 className="text-xl font-semibold">Tech Stack</h3>

              <div className="text-gray-400 mt-2 space-y-1">
                <p><span className="text-white">Cloud:</span> AWS • Amazon EKS (Auto Scaling Node Groups)</p>
                <p><span className="text-white">CI:</span> Git Pipelines • Docker (Build & Push to Docker Hub)</p>
                <p><span className="text-white">CD:</span> ArgoCD (GitOps Deployment)</p>
                <p><span className="text-white">Container Registry:</span> Docker Hub</p>
                <p><span className="text-white">Orchestration:</span> Kubernetes</p>
                <p><span className="text-white">Networking:</span> Ingress • AWS Load Balancer</p>
                <p><span className="text-white">Databases:</span> Helm (StatefulSets)</p>
                <p><span className="text-white">Observability:</span> SigNoz</p>
              </div>
            </div>

            {/* CENTER DOT */}
            <div className="w-6 h-6 bg-purple-500 rounded-full z-10"></div>

            {/* RIGHT SIDE → IMAGE */}
            <div className="w-1/2 pl-20 flex justify-start">
              <div
                onMouseEnter={() => setHoveredImage("/eks.png")}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img
                  src="/eks.png"
                  className="w-[420px] rounded-xl shadow-2xl cursor-zoom-in transition duration-300 hover:scale-105"
                />
              </div>
            </div>

          </div>

          {/* STEP 3 */}
          <div className="flex items-center justify-between mb-20">
            <div className="w-1/2 pr-20 flex justify-end">
              <div
                onMouseEnter={() => setHoveredImage("/docker.png")}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img
                  src="/docker.png"
                  className="w-[420px] rounded-xl shadow-2xl cursor-zoom-in transition duration-300 hover:scale-105"
                />
              </div>
            </div>

            {/* CENTER DOT */}
            <div className="relative w-0 flex justify-center">
              <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500 rounded-full z-10"></div>
            </div>

            {/* TEXT (MATCHED STYLE) */}
            <div className="w-1/2 pl-20 text-right">
              <h3 className="text-xl font-semibold mb-4 tracking-wide">
                Tech Stack
              </h3>

              <div className="text-gray-400 mt-2 space-y-1">
                <p><span className="text-white">Cloud:</span> AWS • Azure • GCP • Hetzner (VM-based Deployment)</p>
                <p><span className="text-white">CI:</span> Git Pipelines • Docker (Image Build & Push)</p>
                <p><span className="text-white">Registry:</span> Docker Hub (Image Storage & Pull)</p>
                <p><span className="text-white">Runtime:</span> Docker Compose (Multi-container Orchestration)</p>
                <p><span className="text-white">Containers:</span> Web • API • Worker Services</p>
                <p><span className="text-white">Databases:</span> Docker Compose (PostgreSQL • Redis • MongoDB)</p>
                <p><span className="text-white">Storage:</span> Docker Volumes (Persistent Data)</p>
                <p><span className="text-white">Observability:</span> SigNoz (Metrics • Traces • Logs)</p>
              </div>
            </div>
          </div>

          

        </div>

        {/* 🔥 SMOOTH HOVER ZOOM */}
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-all duration-300 ${
            hoveredImage ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300"></div>

          {/* Image */}
          {hoveredImage && (
            <img
              src={hoveredImage}
              className="relative w-[95vw] max-h-[95vh] object-contain rounded-xl shadow-2xl animate-zoomIn"
            />
          )}
        </div>

      </div>
    );
  }
  function Project3() { 
    const [hoveredImage, setHoveredImage] = useState(null);
    const navigate = useNavigate();

    return (
      <div className="min-h-screen bg-black text-white py-20 px-6">
        
        {/* ✅ BACK BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="fixed top-6 left-6 z-50 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white p-3 rounded-full shadow-lg transition duration-300 hover:scale-110"
        >
          ←
        </button>

        <h1 className="text-4xl font-bold text-center mb-20">
          Super Apps/Website Architecture
        </h1>

        <div className="relative max-w-4xl mx-auto">

          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 w-[2px] h-full bg-gray-700 transform -translate-x-1/2"></div>

          

          {/* STEP 2 (FLIPPED) */}
          <div className="flex items-center justify-between mb-20">

            {/* LEFT SIDE → TEXT */}
            <div className="w-1/2 pr-20 text-left">
              <h3 className="text-xl font-semibold">Tech Stack</h3>

              <div className="text-gray-400 mt-2 space-y-1">
                <p><span className="text-white">Cloud:</span> Hetzner Cloud • VM-based Infrastructure</p>
                <p><span className="text-white">Cluster:</span> Kubernetes (kubeadm - Self-managed)</p>
                <p><span className="text-white">CI:</span> Git Pipelines • Docker (Build & Push to Docker Hub)</p>
                <p><span className="text-white">CD:</span> ArgoCD (GitOps Deployment)</p>
                <p><span className="text-white">Container Registry:</span> Docker Hub (Image Pull in Deployments)</p>
                <p><span className="text-white">Orchestration:</span> Kubernetes (Deployments • Services • Pods)</p>
                <p><span className="text-white">Networking:</span> Ingress • Domain-based Routing</p>
                <p><span className="text-white">Databases:</span> Deployed via Helm (StatefulSets + Services)</p>
                <p><span className="text-white">Observability:</span> SigNoz (Metrics • Traces • Logs)</p>
              </div>
            </div>

            {/* CENTER DOT */}
            <div className="w-6 h-6 bg-purple-500 rounded-full z-10"></div>

            {/* RIGHT SIDE → IMAGE */}
            <div className="w-1/2 pl-20 flex justify-start">
              <div
                onMouseEnter={() => setHoveredImage("/hetzner-k8s.png")}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img
                  src="/hetzner-k8s.png"
                  className="w-[420px] rounded-xl shadow-2xl cursor-zoom-in transition duration-300 hover:scale-105"
                />
              </div>
            </div>

          </div>

          {/* STEP 3 */}
          <div className="flex items-center justify-between mb-20">
            <div className="w-1/2 pr-20 flex justify-end">
              <div
                onMouseEnter={() => setHoveredImage("/docker.png")}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img
                  src="/hetzner-k8s.png"
                  className="w-[420px] rounded-xl shadow-2xl cursor-zoom-in transition duration-300 hover:scale-105"
                />
              </div>
            </div>

            {/* CENTER DOT */}
            <div className="relative w-0 flex justify-center">
              <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500 rounded-full z-10"></div>
            </div>

            {/* TEXT (MATCHED STYLE) */}
            <div className="w-1/2 pl-20 text-right">
              <h3 className="text-xl font-semibold mb-4 tracking-wide">
                Tech Stack
              </h3>

              <div className="text-gray-400 mt-2 space-y-1">
                <p><span className="text-white">Cloud:</span> AWS • Azure • GCP • Hetzner (VM-based Deployment)</p>
                <p><span className="text-white">CI:</span> Git Pipelines • Docker (Image Build & Push)</p>
                <p><span className="text-white">Registry:</span> Docker Hub (Image Storage & Pull)</p>
                <p><span className="text-white">Runtime:</span> Docker Compose (Multi-container Orchestration)</p>
                <p><span className="text-white">Containers:</span> Web • API • Worker Services</p>
                <p><span className="text-white">Databases:</span> Docker Compose (PostgreSQL • Redis • MongoDB)</p>
                <p><span className="text-white">Storage:</span> Docker Volumes (Persistent Data)</p>
                <p><span className="text-white">Observability:</span> SigNoz (Metrics • Traces • Logs)</p>
              </div>
            </div>
          </div>

          

        </div>

        {/* 🔥 SMOOTH HOVER ZOOM */}
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-all duration-300 ${
            hoveredImage ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300"></div>

          {/* Image */}
          {hoveredImage && (
            <img
              src={hoveredImage}
              className="relative w-[95vw] max-h-[95vh] object-contain rounded-xl shadow-2xl animate-zoomIn"
            />
          )}
        </div>

      </div>
    );
  }
  function Project4() { 
    const [hoveredImage, setHoveredImage] = useState(null);
    const navigate = useNavigate();

    return (
      <div className="min-h-screen bg-black text-white py-20 px-6">
        
        {/* ✅ BACK BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="fixed top-6 left-6 z-50 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white p-3 rounded-full shadow-lg transition duration-300 hover:scale-110"
        >
          ←
        </button>

        <h1 className="text-4xl font-bold text-center mb-20">
          Ride-sharing apps Architecture
        </h1>

        <div className="relative max-w-4xl mx-auto">

          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 w-[2px] h-full bg-gray-700 transform -translate-x-1/2"></div>

          

          {/* STEP 2 (FLIPPED) */}
          <div className="flex items-center justify-between mb-20">

            {/* LEFT SIDE → TEXT */}
            <div className="w-1/2 pr-20 text-left">
              <h3 className="text-xl font-semibold">Tech Stack</h3>

              <div className="text-gray-400 mt-2 space-y-1">
                <p><span className="text-white">Cloud:</span> Hetzner Cloud • VM-based Infrastructure</p>
                <p><span className="text-white">Cluster:</span> Kubernetes (kubeadm - Self-managed)</p>
                <p><span className="text-white">CI:</span> Git Pipelines • Docker (Build & Push to Docker Hub)</p>
                <p><span className="text-white">CD:</span> ArgoCD (GitOps Deployment)</p>
                <p><span className="text-white">Container Registry:</span> Docker Hub (Image Pull in Deployments)</p>
                <p><span className="text-white">Orchestration:</span> Kubernetes (Deployments • Services • Pods)</p>
                <p><span className="text-white">Networking:</span> Ingress • Domain-based Routing</p>
                <p><span className="text-white">Databases:</span> Deployed via Helm (StatefulSets + Services)</p>
                <p><span className="text-white">Observability:</span> SigNoz (Metrics • Traces • Logs)</p>
              </div>
            </div>

            {/* CENTER DOT */}
            <div className="w-6 h-6 bg-purple-500 rounded-full z-10"></div>

            {/* RIGHT SIDE → IMAGE */}
            <div className="w-1/2 pl-20 flex justify-start">
              <div
                onMouseEnter={() => setHoveredImage("/hetzner-k8s.png")}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img
                  src="/hetzner-k8s.png"
                  className="w-[420px] rounded-xl shadow-2xl cursor-zoom-in transition duration-300 hover:scale-105"
                />
              </div>
            </div>

          </div>

          {/* STEP 3 */}
          <div className="flex items-center justify-between mb-20">
            <div className="w-1/2 pr-20 flex justify-end">
              <div
                onMouseEnter={() => setHoveredImage("/docker.png")}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img
                  src="/hetzner-k8s.png"
                  className="w-[420px] rounded-xl shadow-2xl cursor-zoom-in transition duration-300 hover:scale-105"
                />
              </div>
            </div>

            {/* CENTER DOT */}
            <div className="relative w-0 flex justify-center">
              <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500 rounded-full z-10"></div>
            </div>

            {/* TEXT (MATCHED STYLE) */}
            <div className="w-1/2 pl-20 text-right">
              <h3 className="text-xl font-semibold mb-4 tracking-wide">
                Tech Stack
              </h3>

              <div className="text-gray-400 mt-2 space-y-1">
                <p><span className="text-white">Cloud:</span> AWS • Azure • GCP • Hetzner (VM-based Deployment)</p>
                <p><span className="text-white">CI:</span> Git Pipelines • Docker (Image Build & Push)</p>
                <p><span className="text-white">Registry:</span> Docker Hub (Image Storage & Pull)</p>
                <p><span className="text-white">Runtime:</span> Docker Compose (Multi-container Orchestration)</p>
                <p><span className="text-white">Containers:</span> Web • API • Worker Services</p>
                <p><span className="text-white">Databases:</span> Docker Compose (PostgreSQL • Redis • MongoDB)</p>
                <p><span className="text-white">Storage:</span> Docker Volumes (Persistent Data)</p>
                <p><span className="text-white">Observability:</span> SigNoz (Metrics • Traces • Logs)</p>
              </div>
            </div>
          </div>

          

        </div>

        {/* 🔥 SMOOTH HOVER ZOOM */}
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-all duration-300 ${
            hoveredImage ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300"></div>

          {/* Image */}
          {hoveredImage && (
            <img
              src={hoveredImage}
              className="relative w-[95vw] max-h-[95vh] object-contain rounded-xl shadow-2xl animate-zoomIn"
            />
          )}
        </div>

      </div>
    );
  }

  function Blog1() {
    const navigate = useNavigate();

    return (
      <div className="min-h-screen bg-black text-white px-6 py-20">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="fixed top-6 left-6 z-50 bg-[#1a1a1a] hover:bg-[#2a2a2a] p-3 rounded-full"
        >
          ←
        </button>

        <div className="max-w-3xl mx-auto">

          <h1 className="text-5xl font-bold mb-6">
            Deployment Philosophy
          </h1>

          <p className="text-gray-400 leading-relaxed">
            Building reliable systems is not just about tools — it's about mindset.
            Systems should be scalable, observable, and resilient by design.
          </p>

        </div>
      </div>
    );
  }
  /* ✅ ROUTER WRAPPER */
  export default function App() {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project1" element={<Project1 />} />
        <Route path="/project2" element={<Project2 />} />  
        <Route path="/project3" element={<Project3 />} />  
        <Route path="/blog1" element={<Blog1 />} />



      </Routes>
    );
  }