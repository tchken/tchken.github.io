export const siteConfig = {
  name: "Tsung-Chin (Ken) Han",
  title: "Machine Learning | NLP | Computer Vision | Deep Learning",
  description: "Portfolio of Tsung-Chin (Ken) Han — Staff Data Scientist at GroundTruth",
  accentColor: "#3498db",
  resumeUrl: "",
  social: {
    email: "tchan.ken1025@gmail.com",
    linkedin: "https://www.linkedin.com/in/ken-tsung-chin-han",
    github: "https://github.com/tchken",
  },
  aboutMe:
    "Ken is a seasoned Machine Learning Engineer and Data Scientist specializing in large-scale recommendation systems, ranking, and deep learning architectures. He bridges machine learning with causal inference to move beyond predictive accuracy, uncovering the true behavioral drivers behind complex user and system interactions. With experience building high-stakes systems across B2C and B2B environments, Ken owns the full machine learning lifecycle: from feature engineering and model architecture to scalable production deployment.",
  skills: [
    "Machine Learning",
    "Deep Learning",
    "Natural Language Processing",
    "Computer Vision",
    "Recommendation Systems",
    "Causal Inference",
    "Feature Engineering",
    "Python",
    "PyTorch",
    "Ranking Systems",
    "Data Science",
    "MLOps",
  ],
  projects: [
    {
      name: "Learning Satellite Representations from Geo-Aligned Multi-Sensor Pairs",
      accentColor: "#e67e22",
      category: "Deep Learning Research | Computer Vision",
      tagline: "A self-supervised approach that treats co-registered Sentinel-1 (radar) and Sentinel-2 (optical) acquisitions as natural positive pairs — eliminating the need for hand-crafted augmentations",
      image: "/images/projects/sen12ms_pair.png",
      description:
        "Built an end-to-end self-supervised learning pipeline that combines two complementary ideas: leverage 180K+ unlabeled patches via MoCo v2 contrastive pretraining instead of burning scarce labels, and replace hand-crafted augmentations with geo-aligned Sentinel-1 (radar) + Sentinel-2 (optical) acquisitions of the same location as natural positive pairs. A ResNet50 encoder pretrained this way — frozen and probed with a single linear head on 1,024 labeled samples — beat the fully supervised baseline by +0.08 accuracy, hitting the label-noise ceiling of the IGBP scheme. Takeaway: pairing the SSL paradigm with a domain-native positive-pair signal does more with less — outperforming supervised training while using zero additional labels.",
      pipeline: [
        {
          step: "Data Pipeline",
          detail: "Custom PyTorch Dataset that exploits SEN12MS's filename-level co-registration to serve S1/S2 positive pairs on the fly. Channel-aware Normalize handles three modes — S2-only (10 bands), S1-only (VV+VH), S1+S2 fused (12 channels) — each standardized with per-band statistics.",
        },
        {
          step: "Pretrain",
          detail: "MoCo v2 + ResNet50 encoder, pretrained on 180K+ unlabeled S1/S2 pairs across BAIR's multi-GPU cluster. Identified Gaussian blur as a CPU-side bottleneck starving the GPU — switching from OpenCV to PIL doubled training throughput. No labels required.",
        },
        {
          step: "Fine-tune",
          detail: "Standard linear probe: freeze the ResNet50 encoder, train a single linear classification head on 1,024 labeled SEN12MS patches.",
        },
        {
          step: "Evaluate",
          detail: "Multi-label IGBP land cover classification on SEN12MS. The learned representation reaches the ~0.67 label-noise ceiling of the IGBP scheme — beating the supervised baseline at a fraction of the label budget.",
        },
      ],
      results: {
        caption: "Multi-label scene classification accuracy on SEN12MS (1,024 labeled samples)",
        headers: ["Method", "S1 (Sentinel-1) SAR", "S2 (Sentinel-2) Optical", "S1 + S2 Fused"],
        rows: [
          ["Supervised baseline (ResNet50)",                "0.40", "0.61", "0.59"],
          ["Geo-alignment MoCo v2 (ResNet50 + linear probe)", "—",    "0.63", "0.67 ✦"],
        ],
        footnote: "✦ Near theoretical upper bound (~0.67) imposed by IGBP label noise  ·  — N/A: geo-alignment is designed around multi-sensor complementarity — S1+S2 is the intended inference modality.",
      },
      glossary: [
        {
          term: "MoCo v2",
          definition: "Momentum Contrast v2 — self-supervised contrastive learning framework by Facebook AI Research.",
          link: "https://arxiv.org/abs/2003.04297",
        },
        {
          term: "ResNet50",
          definition: "50-layer deep residual network used as the visual encoder backbone.",
          link: "https://arxiv.org/abs/1512.03385",
        },
        {
          term: "SEN12MS",
          definition: "180,662 georeferenced Sentinel-1/2/MODIS patch triplets dataset for deep learning and data fusion.",
          link: "https://github.com/schmitt-muc/SEN12MS",
        },
        {
          term: "Sentinel-1",
          definition: "ESA SAR radar satellite — 2 channels (VV + VH polarizations). Captures microwave backscatter, penetrates clouds, works day/night.",
          link: "https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-1",
        },
        {
          term: "Sentinel-2",
          definition: "ESA optical multispectral satellite — 13 spectral bands at 10–60m resolution.",
          link: "https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-2",
        },
        {
          term: "IGBP",
          definition: "International Geosphere-Biosphere Programme — land cover classification scheme with 17 classes, used to label SEN12MS patches.",
          link: "https://help.earthmap.org/datasets/land-useland-cover/land-cover-igbp-modis",
        },
      ],
      tools: ["PyTorch", "MoCo v2", "ResNet50", "AWS", "Weights & Biases"],
      methods: ["Self-Supervised Learning", "Contrastive Learning", "Transfer Learning", "Remote Sensing", "Multi-Sensor Fusion"],
      links: [
        { label: "Work Demo", url: "https://github.com/Berkeley-Data/hpt" },
        { label: "Source Code", url: "https://github.com/Berkeley-Data/OpenSelfSup" },
        { label: "Dataset: SEN12MS", url: "https://github.com/Berkeley-Data/SEN12MS" },
        { label: "Berkeley AI Research (BAIR)", url: "https://bair.berkeley.edu/" },
      ],
    },
  ],
  experience: [
    {
      company: "GroundTruth",
      logo: "https://www.google.com/s2/favicons?domain=groundtruth.com&sz=128",
      title: "Staff Data Scientist",
      dateRange: "Nov 2024 – Present",
      bullets: [
        "Leading large-scale ML initiatives in recommendation and ranking systems.",
      ],
    },
    {
      company: "GroundTruth",
      logo: "https://www.google.com/s2/favicons?domain=groundtruth.com&sz=128",
      title: "Senior Data Scientist",
      dateRange: "May 2021 – Oct 2024",
      bullets: [
        "Built and deployed deep learning models for B2C and B2B recommendation systems.",
        "Applied causal inference methods to uncover behavioral drivers behind user interactions.",
      ],
    },
    {
      company: "Walmart",
      logo: "https://www.google.com/s2/favicons?domain=walmart.com&sz=128",
      title: "Data Scientist, Machine Learning",
      dateRange: "2020 – 2021",
      bullets: [
        "Part of the Walmart+ Launch Team working on omni-channel trip missions.",
        "Developed Customer Lifetime Value (CLV) models for eCommerce.",
      ],
    },
    {
      company: "Deutsche Bank",
      logo: "/images/logos/deutschebank.svg",
      title: "Assistant Vice President",
      dateRange: "2017 – 2019",
      bullets: [
        "Built quantitative models for Treasury.",
      ],
    },
    {
      company: "S&P Dow Jones Indices",
      logo: "https://www.google.com/s2/favicons?domain=spglobal.com&sz=128",
      title: "Quantitative Analyst",
      dateRange: "2015 – 2017",
      bullets: [
        "Designed and maintained custom indices.",
      ],
    },
    {
      company: "Coastal Management, LLC",
      logo: "",
      title: "Quantitative Research",
      dateRange: "2015",
      bullets: [
        "Quantitative trading research and data analysis.",
      ],
    },
    {
      company: "Rizm",
      logo: "",
      title: "Quantitative Research",
      dateRange: "2014",
      bullets: [
        "Research on algorithmic trading platform.",
      ],
    },
  ],
  education: [
    {
      school: "UC Berkeley School of Information",
      logo: "https://www.google.com/s2/favicons?domain=berkeley.edu&sz=128",
      degree: "Master's in Information and Data Science",
      dateRange: "",
      achievements: [],
    },
    {
      school: "Columbia University in the City of New York",
      logo: "https://www.google.com/s2/favicons?domain=columbia.edu&sz=128",
      degree: "Master's in Mathematics (Mathematics of Finance)",
      dateRange: "",
      achievements: [],
    },
    {
      school: "National Taiwan Normal University",
      logo: "https://www.google.com/s2/favicons?domain=ntnu.edu.tw&sz=128",
      degree: "Bachelor's in Physics",
      dateRange: "",
      achievements: [
        "Micro Optical Spectroscopic Laboratory",
        "Solid State Laser Physics Laboratory",
      ],
    },
  ],
};
