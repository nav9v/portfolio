import { HomeIcon, NotebookIcon } from "lucide-react";
import { Icons, } from '~/components/icons'

export const DATA = {
  name: 'Navneet Sharma',
  slogan: 'Building the future, one line of code at a time',
  url: 'https://nav9v.github.io',
  location: 'Jalandhar, IN',
  locationLink: 'https://maps.app.goo.gl/zpAabyLFYVA6fJL4A',
  description:
    'Passionate product engineer specializing in AI/ML, IoT, and robotics. Building innovative solutions and contributing to open-source projects.',
  summary:
    'I\'m Passionate about delving into the realm of technological advancements across the globe. My interests encompass the fascinating domains of coding, CAD, IoT, the captivating world of robotics and innovation!.',
  avatarUrl: '/me.jpg',
  tweetId: '1418887499087241216',
  skills: [
    'React',
    'AI/ML',
    'ROS2',
    'Python',
    'C/C++',
    'Go',
    'Node-Red',
    'Iot',
  ],
  navbar: [


    {
      href: '/',
      icon: <HomeIcon className='size-full' />,
      label: 'Home',
    },
    {
      href: '/blog',
      icon: <NotebookIcon className='size-full' />,
      label: 'Blog',
    },
    {
      href: '/gallery',
      icon: <Icons.aperture className='size-full' />,
      label: 'Gallery',
    },
  ],
  contact: {
    email: 'navneetsharma2302@gmail.com',
    tel: '+123456789',
    social: {

      GitHub: {
        name: 'GitHub',
        url: 'https://github.com/nav9v',
        icon: <Icons.github className='size-full' />,
        navbar: true,
      },
      LinkedIn: {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/nav9v/',
        icon: <Icons.linkedin className='size-full' />,
        navbar: true,
      },
      Youtube: {
        name: 'YouTube',
        url: 'https://www.youtube.com/@NavneetSharmaa',
        icon: <Icons.youtube className='size-full' />,
        navbar: true,
      },
      Telegram: {
        name: 'Telegram',
        url: 'https://t.me/NSharmav',
        icon: <Icons.telegram className='size-full' />,
        navbar: true,
      },
      X: {
        name: 'X',
        url: 'https://x.com/nav9v',
        icon: <Icons.x className='size-full' />,
        navbar: true,
      },
    },
  },
  work: [
    {
      company: 'Freelance',
      href: '/home',
      badges: [],
      location: 'Remote',
      title: 'Freelance Product Engineer',
      logoUrl: '/free.ico',
      start: 'Aug 2024',
      end: 'Present',
      description:
        'Currently working as a freelance product engineer, focusing on building innovative solutions and contributing to various projects across different domains.',
    },
    {
      company: 'GDSC IKGPTU',
      href: 'https://github.com/GDSC-IKGPTU',
      badges: [],
      location: 'IKGPTU, Jalandhar',
      title: 'Core Team Member',
      logoUrl: '/gdsc.jpg',
      start: 'Aug 2023',
      end: 'Aug 2024',
      description:
        'As a core team member, I actively contributed to diverse AI/ML projects, played a pivotal role in cultivating a thriving developer community.',
    },
    {
      company: 'NIELIT Chennai',
      badges: [],
      href: 'https://nielit.gov.in/chennai/',
      location: 'Remote',
      title: 'IoT and Data Processing Intern',
      logoUrl: 'nielet.png',
      start: 'Jun 2024',
      end: 'Aug 2024',
      description:
        'Learned about IoT and Data Processing, Made a EV Health Monitor System',
    },
  ],
  education: [
    {
      school: 'IK Gujral Punjab Technical University',
      href: 'https://www.ptu.ac.in',
      degree: 'Bachelor of Technology in Computer Science',
      logoUrl: '/ptu.png',
      start: 'Aug 2022',
      end: 'May 2026',
      description: 'Learning and growing in the field of computer science',
    },
  ],
  projects: [
    {
      title: 'Code2txt',
      href: 'https://github.com/nav9v/code2txt',
      dates: 'Apr 2025 - Now',
      active: true,
      description: 'CLI tool that converts code repositories into AI-friendly text format.',
      technologies: [
        'Go',
        'Go-md2man',
        'Cobra',
        'CLI',
      ],
      links: [
        {
          type: 'Source',
          href: 'https://github.com/nav9v/code2txt',
          icon: <Icons.github className='size-3' />,
        },
        {
          type: 'Release',
          href: 'https://github.com/nav9v/code2txt/releases',
          icon: <Icons.github className='size-3' />,

        }
      ],
      image: '/code2txt.jpg',
      video: '',
    },
    {
      title: 'DumbAF',
      href: 'https://collabdoor.github.io/dumbAF/',
      dates: 'Feb 2025 - Mar 2025',
      active: true,
      description: 'course relevant resources.',
      technologies: [
        'HTML',
        'CSS',
        'JavaScript',
      ],
      links: [
        {
          type: 'Website',
          href: 'https://collabdoor.github.io/dumbAF/',
          icon: <Icons.globe className='size-3' />,
        },
        {
          type: 'Source',
          href: 'https://github.com/collabdoor/dumbAF',
          icon: <Icons.github className='size-3' />,
        },
      ],
      image: '/dumbaf.png',
      video: '',
    },
    {
      title: 'Road Anomaly Detection',
      href: 'https://github.com/collabdoor/Road-Anomaly-Detection',
      dates: 'Feb 2025 - Mar 2025',
      active: true,
      description:
        'Road Anomaly Detection leverages advanced CV techniques to identify and classify road anomalies, such as potholes, cracks, and other surface irregularities.',
      technologies: [
        'Python',
        'OpenCV',
        'TensorFlow',
        'Keras',
        'Streamlit',
        'Flask',
      ],
      links: [
        {
          type: 'Demo',
          href: 'https://road-anomaly-detection.streamlit.app',
          icon: <Icons.globe className='size-3' />,
        },
      ],
      image: '/rad.png',
      video: '',
    },
    {
      title: 'Online MD Editor',
      href: 'https://nav9v.github.io/online-markdown-editor/',
      dates: 'Apr 2025 - Present',
      active: true,
      description: 'Markdown editor with advanced support for math equations, LLM-generated Math\'s Syntax, Syntax Highlighting, and diagrams.',
      technologies: [
        'Marked',
        'Markdown-it',
        'MathJax',
        'Mermaid',
        'KaTeX',
      ],
      links: [
        {
          type: 'Website',
          href: 'https://nav9v.github.io/online-markdown-editor/',
          icon: <Icons.globe className='size-3' />,
        },
        {
          type: 'Source',
          href: 'https://github.com/nav9v/online-markdown-editor',
          icon: <Icons.github className='size-3' />,
        },
      ],
      image: '/markedit.png',
      video: '',
    },
    {
      title: 'IoT-Based EV Health Monitor',
      href: 'https://github.com/nav9v/quilles-pulse',
      dates: 'Jun 2024 - Aug 2024',
      active: true,
      description: 'IoT-Based Battery Health Monitoring System for EV Charging Using ESP-32',
      technologies: [
        'PlatformIO',
        'ESP32',
        'IoT',
        'MQTT',
        'Wokwi',
        'Node-Red',
      ],

      links: [
        {
          type: 'Source',
          href: 'https://github.com/nav9v/quilles-pulse',
          icon: <Icons.github className='size-3' />,
        },
        {
          type: 'Demo',
          href: 'https://wokwi.com/projects/404276484147584001',
          icon: <Icons.globe className='size-3' />,
        },
      ],
      image: '/eviot.png',
      video: '',
    },
    {
      title: 'CraftChat',
      href: 'https://craftchat-seven.vercel.app/',
      dates: 'June 2024 - Aug 2024',
      active: true,
      description: 'A disposable chatroom application 🔐',
      technologies: [
        'sveltekit',
        'TailwindCSS',
        'hapi',
        'GunDB',
      ],
      links: [
        {
          type: 'Website',
          href: 'https://craftchat-seven.vercel.app/',
          icon: <Icons.globe className='size-3' />,
        },
        {
          type: 'Source',
          href: 'https://github.com/nav9v/craftchat',
          icon: <Icons.github className='size-3' />,
        },
      ],
      image: '/craftchat.png',
      video: '',
    },


  ],
  awesome: [

    {
      title: 'Collabdoor',
      dates: 'Jan, 2022',
      location: '',
      description: 'A collaborative platform for students to share resources and collaborate on projects',
      image: '/collab.png',
      mlh: '',
      links: [
        {
          title: 'Source',
          href: 'https://github.com/collabdoor',
          icon: <Icons.github className='size-3' />,
        },
      ],
    },
    {
      title: 'Github Profile',
      dates: 'Feb, 2022',
      location: '',
      description: 'Personalized GitHub profile',
      image: '/github.png',
      mlh: '',
      links: [
        {
          title: 'Website',
          type: '',
          href: 'https://github.com/nav9v',
          icon: <Icons.globe className='size-3' />,
        },
        {
          title: 'Source',
          href: 'https://github.com/nav9v/nav9v',
          icon: <Icons.github className='size-3' />,
        },
      ],
    },
  ],
}
