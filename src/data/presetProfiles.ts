import { ResumeData } from "@/types/resume";

export interface PresetProfile {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  data: ResumeData;
}

export const PRESET_PROFILES: PresetProfile[] = [
  {
    id: "fullstack",
    title: "Full Stack Engineer",
    category: "Software & Web",
    icon: "💻",
    description: "Next.js, TypeScript, Node.js, AWS microservices experience.",
    data: {
      personalInfo: {
        fullName: "Alex Morgan",
        jobTitle: "Senior Full Stack Software Engineer",
        email: "alex.morgan@example.com",
        phone: "+1 (555) 234-5678",
        location: "San Francisco, CA",
        website: "https://alexmorgan.dev",
        linkedin: "https://linkedin.com/in/alexmorgan",
        github: "https://github.com/alexmorgan",
        avatarUrl: "",
        summary:
          "Results-driven Software Engineer with 6+ years of experience building scalable, high-performance web applications and cloud architectures. Proven track record of spearheading microservices migration, optimizing frontend performance by 45%, and mentoring cross-functional teams in modern DevOps & agile workflows.",
      },
      experiences: [
        {
          id: "exp-1",
          company: "Apex Cloud Solutions",
          position: "Senior Full Stack Engineer",
          location: "San Francisco, CA",
          startDate: "2022-03",
          endDate: "Present",
          current: true,
          bulletPoints: [
            "Architected and deployed a multi-tenant SaaS dashboard serving 120,000+ daily active users using Next.js, Node.js, and AWS ECS.",
            "Engineered real-time data streaming pipelines with Apache Kafka and Redis, reducing latency by 40% across 5 core enterprise services.",
            "Championed automated CI/CD deployment pipelines on GitHub Actions, cutting release deployment cycles from 45 minutes to under 8 minutes.",
            "Mentored 6 junior/mid-level engineers through code reviews, design docs, and pair programming sessions.",
          ],
        },
        {
          id: "exp-2",
          company: "Nexus Labs",
          position: "Full Stack Software Developer",
          location: "Austin, TX",
          startDate: "2019-06",
          endDate: "2022-02",
          current: false,
          bulletPoints: [
            "Developed end-to-end e-commerce features with React, TypeScript, and GraphQL, contributing to a 28% uplift in checkout conversion rates.",
            "Integrated secure Stripe & PayPal payment gateways with webhook idempotency and automated fraud detection filters.",
            "Spearheaded database query optimization on PostgreSQL, decreasing heavy analytics query response times from 3.2s to 450ms.",
          ],
        },
      ],
      educations: [
        {
          id: "edu-1",
          institution: "University of California, Berkeley",
          degree: "Bachelor of Science",
          fieldOfStudy: "Computer Science",
          startDate: "2015-09",
          endDate: "2019-05",
          current: false,
          gpaOrHonors: "3.85 GPA • Magna Cum Laude",
          description: "Focus on Distributed Systems, Cloud Architecture, and Algorithms.",
        },
      ],
      skillCategories: [
        {
          id: "cat-1",
          name: "Languages & Core",
          skills: ["TypeScript", "JavaScript (ES6+)", "Python", "Go", "SQL", "HTML5/CSS3"],
        },
        {
          id: "cat-2",
          name: "Frameworks & Libraries",
          skills: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS", "GraphQL", "Redux/Zustand"],
        },
        {
          id: "cat-3",
          name: "Cloud & DevOps",
          skills: ["AWS (S3, ECS, Lambda)", "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "Redis", "Git", "CI/CD"],
        },
      ],
      projects: [
        {
          id: "proj-1",
          name: "CloudMetrics Monitoring Platform",
          description: "Open-source observability tool providing live CPU, memory, and API metrics with automated alert webhooks.",
          technologies: ["Next.js", "TypeScript", "Go", "ClickHouse", "Tailwind CSS"],
          liveUrl: "https://cloudmetrics.dev",
          githubUrl: "https://github.com/alexmorgan/cloudmetrics",
          startDate: "2023-01",
          endDate: "2023-08",
        },
      ],
      certifications: [
        {
          id: "cert-1",
          name: "AWS Certified Solutions Architect – Associate",
          issuer: "Amazon Web Services (AWS)",
          date: "2023-07",
        },
      ],
      customSections: [],
      styling: {
        template: "modern",
        primaryColor: "#2563eb",
        fontFamily: "sans",
        fontSize: "normal",
        lineSpacing: "normal",
        sectionSpacing: "normal",
      },
    },
  },
  {
    id: "ai-data",
    title: "AI / Data Science Engineer",
    category: "AI & Analytics",
    icon: "🤖",
    description: "PyTorch, LLMs, Machine Learning pipelines, NLP and Big Data.",
    data: {
      personalInfo: {
        fullName: "Dr. Elena Rostova",
        jobTitle: "Senior Machine Learning & AI Engineer",
        email: "elena.rostova@example.com",
        phone: "+1 (555) 891-2345",
        location: "Seattle, WA",
        website: "https://elenarostova.ai",
        linkedin: "https://linkedin.com/in/elena-rostova",
        github: "https://github.com/elena-ai",
        avatarUrl: "",
        summary:
          "AI / Machine Learning Specialist with 5+ years of experience training and fine-tuning Large Language Models, computer vision models, and production RAG pipelines. Published researcher in deep learning architectures with demonstrated impact delivering scalable inference APIs on GPU clusters.",
      },
      experiences: [
        {
          id: "exp-1",
          company: "CognitiveAI Systems",
          position: "Lead Machine Learning Engineer",
          location: "Seattle, WA",
          startDate: "2022-01",
          endDate: "Present",
          current: true,
          bulletPoints: [
            "Built and fine-tuned domain-specific LLMs (Llama 3, Mistral) using LoRA and QLoRA, improving task-specific accuracy by 34%.",
            "Architected low-latency vector search pipeline leveraging Pinecone, LangChain, and FastAPI, handling 15M+ embeddings daily.",
            "Optimized GPU inference costs by 48% via vLLM batching, TensorRT-LLM quantization, and Triton Inference Server.",
          ],
        },
        {
          id: "exp-2",
          company: "DataVantage Analytics",
          position: "Data Scientist",
          location: "Boston, MA",
          startDate: "2019-08",
          endDate: "2021-12",
          current: false,
          bulletPoints: [
            "Developed customer churn prediction model with XGBoost and Scikit-Learn, generating $1.2M in annual retention revenue.",
            "Constructed automated ETL pipelines in Apache Airflow and Snowflake, processing 2TB of raw telemetry data daily.",
          ],
        },
      ],
      educations: [
        {
          id: "edu-1",
          institution: "Massachusetts Institute of Technology (MIT)",
          degree: "Master of Science",
          fieldOfStudy: "Artificial Intelligence & Data Science",
          startDate: "2017-09",
          endDate: "2019-06",
          current: false,
          gpaOrHonors: "3.95 GPA • Graduate Research Fellow",
          description: "Thesis: High-Throughput Transformer Attention Mechanisms for Distributed Training.",
        },
      ],
      skillCategories: [
        {
          id: "cat-1",
          name: "Machine Learning & AI",
          skills: ["PyTorch", "TensorFlow", "Hugging Face", "LangChain", "LlamaIndex", "Scikit-Learn", "OpenCV"],
        },
        {
          id: "cat-2",
          name: "Languages & Tools",
          skills: ["Python", "C++", "SQL", "FastAPI", "Docker", "Kubernetes", "CUDA", "Git"],
        },
        {
          id: "cat-3",
          name: "Big Data & Vector DBs",
          skills: ["Pinecone", "Milvus", "Snowflake", "Apache Spark", "Airflow", "MLflow", "PostgreSQL"],
        },
      ],
      projects: [
        {
          id: "proj-1",
          name: "NeuroChat RAG Engine",
          description: "Enterprise multi-agent conversational AI system with semantic caching and hybrid sparse/dense retrieval.",
          technologies: ["Python", "PyTorch", "FastAPI", "Pinecone", "LangChain"],
          liveUrl: "https://neurochat.demo",
          githubUrl: "https://github.com/elena-ai/neurochat",
          startDate: "2023-04",
          endDate: "2023-11",
        },
      ],
      certifications: [
        {
          id: "cert-1",
          name: "TensorFlow Certified Developer",
          issuer: "Google",
          date: "2022-04",
        },
      ],
      customSections: [],
      styling: {
        template: "tech",
        primaryColor: "#4f46e5",
        fontFamily: "mono",
        fontSize: "normal",
        lineSpacing: "normal",
        sectionSpacing: "normal",
      },
    },
  },
  {
    id: "uiux-designer",
    title: "UI/UX & Product Designer",
    category: "Design & Product",
    icon: "🎨",
    description: "Figma design systems, user research, wireframing, and interactive prototyping.",
    data: {
      personalInfo: {
        fullName: "Sarah Jenkins",
        jobTitle: "Senior Product Designer (UI/UX)",
        email: "sarah.jenkins@design.io",
        phone: "+1 (555) 723-9012",
        location: "New York, NY",
        website: "https://sarahjenkins.design",
        linkedin: "https://linkedin.com/in/sarahjenkins-design",
        github: "",
        avatarUrl: "",
        summary:
          "Empathetic, data-informed Product Designer with 6+ years designing accessible, high-conversion web & mobile products. Experienced in building comprehensive design systems, leading end-to-end UX research sprints, and collaborating closely with engineering teams.",
      },
      experiences: [
        {
          id: "exp-1",
          company: "FinFlow Technologies",
          position: "Lead Product Designer",
          location: "New York, NY",
          startDate: "2021-09",
          endDate: "Present",
          current: true,
          bulletPoints: [
            "Redesigned the core mobile banking app (iOS/Android), increasing 30-day user retention by 22% and App Store rating from 3.8 to 4.7.",
            "Created unified Figma design system with 250+ accessible components, decreasing design-to-engineering handoff friction by 40%.",
            "Conducted 50+ qualitative user testing sessions and usability audits to optimize checkout funnel conversion.",
          ],
        },
        {
          id: "exp-2",
          company: "Studio Craft Digital",
          position: "UI/UX Designer",
          location: "Brooklyn, NY",
          startDate: "2018-05",
          endDate: "2021-08",
          current: false,
          bulletPoints: [
            "Delivered comprehensive wireframes, user personas, and high-fidelity prototypes for 12+ SaaS clients.",
            "Facilitated design sprint workshops with client stakeholders to align product strategy and KPI milestones.",
          ],
        },
      ],
      educations: [
        {
          id: "edu-1",
          institution: "Rhode Island School of Design (RISD)",
          degree: "Bachelor of Fine Arts",
          fieldOfStudy: "Graphic & Interactive Design",
          startDate: "2014-09",
          endDate: "2018-05",
          current: false,
          gpaOrHonors: "3.9 GPA • Dean's List",
        },
      ],
      skillCategories: [
        {
          id: "cat-1",
          name: "Design & Prototyping",
          skills: ["Figma", "Design Systems", "Wireframing", "Interactive Prototyping", "Information Architecture", "Mobile App UI"],
        },
        {
          id: "cat-2",
          name: "Research & Strategy",
          skills: ["User Interviews", "Usability Testing", "A/B Testing", "Journey Mapping", "WCAG 2.1 Accessibility", "Design Sprints"],
        },
      ],
      projects: [
        {
          id: "proj-1",
          name: "Pulse Mobile Banking Experience",
          description: "Zero-friction financial tracking application built around micro-savings and automated budget categorization.",
          technologies: ["Figma", "Protopie", "User Research", "Design Systems"],
          liveUrl: "https://sarahjenkins.design/pulse",
          startDate: "2023-02",
          endDate: "2023-09",
        },
      ],
      certifications: [
        {
          id: "cert-1",
          name: "Nielsen Norman Group UX Master Certified",
          issuer: "NN/g",
          date: "2022-03",
        },
      ],
      customSections: [],
      styling: {
        template: "minimalist",
        primaryColor: "#059669",
        fontFamily: "poppins",
        fontSize: "normal",
        lineSpacing: "normal",
        sectionSpacing: "normal",
      },
    },
  },
  {
    id: "fresh-grad",
    title: "Fresh Graduate / Junior Engineer",
    category: "Entry Level & Student",
    icon: "🎓",
    description: "Education, academic capstone projects, coding competitions and internships.",
    data: {
      personalInfo: {
        fullName: "David Chen",
        jobTitle: "Junior Software Engineer / CS Graduate",
        email: "david.chen@cs.university.edu",
        phone: "+1 (555) 432-1098",
        location: "Chicago, IL",
        website: "https://davidchen.dev",
        linkedin: "https://linkedin.com/in/davidchen-cs",
        github: "https://github.com/davidchen-dev",
        avatarUrl: "",
        summary:
          "Recent Computer Science graduate with strong foundation in object-oriented programming, data structures, and web technologies. Passionate about writing clean, maintainable code with experience gained through internship delivery and competitive programming hackathons.",
      },
      experiences: [
        {
          id: "exp-1",
          company: "InnovateTech Labs",
          position: "Software Engineering Intern",
          location: "Chicago, IL",
          startDate: "2023-06",
          endDate: "2023-09",
          current: false,
          bulletPoints: [
            "Built responsive React components and integrated REST endpoints for client-facing analytics portal.",
            "Wrote comprehensive unit tests using Jest, raising codebase test coverage from 60% to 82%.",
            "Participated in daily agile standups, sprint reviews, and Git code reviews with senior engineering mentors.",
          ],
        },
      ],
      educations: [
        {
          id: "edu-1",
          institution: "University of Illinois Urbana-Champaign",
          degree: "Bachelor of Science",
          fieldOfStudy: "Computer Science",
          startDate: "2020-09",
          endDate: "2024-05",
          current: false,
          gpaOrHonors: "3.92 GPA • Summa Cum Laude • ACM President",
          description: "Relevant Coursework: Data Structures, Algorithms, Operating Systems, Database Systems, Computer Networks.",
        },
      ],
      skillCategories: [
        {
          id: "cat-1",
          name: "Programming Languages",
          skills: ["Java", "Python", "C++", "JavaScript", "TypeScript", "SQL"],
        },
        {
          id: "cat-2",
          name: "Frameworks & Web",
          skills: ["React", "Node.js", "Express", "Tailwind CSS", "HTML5/CSS3", "Next.js"],
        },
        {
          id: "cat-3",
          name: "Developer Tools",
          skills: ["Git", "GitHub", "Linux/Unix", "PostgreSQL", "Docker", "VS Code"],
        },
      ],
      projects: [
        {
          id: "proj-1",
          name: "AlgoVisualizer — Interactive Algorithm Animator",
          description: "Web application that visualizes sorting (QuickSort, MergeSort) and graph pathfinding (Dijkstra, A*) in real-time.",
          technologies: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
          liveUrl: "https://algovisualizer.dev",
          githubUrl: "https://github.com/davidchen-dev/algovisualizer",
          startDate: "2023-10",
          endDate: "2024-01",
        },
        {
          id: "proj-2",
          name: "PeerTutor — Campus Tutoring Platform",
          description: "Full-stack university scheduling system with student authentication, calendar booking, and rating reviews.",
          technologies: ["Node.js", "Express", "PostgreSQL", "React"],
          githubUrl: "https://github.com/davidchen-dev/peertutor",
          startDate: "2023-02",
          endDate: "2023-05",
        },
      ],
      certifications: [
        {
          id: "cert-1",
          name: "Meta Front-End Developer Specialization",
          issuer: "Coursera / Meta",
          date: "2023-11",
        },
      ],
      customSections: [
        {
          id: "cust-1",
          heading: "Honors & Achievements",
          items: [
            {
              id: "h-1",
              title: "1st Place Winner — Midwest Hackathon 2023",
              subtitle: "Out of 85+ university teams",
              description: "Developed AI accessibility reader extension in 36 hours.",
            },
          ],
        },
      ],
      styling: {
        template: "classic",
        primaryColor: "#0f172a",
        fontFamily: "serif",
        fontSize: "normal",
        lineSpacing: "normal",
        sectionSpacing: "normal",
      },
    },
  },
];
