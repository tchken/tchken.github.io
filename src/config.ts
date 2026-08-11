export const siteConfig = {
  name: "Tsung-Chin Han | Ken",
  title: "RecSys · Retrieval & Ranking | LLM/GenAI | Deep Learning | Distributed ML",
  description: "Portfolio of Tsung-Chin Han (Ken) — Staff Data Scientist, Machine Learning at GroundTruth",
  accentColor: "#3498db",
  resumeUrl: "",
  social: {
    email: "tchan.ken1025@gmail.com",
    linkedin: "https://www.linkedin.com/in/ken-tsung-chin-han",
    github: "https://github.com/tchken",
  },
  aboutMe:
    "I am a seasoned Machine Learning Engineer and Data Scientist specializing in large-scale recommendation systems, ranking, and deep learning architectures. My focus is on engineering machine learning workflows and deep learning pipelines, integrating causal inference to move beyond predictive accuracy, uncover business opportunities, and understand the mechanics behind complex user and system interactions.\n\nWith experience building high-stakes systems across B2C and B2B environments, I own the full machine learning lifecycle: from feature engineering and model architecture to high-throughput production deployment.\n\nMy focus is on building rigorous, high-performance machine learning systems with direct business impact.",
  skills: [
    "Recommendation Systems",
    "Retrieval & Ranking",
    "LLM / GenAI",
    "Deep Learning",
    "Causal Inference & Uplift",
    "Natural Language Processing",
    "Computer Vision",
    "Distributed / Multi-GPU Training",
    "Feature Engineering",
    "Python",
    "PyTorch",
    "TensorFlow",
    "Keras",
    "SQL",
    "MLflow",
    "Weights & Biases",
    "Kedro",
    "Docker",
    "Terraform",
    "Apache Spark",
    "AWS",
    "GCP",
    "MLOps",
  ],
  projects: [
    {
      name: "Learning Satellite Representations from Geo-Aligned Multi-Sensor Pairs",
      accentColor: "#e67e22",
      category: "GenAI | Deep Learning Research | Computer Vision",
      year: "2021",
      tagline: "A self-supervised approach that treats co-registered Sentinel-1 (radar) and Sentinel-2 (optical) acquisitions as natural positive pairs — eliminating the need for hand-crafted augmentations",
      image: "/images/projects/sen12ms_pair.png",
      description:
        "Built an end-to-end self-supervised learning pipeline that combines two complementary ideas: leverage 180K+ unlabeled patches via MoCo v2 contrastive pretraining instead of burning scarce labels, and replace hand-crafted augmentations with geo-aligned Sentinel-1 (radar) + Sentinel-2 (optical) acquisitions of the same location as natural positive pairs. A ResNet50 encoder pretrained this way — then fine-tuned on just 1,024 labeled samples — beat the fully supervised baseline trained on the same label budget by +0.08 accuracy, hitting the label-noise ceiling of the IGBP scheme. Takeaway: pairing the SSL paradigm with a domain-native positive-pair signal does more with less — outperforming supervised training while using zero additional labels.",
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
          detail: "Transfer learning: initialize the SEN12MS scene-classification ResNet50 from the MoCo backbone and fine-tune end-to-end on 1,024 labeled patches. Freezing the backbone fully or partially was tested and did not improve accuracy — the representation transferred best when allowed to adapt.",
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
          ["Geo-alignment MoCo v2 (ResNet50, fine-tuned)", "—",    "0.63", "0.67 ✦"],
        ],
        footnotes: [
          "✦ Near theoretical upper bound (~0.67) imposed by IGBP label noise.",
          "— N/A: geo-alignment is designed around multi-sensor complementarity; S1+S2 is the intended inference modality.",
        ],
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
      tools: ["PyTorch", "OpenSelfSup", "HPT (Hierarchical PreTraining)", "AWS", "Weights & Biases"],
      methods: ["Self-Supervised Learning", "Contrastive Learning", "Transfer Learning", "Remote Sensing", "Multi-Sensor Fusion"],
      links: [
        { label: "Work Demo", url: "https://github.com/Berkeley-Data/hpt" },
        { label: "Source Code", url: "https://github.com/Berkeley-Data/OpenSelfSup" },
        { label: "Dataset: SEN12MS", url: "https://github.com/Berkeley-Data/SEN12MS" },
        { label: "Berkeley AI Research (BAIR)", url: "https://bair.berkeley.edu/" },
      ],
    },
    {
      name: "Humor Response Generation: Machines Can Learn To Be Funny Too",
      accentColor: "#34528a",
      category: "GenAI | Deep Learning Research | LLM | NLP",
      year: "2020",
      tagline: "Fine-tune GPT-2 (345M) to answer any question with a fitting punchline — then judge whether the joke actually lands, using a learned humor discriminator and 8 human raters.",
      image: "/images/projects/gpt2_jokes_flow.svg",
      description:
        "Most joke generators tell a canned line. This project asks for something harder: given any question or statement, write a funny reply that actually fits — a punchline should surprise you, yet still make sense. The generator is GPT-2 (345M), fine-tuned on ~194K title→body jokes from Reddit's r/Jokes community. Decoding tuning mattered: top-k 40 with temperature 0.85 worked best, while the extremes failed in telling ways — too greedy and it loops, too cold and it outputs nothing, too hot and it turns to word salad.\n\nEvaluation is the twist, since humor can't be scored by metrics like BLEU that only reward word overlap. So jokes are judged two ways: a Bidirectional LSTM humor classifier (the 'discriminator') as an automatic critic, and 8 human raters picking the funniest of three replies per prompt. The result is two-sided — people agreed on ~47% of the generated jokes (solid evidence the replies genuinely land), but the classifier matched those human verdicts only 21% of the time. GPT-2 learned to be funny; teaching a model to reliably recognize humor proved much harder — the same lesson behind today's work on aligning LLMs to human preferences.",
      pipeline: [
        {
          step: "Fine-tune",
          detail: "Fine-tuned GPT-2 (345M, 24-block decoder, 1024-dim) on ~194K title→body jokes from Reddit's r/Jokes community — ~3.5K steps, average loss 2.90→1.90, trained on a GPU cluster. A decoding sweep set top-k 40 / temperature 0.85; the extremes were characterized as failure modes — looping text, empty strings, or incoherent word salad.",
        },
        {
          step: "Serve",
          detail: "Fronted the generator and discriminator behind an HTTP/REST API, hosted as separate services so the slow autoregressive sampling runs asynchronously from classification. Send a question or statement, get a freshly sampled punchline back.",
        },
        {
          step: "Discriminate",
          detail: "Trained a Bidirectional LSTM humor discriminator over frozen GloVe 300d embeddings (6B-token Wikipedia + Gigaword) on ~194K upvote-labeled jokes (114K funny / 81K not) — an automatic \"is this funny?\" scorer, fully decoupled from the generator that produced the text.",
        },
        {
          step: "Evaluate",
          detail: "Benchmarked generations two ways, since BLEU can't judge comedy: the discriminator as an automatic critic, and an 8-rater human study picking the funniest of three responses per prompt — then measured how often machine verdicts agreed with human consensus.",
        },
      ],
      results: {
        caption: "Human evaluation — 8 raters chose the funniest of three GPT-2 replies across 100 prompts",
        headers: ["Evaluation", "Result"],
        rows: [
          ["Automatic humor classifier matched the human verdict", "21%"],
          ["Human raters agreed GPT-2's reply was funniest", "~47%"],
        ],
        footnotes: [
          "The gap is the finding: GPT-2's jokes landed with people, but teaching a model to reliably recognize humor proved much harder.",
        ],
      },
      glossary: [
        {
          term: "GPT-2",
          definition: "OpenAI's autoregressive, decoder-only transformer language model. The 345M-parameter variant (24 decoder blocks, 1024-dim) was fine-tuned here for conditional humor response generation.",
          link: "https://github.com/openai/gpt-2",
        },
        {
          term: "Top-k & temperature sampling",
          definition: "Decoding controls: top-k restricts sampling to the k most-probable tokens; temperature scales the logits before softmax to trade diversity against coherence. Extremes cause looping or word salad.",
          link: "https://arxiv.org/abs/1904.09751",
        },
        {
          term: "GloVe",
          definition: "Global Vectors for Word Representation — Stanford's pre-trained word embeddings (6B tokens, 400K vocab, 300-dim), frozen as the discriminator's input layer.",
          link: "https://nlp.stanford.edu/projects/glove/",
        },
        {
          term: "BiLSTM",
          definition: "Bidirectional Long Short-Term Memory network — reads a sequence forward and backward to capture context from both directions; used here as the humor discriminator.",
          link: "https://en.wikipedia.org/wiki/Long_short-term_memory",
        },
        {
          term: "BLEU",
          definition: "An n-gram overlap metric from machine translation — rejected here because it rewards word-pattern similarity, not whether a response is actually funny.",
          link: "https://aclanthology.org/P02-1040/",
        },
      ],
      tools: ["Python", "TensorFlow", "Keras", "OpenAI GPT-2 (TF)"],
      methods: ["LLM", "Language Modeling", "Fine-Tuning", "Conditional Text Generation", "Question Answering", "Transfer Learning", "Text Classification"],
      links: [
        { label: "Source Code", url: "https://github.com/NLP-Final-Project-2020" },
        { label: "Dataset: Reddit Jokes", url: "https://github.com/taivop/joke-dataset" },
      ],
    },
    {
      name: "Sea Level Rise: An Interactive Coastal Flood Explorer",
      accentColor: "#adb5bd",
      category: "Data Visualization | Geospatial | Interactive Storytelling",
      year: "2020",
      tagline: "Turn an abstract climate statistic into something you can feel — drag a slider and watch the water climb over real coastal cities, scenario by scenario.",
      image: "/images/projects/sealevel_explorer.svg",
      embed: "/projects/sea-level/index.html",
      embedCaption: "Live: New York. The full explorer also maps San Francisco Bay, Seattle & Maui · CO₂ → sea-level model R² = 0.93.",
      description:
        "Sea level rise is just a number until you see your own city underwater. This project makes it visceral: pick a warming scenario, drag the slider, and watch the coastline of New York, San Francisco Bay, Seattle, and Maui disappear beneath the water on a live Mapbox map. Each city has ~80 pre-rendered flood overlays, so the inundation animates smoothly as you scrub through possible futures.\n\nBehind the visuals, a scikit-learn regression translates CO₂ emissions into projected global mean sea-level rise (R² = 0.93 for the cumulative-emissions model), wired into D3 charts and a Tableau overview. The goal was never a perfect forecast — it was communication: making a slow, planetary threat feel immediate and local.",
      pipeline: [
        {
          step: "Engineer",
          detail: "Compiled satellite sea-level records (1992→) and CO₂ data, then pre-rendered ~80 incremental flood-level masks per city so the coastline could submerge smoothly as the slider moves — rather than recomputing geometry in the browser.",
        },
        {
          step: "Model",
          detail: "Fit a scikit-learn linear-regression chain converting CO₂ emissions (gigatonnes → atmospheric ppm → global mean sea-level rise) for any target year. The cumulative-emissions model reaches R² = 0.93, powering the interactive scenario charts.",
        },
        {
          step: "Build",
          detail: "Built an interactive Mapbox GL + D3.js front end: a sea-level slider overlays the matching flood mask in real time over a satellite map, with terrain contours and D3 charts for context. Served through a Flask app.",
        },
        {
          step: "Tell the story",
          detail: "Localized the experience to recognizable skylines like New York so an abstract global threat becomes a concrete \"this is your neighborhood underwater\" moment — the heart of data communication.",
        },
      ],
      glossary: [
        {
          term: "Mapbox GL JS",
          definition: "WebGL library for fast, interactive vector maps in the browser — the base map the flood overlays sit on.",
          link: "https://docs.mapbox.com/mapbox-gl-js/",
        },
        {
          term: "TopoJSON",
          definition: "A compact extension of GeoJSON that encodes shared geographic topology — efficient map shapes for the web.",
          link: "https://github.com/topojson/topojson",
        },
        {
          term: "Satellite altimetry",
          definition: "Measuring sea-surface height from orbit — the source of the continuous global sea-level record since 1992.",
          link: "https://climate.nasa.gov/vital-signs/sea-level/",
        },
        {
          term: "R² (coefficient of determination)",
          definition: "Share of variance a model explains; 1.0 is perfect, 0 is no better than predicting the mean.",
          link: "https://en.wikipedia.org/wiki/Coefficient_of_determination",
        },
      ],
      tools: ["D3.js", "Mapbox GL JS", "Flask", "scikit-learn", "Tableau"],
      methods: ["Data Visualization", "Geospatial Mapping", "Interactive Storytelling", "Predictive Modeling", "Data Engineering"],
      links: [
        { label: "Source Code", url: "https://github.com/tchken/geo-visualization" },
        { label: "Data", url: "https://www.climate.gov/news-features/understanding-climate/climate-change-global-sea-level" },
      ],
    },
  ],
  experience: [
    {
      company: "GroundTruth",
      logo: "https://www.google.com/s2/favicons?domain=groundtruth.com&sz=128",
      title: "Staff Data Scientist, Machine Learning",
      dateRange: "Nov 2024 – Present",
      bullets: [
        "Technical lead. GenAI RecSys. Retrieval & ranking. ML platform.",
      ],
    },
    {
      company: "GroundTruth",
      logo: "https://www.google.com/s2/favicons?domain=groundtruth.com&sz=128",
      title: "Senior Data Scientist, Machine Learning",
      dateRange: "May 2021 – Oct 2024",
      bullets: [
        "Deep learning segmentation. Causal ML. Uplift measurement.",
      ],
    },
    {
      company: "Berkeley AI Research (BAIR)",
      logo: "https://www.google.com/s2/favicons?domain=berkeley.edu&sz=128",
      title: "Graduate Researcher, Self-Supervised Learning",
      dateRange: "Jan 2021 – May 2021",
      bullets: [
        "Self-supervised learning. Multi-modal representation. Satellite imagery.",
      ],
    },
    {
      company: "Walmart eCommerce",
      logo: "https://www.google.com/s2/favicons?domain=walmart.com&sz=128",
      title: "Data Scientist, Manager",
      dateRange: "Jan 2020 – Feb 2021",
      bullets: [
        "Walmart+ Launch Team. Omni-channel Trip Missions. Customer Lifetime Value (CLV).",
      ],
    },
    {
      company: "Deutsche Bank",
      logo: "/images/logos/deutschebank.svg",
      title: "Assistant Vice President, Modeling and Analytics",
      dateRange: "Jun 2017 – Oct 2019",
      bullets: [
        "Macro hedging. Treasury.",
      ],
    },
    {
      company: "S&P Dow Jones Indices",
      logo: "https://www.google.com/s2/favicons?domain=spglobal.com&sz=128",
      title: "Analyst, Quantitative Modeling",
      dateRange: "May 2015 – Jun 2017",
      bullets: [
        "Custom Index construction. Pricing pipelines.",
      ],
    },
    {
      company: "Coastal Management LLC",
      logo: "",
      title: "Quantitative Research",
      dateRange: "Jan 2015 – Apr 2015",
      bullets: [
        "Quant Trading. Data.",
      ],
    },
    {
      company: "Rizm Inc.",
      logo: "",
      title: "Data, Quant",
      dateRange: "Mar 2014 – Aug 2014",
      bullets: [
        "Trading platform. Quant data products.",
      ],
    },
  ],
  education: [
    {
      school: "UC Berkeley School of Information",
      logo: "https://www.google.com/s2/favicons?domain=berkeley.edu&sz=128",
      degree: "M.S. in Information and Data Science",
      dateRange: "2021",
      achievements: [],
    },
    {
      school: "Columbia University in the City of New York",
      logo: "https://www.google.com/s2/favicons?domain=columbia.edu&sz=128",
      degree: "M.A. in Mathematics (Financial Mathematics)",
      dateRange: "2014",
      achievements: [],
    },
    {
      school: "National Taiwan Normal University",
      logo: "/images/logos/ntnu.png",
      degree: "B.S. in Physics",
      dateRange: "2013",
      achievements: [
        "Micro Optical Spectroscopic Laboratory",
        "Solid State Laser Physics Laboratory",
      ],
    },
  ],
};
