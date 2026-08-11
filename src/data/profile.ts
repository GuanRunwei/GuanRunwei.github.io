export const profile = {
  name: 'Runwei Guan',
  nameZh: '关润威',
  nickname: 'Runway',
  title: 'Research Fellow',
  affiliations: [
    'Research Fellow, The Hong Kong University of Science and Technology (Guangzhou)',
    'Joint Research Fellow, MMLab, The Chinese University of Hong Kong',
    'Founder / CTO, FertiTech AI',
    'Research Associate, Institute of Deep Perception Technology, JITRI',
  ],
  email: 'runwayrwguan@hkust-gz.edu.cn',
  scholar: 'https://scholar.google.com.hk/citations?hl=zh-CN&user=Fjo72tUAAAAJ',
  github: 'https://github.com/GuanRunwei',
  googleSite: 'https://sites.google.com/view/runwei-guan',
  bio: [
    'I am currently a Research Fellow at the Hong Kong University of Science and Technology (Guangzhou), working with Prof. Hui Xiong (AAAI / AAAS / ACM / CAAI / CCF / IEEE Fellow), and a Joint Research Fellow at MMLab, CUHK. My research interests include unmanned surface vessels, vision-language learning, end-to-end autonomous control, and radar perception.',
    'I have authored over 70 papers in journals and conferences including T-IV, T-ITS, T-II, T-MC, T-MM, T-CSVT, IoT-J, ESWA, Information Fusion, Pattern Recognition, Neural Networks, ASOC, RAS, NeurIPS, AAAI, ACM MM, ICLR, ICML, ICRA, IROS, ICASSP and ICME. I also serve as an editorial board member of Artificial Intelligence in Health and a guest editor of Electronics.',
    'I obtained my Ph.D. from the University of Liverpool (2022.3 – 2024.11), and was a researcher at the Institute of Deep Perception Technology, Jiangsu Industrial Technology Research Institute (supervised by Prof. Yutao Yue, Prof. Ka Lok Man, Prof. Jeremy Smith and Prof. Eng Gee Lim). Before that, I received my M.S. in Data Science from the University of Southampton and the Alan Turing Institute (2020.10 – 2021.11). I am also founding FertiTech AI in the field of AI + IVF, and previously worked as an R&D engineer at Hundsun Technologies Inc.',
  ],
  stats: {
    citations: 1315,
    hIndex: 17,
    i10Index: 28,
    papers: 70,
  },
}

export const news: { date: string; text: string }[] = [
  { date: '2026.07', text: 'One paper accepted by IEEE Transactions on Intelligent Transportation Systems (SCI Q1, IF: 9.1)' },
  { date: '2026.07', text: 'One paper accepted by IEEE Internet of Things Journal (SCI Q1, IF: 8.7)' },
  { date: '2026.06', text: 'One paper accepted by Information Fusion (SCI Q1, IF: 15.5, CAAI-A)' },
  { date: '2026.05', text: 'One paper accepted by ICML 2026 (CCF-A)' },
  { date: '2026.04', text: 'One paper accepted by IEEE Transactions on Industrial Informatics (SCI Q1, IF: 9.9, CAA-A+)' },
  { date: '2026.03', text: 'One paper accepted by Information Fusion (SCI Q1, IF: 15.5, CAAI-A)' },
  { date: '2026.02', text: 'One paper accepted by Applied Soft Computing (SCI Q1, IF: 6.6)' },
  { date: '2026.01', text: 'One paper accepted by Pattern Recognition (SCI Q1, IF: 7.6, CCF-B)' },
  { date: '2026.01', text: 'One paper accepted by ICLR 2026 (CCF-A)' },
  { date: '2026.01', text: 'Two papers accepted by ICASSP 2026 (CCF-B)' },
]

export const researchInterests = [
  'Multi-Sensor Perception',
  'Radar-based Perception',
  'Robot-based Embodied Perception (VLN / VLA)',
  'End-to-End Autonomous Driving',
  '2D/3D Multi-Task Perception',
  'Visual Grounding',
  'Visual Question Answering',
  'Multi-Modal Large Language Models',
  'Lightweight Neural Networks',
  'AI + IVF',
]

