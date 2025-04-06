import React, { useState } from 'react';

const Pathways = () => {
  const [activeTab, setActiveTab] = useState('data-science');
  
  const careerPaths = {
    'data-science': {
      title: 'Data Scientist',
      description: 'Data Scientists analyze and interpret complex data to help organizations make better decisions.',
      pathways: [
        {
          stage: 'Education Foundation',
          description: 'Obtain a bachelor\'s degree in a relevant field',
          details: 'Computer Science, Statistics, Mathematics, Engineering, or related quantitative field',
          timeframe: '3-4 years'
        },
        {
          stage: 'Technical Skill Development',
          description: 'Build core technical skills through courses or self-learning',
          details: 'Focus on programming, statistics, and data manipulation basics',
          timeframe: '6-12 months'
        },
        {
          stage: 'Initial Experience',
          description: 'Gain entry-level experience as a Data Analyst or similar role',
          details: 'Apply basic data skills in real-world scenarios, build your portfolio',
          timeframe: '1-2 years'
        },
        {
          stage: 'Advanced Education (Optional)',
          description: 'Consider pursuing a Master\'s or PhD for deeper expertise',
          details: 'Data Science, Machine Learning, Statistics, or related field',
          timeframe: '1-5 years'
        },
        {
          stage: 'Specialized Skills Development',
          description: 'Build expertise in machine learning and advanced analytics',
          details: 'Focus on model development, deployment, and specialized techniques',
          timeframe: '1-2 years'
        },
        {
          stage: 'Data Scientist Role',
          description: 'Work as a full Data Scientist applying advanced techniques',
          details: 'Develop models, extract insights, and drive decision-making',
          timeframe: '2+ years'
        },
        {
          stage: 'Senior/Lead Data Scientist',
          description: 'Lead projects and teams in solving complex data problems',
          details: 'Manage technical direction, mentor junior data scientists',
          timeframe: '3+ years of data science experience'
        }
      ],
      skills: [
        {
          category: 'Programming',
          items: ['Python', 'R', 'SQL', 'Spark', 'Git/Version Control']
        },
        {
          category: 'Mathematics & Statistics',
          items: ['Linear Algebra', 'Calculus', 'Probability', 'Statistical Modeling', 'Experimental Design']
        },
        {
          category: 'Machine Learning',
          items: ['Supervised Learning', 'Unsupervised Learning', 'Deep Learning', 'NLP', 'Model Evaluation']
        },
        {
          category: 'Data Tools',
          items: ['Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow/PyTorch', 'Tableau/PowerBI']
        },
        {
          category: 'Soft Skills',
          items: ['Communication', 'Business Acumen', 'Problem-solving', 'Storytelling', 'Domain Expertise']
        }
      ],
      curriculum: [
        {
          phase: 'Foundation',
          courses: [
            'Introduction to Programming with Python',
            'Statistics and Probability',
            'Linear Algebra for Data Science',
            'Database Systems and SQL',
            'Data Analysis and Visualization'
          ]
        },
        {
          phase: 'Intermediate',
          courses: [
            'Machine Learning Fundamentals',
            'Data Preprocessing and Feature Engineering',
            'Advanced Statistical Methods',
            'Big Data Processing (Spark, Hadoop)',
            'Time Series Analysis'
          ]
        },
        {
          phase: 'Advanced',
          courses: [
            'Deep Learning and Neural Networks',
            'Natural Language Processing',
            'Computer Vision',
            'MLOps and Model Deployment',
            'Ethics in AI and Data Science'
          ]
        },
        {
          phase: 'Specialization (Select One)',
          courses: [
            'Financial Data Science',
            'Healthcare Analytics',
            'Marketing and Customer Analytics',
            'Geospatial Data Analysis',
            'Recommender Systems'
          ]
        }
      ]
    },
    'cyber-security': {
      title: 'Cybersecurity Specialist',
      description: 'Cybersecurity Specialists protect organizational data and systems from cyber threats and attacks.',
      pathways: [
        {
          stage: 'Education Foundation',
          description: 'Obtain a bachelor\'s degree in a relevant field',
          details: 'Computer Science, IT Security, Network Engineering, or related technical field',
          timeframe: '3-4 years'
        },
        {
          stage: 'Basic Certifications',
          description: 'Earn foundational security certifications',
          details: 'CompTIA Security+, Network+, or similar entry-level certifications',
          timeframe: '3-6 months'
        },
        {
          stage: 'Entry-Level Position',
          description: 'Start in IT support, network administration, or junior security role',
          details: 'Gain practical experience with systems, networks, and security tools',
          timeframe: '1-2 years'
        },
        {
          stage: 'Specialized Security Role',
          description: 'Move into dedicated security position',
          details: 'Security analyst, SOC analyst, or security administrator',
          timeframe: '2-3 years'
        },
        {
          stage: 'Advanced Certifications',
          description: 'Earn respected industry certifications',
          details: 'CISSP, CEH, CISM, or specialty certifications in your focus area',
          timeframe: '1-2 years'
        },
        {
          stage: 'Security Engineer/Specialist',
          description: 'Work as a full cybersecurity professional with specialized expertise',
          details: 'Design and implement security solutions, conduct assessments, respond to incidents',
          timeframe: '2-3 years'
        },
        {
          stage: 'Senior Security Position',
          description: 'Progress to senior or leadership role',
          details: 'Security architect, CISO, lead security engineer, or consultant',
          timeframe: '3+ years security experience'
        }
      ],
      skills: [
        {
          category: 'Technical Foundations',
          items: ['Networking', 'Operating Systems', 'System Administration', 'Cloud Computing', 'Virtualization']
        },
        {
          category: 'Security Fundamentals',
          items: ['Security Frameworks', 'Risk Assessment', 'Access Control', 'Cryptography', 'Security Architecture']
        },
        {
          category: 'Defensive Security',
          items: ['Firewalls', 'IDS/IPS', 'SIEM', 'Endpoint Protection', 'Vulnerability Management']
        },
        {
          category: 'Offensive Security',
          items: ['Penetration Testing', 'Social Engineering', 'Threat Hunting', 'Malware Analysis', 'Digital Forensics']
        },
        {
          category: 'Soft Skills',
          items: ['Communication', 'Critical Thinking', 'Problem-solving', 'Documentation', 'Continuous Learning']
        }
      ],
      curriculum: [
        {
          phase: 'Foundation',
          courses: [
            'Computer Networks Fundamentals',
            'Operating System Security',
            'Introduction to Cybersecurity',
            'Basic Cryptography',
            'Security Policies and Compliance'
          ]
        },
        {
          phase: 'Intermediate',
          courses: [
            'Network Security and Defense',
            'Web Application Security',
            'Security Information and Event Management',
            'Incident Response',
            'Risk Assessment and Management'
          ]
        },
        {
          phase: 'Advanced',
          courses: [
            'Advanced Penetration Testing',
            'Cloud Security',
            'Digital Forensics',
            'Secure Software Development',
            'Advanced Threat Hunting'
          ]
        },
        {
          phase: 'Specialization (Select One)',
          courses: [
            'Critical Infrastructure Security',
            'IoT Security',
            'Mobile Security',
            'Industrial Control Systems Security',
            'Healthcare Security Compliance'
          ]
        }
      ]
    },
    'cloud-engineering': {
      title: 'Cloud Engineer',
      description: 'Cloud Engineers design, implement, and manage cloud-based solutions for organizations.',
      pathways: [
        {
          stage: 'Technical Foundation',
          description: 'Build technical IT knowledge and skills',
          details: 'Bachelor\'s degree in Computer Science or equivalent experience, plus IT/networking foundations',
          timeframe: '2-4 years'
        },
        {
          stage: 'Basic Cloud Certifications',
          description: 'Earn cloud platform fundamentals certifications',
          details: 'AWS Certified Cloud Practitioner, Azure Fundamentals, or Google Cloud Associate',
          timeframe: '3-6 months'
        },
        {
          stage: 'Entry Cloud Role',
          description: 'Work in entry-level cloud support or administration role',
          details: 'Gain hands-on experience with cloud services, deployments, and operations',
          timeframe: '1-2 years'
        },
        {
          stage: 'Advanced Cloud Certifications',
          description: 'Earn professional/specialty cloud certifications',
          details: 'AWS Solutions Architect, Azure Administrator, GCP Professional Cloud Architect',
          timeframe: '6-12 months'
        },
        {
          stage: 'Cloud Engineer Role',
          description: 'Work as a dedicated cloud engineer implementing solutions',
          details: 'Design and deploy cloud infrastructure, implement automation, manage resources',
          timeframe: '2-3 years'
        },
        {
          stage: 'DevOps/Cloud Native Skills',
          description: 'Develop expertise in cloud-native technologies and DevOps',
          details: 'Container orchestration, CI/CD, infrastructure as code, microservices',
          timeframe: '1-2 years'
        },
        {
          stage: 'Senior Cloud Role',
          description: 'Progress to senior position or specialized focus',
          details: 'Cloud architect, DevOps engineer, multi-cloud specialist, or cloud security expert',
          timeframe: '3+ years cloud experience'
        }
      ],
      skills: [
        {
          category: 'Cloud Platforms',
          items: ['AWS', 'Microsoft Azure', 'Google Cloud Platform', 'Multi-cloud Management', 'Cloud Economics']
        },
        {
          category: 'Infrastructure',
          items: ['Virtualization', 'Networking', 'Storage Solutions', 'Compute Services', 'Load Balancing']
        },
        {
          category: 'DevOps & Automation',
          items: ['Infrastructure as Code', 'CI/CD Pipelines', 'Configuration Management', 'Monitoring', 'Terraform/CloudFormation']
        },
        {
          category: 'Cloud-Native Technologies',
          items: ['Containers (Docker)', 'Kubernetes', 'Serverless', 'Microservices', 'Service Mesh']
        },
        {
          category: 'Security & Compliance',
          items: ['Identity & Access Management', 'Network Security', 'Compliance Frameworks', 'Encryption', 'Security Automation']
        }
      ],
      curriculum: [
        {
          phase: 'Foundation',
          courses: [
            'Introduction to Cloud Computing',
            'Linux Administration',
            'Networking Fundamentals',
            'Introduction to Virtualization',
            'Basic Cloud Services Overview'
          ]
        },
        {
          phase: 'Intermediate',
          courses: [
            'Cloud Platform Deep Dive (AWS/Azure/GCP)',
            'Infrastructure as Code with Terraform',
            'Cloud Architecture Patterns',
            'Containers and Docker',
            'Cloud Security Fundamentals'
          ]
        },
        {
          phase: 'Advanced',
          courses: [
            'Kubernetes and Container Orchestration',
            'DevOps Practices for Cloud',
            'Multi-cloud Strategies',
            'Serverless Architecture',
            'Cloud Cost Optimization'
          ]
        },
        {
          phase: 'Specialization (Select One)',
          courses: [
            'Cloud Security Engineering',
            'Site Reliability Engineering',
            'Cloud Data Engineering',
            'Hybrid Cloud Solutions',
            'Cloud Migration Specialist'
          ]
        }
      ]
    },
    'software-development': {
      title: 'Software Developer',
      description: 'Software Developers design, build, and maintain applications across various platforms and industries.',
      pathways: [
        {
          stage: 'Education Foundation',
          description: 'Obtain a degree or equivalent training',
          details: 'Computer Science, Software Engineering degree, coding bootcamp, or self-taught fundamentals',
          timeframe: '1-4 years'
        },
        {
          stage: 'Portfolio Building',
          description: 'Create personal projects to demonstrate skills',
          details: 'Build real applications, contribute to open source, showcase your capabilities',
          timeframe: '6-12 months'
        },
        {
          stage: 'Entry-Level Developer',
          description: 'Begin in a junior developer role',
          details: 'Focus on code quality, learning best practices, and team collaboration',
          timeframe: '1-2 years'
        },
        {
          stage: 'Mid-Level Developer',
          description: 'Take on more complex tasks with independence',
          details: 'Implement features, resolve complex bugs, contribute to architectural decisions',
          timeframe: '2-3 years'
        },
        {
          stage: 'Technical Specialization',
          description: 'Develop deeper expertise in specific domains',
          details: 'Front-end, back-end, mobile, embedded, or specialized industry domains',
          timeframe: '1-2 years'
        },
        {
          stage: 'Senior Developer',
          description: 'Lead development efforts and mentor others',
          details: 'Design solutions, make technology decisions, review code, mentor juniors',
          timeframe: '3+ years'
        },
        {
          stage: 'Technical Leadership',
          description: 'Move into architect or leadership roles',
          details: 'Lead teams, define technical direction, or specialize in architecture',
          timeframe: '5+ years development experience'
        }
      ],
      skills: [
        {
          category: 'Programming Languages',
          items: ['JavaScript/TypeScript', 'Python', 'Java', 'C#/.NET', 'Go/Rust/specialized languages']
        },
        {
          category: 'Front-End',
          items: ['HTML/CSS', 'React/Angular/Vue', 'Responsive Design', 'State Management', 'Web Performance']
        },
        {
          category: 'Back-End',
          items: ['API Development', 'Databases (SQL/NoSQL)', 'Authentication/Authorization', 'Caching', 'Microservices']
        },
        {
          category: 'Development Practices',
          items: ['Git/Version Control', 'CI/CD', 'Testing (Unit/Integration)', 'Agile Methodologies', 'Code Review']
        },
        {
          category: 'Software Architecture',
          items: ['Design Patterns', 'System Design', 'Performance Optimization', 'Scalability', 'Security Practices']
        }
      ],
      curriculum: [
        {
          phase: 'Foundation',
          courses: [
            'Programming Fundamentals',
            'Data Structures and Algorithms',
            'Database Basics',
            'Web Development Essentials',
            'Version Control with Git'
          ]
        },
        {
          phase: 'Intermediate',
          courses: [
            'Full-Stack Development',
            'API Design and Development',
            'Testing and Quality Assurance',
            'Object-Oriented Design',
            'Modern JavaScript Frameworks'
          ]
        },
        {
          phase: 'Advanced',
          courses: [
            'Software Architecture Patterns',
            'DevOps for Developers',
            'Performance Optimization',
            'Security Best Practices',
            'Scalable Application Design'
          ]
        },
        {
          phase: 'Specialization (Select One)',
          courses: [
            'Mobile Development (iOS/Android)',
            'Front-End Engineering',
            'Back-End Engineering',
            'Cloud-Native Development',
            'AI/Machine Learning Integration'
          ]
        }
      ]
    },
    'ux-design': {
      title: 'UX/UI Designer',
      description: 'UX/UI Designers create intuitive, engaging, and accessible digital experiences for users.',
      pathways: [
        {
          stage: 'Design Fundamentals',
          description: 'Build foundational design knowledge',
          details: 'Formal education in design or self-taught design principles and fundamentals',
          timeframe: '1-3 years'
        },
        {
          stage: 'UX/UI Specific Training',
          description: 'Learn specialized UX/UI skills and methodologies',
          details: 'Bootcamps, courses, or self-study in user experience and interface design',
          timeframe: '6-12 months'
        },
        {
          stage: 'Portfolio Development',
          description: 'Create case studies and design projects',
          details: 'Build comprehensive portfolio showcasing process, problem-solving, and outcomes',
          timeframe: '3-6 months'
        },
        {
          stage: 'Entry-Level Position',
          description: 'Start as a junior designer or in a related role',
          details: 'UI Designer, UX Researcher Assistant, or Product Design Intern',
          timeframe: '1-2 years'
        },
        {
          stage: 'Mid-Level Designer',
          description: 'Take on full UX/UI project responsibilities',
          details: 'Lead design components, conduct user research, create comprehensive designs',
          timeframe: '2-3 years'
        },
        {
          stage: 'Specialization',
          description: 'Develop expertise in specific areas of UX/UI',
          details: 'Research, interaction design, visual design, or industry specializations',
          timeframe: '1-2 years'
        },
        {
          stage: 'Senior UX/UI Designer',
          description: 'Lead design strategy and teams',
          details: 'Define design systems, mentor juniors, collaborate with stakeholders',
          timeframe: '3+ years design experience'
        }
      ],
      skills: [
        {
          category: 'UX Process',
          items: ['User Research', 'Personas', 'Journey Mapping', 'Information Architecture', 'Wireframing']
        },
        {
          category: 'UI Design',
          items: ['Visual Design', 'Typography', 'Color Theory', 'Layout & Composition', 'Design Systems']
        },
        {
          category: 'Tools',
          items: ['Figma/Sketch', 'Adobe Creative Suite', 'Prototyping Tools', 'User Testing Platforms', 'Collaboration Tools']
        },
        {
          category: 'Technical',
          items: ['Basic HTML/CSS', 'Responsive Design', 'Accessibility Standards', 'Design Tokens', 'Animation Principles']
        },
        {
          category: 'Soft Skills',
          items: ['Communication', 'Presentation', 'Collaboration', 'Empathy', 'Critical Thinking']
        }
      ],
      curriculum: [
        {
          phase: 'Foundation',
          courses: [
            'Design Fundamentals and Principles',
            'Introduction to UX Research',
            'Visual Design Essentials',
            'Introduction to UI Design',
            'Design Thinking Process'
          ]
        },
        {
          phase: 'Intermediate',
          courses: [
            'User Research Methods',
            'Information Architecture',
            'Interaction Design',
            'Prototyping and Usability Testing',
            'Design Systems and Component Libraries'
          ]
        },
        {
          phase: 'Advanced',
          courses: [
            'Advanced Interaction Design',
            'Data-Driven UX Design',
            'Accessibility and Inclusive Design',
            'UX Strategy and Leadership',
            'Measuring UX Success (Analytics)'
          ]
        },
        {
          phase: 'Specialization (Select One)',
          courses: [
            'Mobile App Design',
            'Web Application Design',
            'Enterprise UX Design',
            'E-commerce UX/UI',
            'Conversational UI Design'
          ]
        }
      ]
    }
  };

  const activePath = careerPaths[activeTab];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Career Pathways Guide</h1>
          <p className="text-xl max-w-3xl opacity-90 leading-relaxed">Navigate your professional journey through carefully curated roadmaps in today's most sought-after technical domains.</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-10 bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex overflow-x-auto scrollbar-hide">
            {Object.keys(careerPaths).map((path) => (
              <button
                key={path}
                onClick={() => setActiveTab(path)}
                className={`py-5 px-8 font-medium text-base whitespace-nowrap transition-all duration-200 ${
                  activeTab === path
                    ? 'border-b-2 border-indigo-600 text-indigo-700 font-semibold'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {careerPaths[path].title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-gray-100">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">{activePath.title}</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">{activePath.description}</p>

            {/* Career Pathway Steps */}
            {activePath.pathways.length > 0 ? (
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-slate-800 mb-8 flex items-center">
                  <span className="mr-3 text-indigo-600">⟡</span>
                  Career Pathway
                </h3>
                <div className="space-y-6">
                  {activePath.pathways.map((step, index) => (
                    <div key={index} className="relative pl-10 border-l-2 border-indigo-500 ml-6">
                      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shadow-md">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                      <h4 className="text-xl font-semibold text-indigo-700 mb-2">{step.stage}</h4>
                      <p className="font-medium text-slate-700 mb-1">{step.description}</p>
                      <p className="text-slate-600 mb-1">{step.details}</p>
                      <p className="text-sm text-indigo-500 font-semibold mt-2">Typical timeframe: {step.timeframe}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500 italic">
                Career pathway details coming soon...
              </div>
            )}

            {/* Skills */}
            {activePath.skills.length > 0 ? (
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-slate-800 mb-8 flex items-center">
                  <span className="mr-3 text-indigo-600">⟡</span>
                  Essential Skills
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activePath.skills.map((skillSet, index) => (
                    <div key={index} className="bg-slate-50 rounded-lg p-6 border border-slate-100 hover:shadow-md transition-shadow duration-300">
                      <h4 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">{skillSet.category}</h4>
                      <ul className="space-y-3">
                        {skillSet.items.map((skill, idx) => (
                          <li key={idx} className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></div>
                            <span className="text-slate-700">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Learning Curriculum */}
            {activePath.curriculum.length > 0 ? (
              <div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-8 flex items-center">
                  <span className="mr-3 text-indigo-600">⟡</span>
                  Learning Curriculum
                </h3>
                <div className="space-y-10">
                  {activePath.curriculum.map((phase, index) => (
                    <div key={index}>
                      <h4 className="text-xl font-semibold text-indigo-700 mb-4">{phase.phase}</h4>
                      <div className="bg-slate-50 rounded-lg p-6 border border-slate-100">
                        <ol className="space-y-3">
                          {phase.courses.map((course, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="font-semibold text-indigo-600 mr-3 mt-0.5">{idx + 1}.</span>
                              <span className="text-slate-700">{course}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-xl shadow-xl p-10 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Begin Your Professional Journey?</h3>
            <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90">Access comprehensive guides, specialized courses, and personalized resources tailored to your career aspirations.</p>
            <button className="bg-white text-indigo-700 hover:bg-indigo-50 font-semibold py-3 px-8 rounded-lg shadow-md transition-colors">
              Explore Resources
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Career Pathways</h2>
              <p className="text-slate-400">Guiding your professional growth.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-300 hover:text-white transition-colors">About</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">Resources</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>© {new Date().getFullYear()} Career Pathways Guide. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pathways;