export interface Project {
  title: string
  org: string
  role: string
  period?: string
  note?: string
}

export const projects: Project[] = [
  {
    title: 'Embodied-Intelligence Data Synthesis via 3D Reconstruction and Generative Learning (Sur2Ego)',
    org: 'GAC Group commissioned project',
    role: 'Key Executor (PI: Prof. Hui Xiong)',
    period: '2026 – present',
    note: 'Industrial collaborator: Dr. Yin Zhou (Chief Scientist & Head of Autonomy, GAC Group; first author of VoxelNet; formerly Senior Research Manager at Waymo and Apple)',
  },
  {
    title: 'Research on Human-Machine Collaborative Cognitive and Explainable Decision-Making Systems for Inland Waterway Vessel Navigation Safety',
    org: 'Hubei Key Laboratory of Inland Shipping Technology',
    role: 'Principal Investigator (Charge)',
  },
  {
    title: 'Intelligent Medical Follow-up System Based on Multi-Agent Collaboration',
    org: 'HKUST(GZ) – Distinct Healthcare (港科广-卓正医疗)',
    role: 'Group Leader (PI: Prof. Hui Xiong)',
  },
  {
    title: 'Prediction Model of Venous Thrombosis in Lung Cancer based on Statistical Machine Learning',
    org: 'FertiTech AI – Jiangyin Hospital Affiliated to Southeast University',
    role: 'Principal Investigator (Charge)',
  },
]

export const collaborations = [
  { name: 'Dr. Shanliang Yao', affiliation: 'Yancheng Institute of Technology, China' },
  { name: 'Dr. Jianan Liu', affiliation: 'Zenseact, Gothenburg, Sweden' },
  { name: 'Dr. Dongming Wu', affiliation: 'CUHK, Hong Kong SAR, China' },
  { name: 'Dr. Fangqiang Ding', affiliation: 'MIT, Boston, USA' },
  { name: 'Prof. Daizong Liu', affiliation: 'Wuhan University, China' },
  { name: 'Prof. Xiaohui Zhu', affiliation: "Xi'an Jiaotong-Liverpool University, China" },
  { name: 'Dr. Lianqing Zheng', affiliation: 'Tongji University, China' },
  { name: 'Prof. Wen Liu', affiliation: 'Wuhan University of Technology, China' },
  { name: 'Prof. Xuming Hu', affiliation: 'HKUST(GZ), China' },
  { name: 'Prof. Tao Huang', affiliation: 'James Cook University, Australia' },
  { name: 'Prof. Henghui Ding', affiliation: 'Fudan University, China' },
  { name: 'Prof. Qing-Long Han', affiliation: 'Swinburne University of Technology, Australia' },
]

export const services = {
  editorial: [
    'Editorial Board Member, Artificial Intelligence in Health',
    'Guest Editor, Electronics',
  ],
  reviewer: [
    'IEEE Transactions on Robotics (TRO)',
    'IEEE Transactions on Neural Networks and Learning Systems (TNNLS)',
    'IEEE Transactions on Circuits and Systems for Video Technology (TCSVT)',
    'IEEE Transactions on Multimedia (TMM)',
    'IEEE Transactions on Intelligent Vehicles (TIV)',
    'IEEE Transactions on Intelligent Transportation Systems (TITS)',
    'IEEE Transactions on Industrial Informatics (TII)',
    'IEEE Robotics and Automation Letters (RAL)',
    'Robotics and Autonomous Systems (RAS)',
    'Engineering Applications of Artificial Intelligence (EAAI)',
    'Neurocomputing',
    'Computer Vision and Pattern Recognition (CVPR)',
    'European Conference on Computer Vision (ECCV)',
    'Conference on Neural Information Processing Systems (NeurIPS)',
    'ACM Multimedia (MM)',
    'Association for the Advancement of Artificial Intelligence (AAAI)',
    'IEEE Intelligent Transportation Systems Conference (ITSC)',
    'IEEE International Conference on Robotics and Automation (ICRA)',
  ],
}

