# MyRetroKit: Data-Driven Energy Retrofit Toolkit

![MyRetroKit](https://img.shields.io/badge/Status-Live-success)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38B2AC)

**Live URL:** [https://www.myretrokit.in/](https://www.myretrokit.in/)

MyRetroKit is a comprehensive, interactive web application designed to help homeowners, policy-makers, and industry stakeholders select context-appropriate and cost-effective energy retrofit solutions. 

Built specifically for low-rise residential buildings (G+3 and below) in the warm-humid climatic regions of India, the platform translates complex energy simulation data into an accessible, visual, and highly responsive user interface. This application serves as the interactive frontend for ongoing doctoral research aimed at contributing to India's transition toward a net-zero future by advancing informed, inclusive, and scalable design approaches for the existing housing stock.

---

## 🏛️ Application Architecture & Workflow

The application operates on a zero-database architecture to ensure maximum performance and instant lookup speeds. 
1. **Data Ingestion:** Complex building simulation parameters (from Excel) are pre-processed via a custom SheetJS pipeline into a lightweight static JSON catalog.
2. **User Configuration:** Users progress through a multi-step TypeScript wizard, defining their building parameters (number of storeys, built-up area, and specific retrofit components like window glazing, wall insulation, and roof types).
3. **Calculation Engine:** The system applies dynamic mathematical fallback logic to compute multi-variable energy reductions, outputting precise annual energy and cost savings.
4. **Parametric Visualization:** The results are projected onto dynamic inline SVGs, visually mapping the selected retrofit components to their exact locations on the building illustration.

---

## 🚀 Key Technical Features

* **Interactive Configuration Wizard:** Engineered a multi-step TypeScript configuration wizard using Next.js 16 and React 19 to assess building retrofit energy and cost savings through URL-based search parameter synchronization.
* **Dynamic Parametric Visualizations:** Designed a responsive, interactive UI using Tailwind CSS v4. It utilizes dynamic inline SVGs and cubic bezier curves to programmatically map specific building components (roofs, walls, glazing) to real-time performance metrics relative to the chosen floor count.
* **Automated Data Pipeline:** Built a data ingestion pipeline using SheetJS to parse complex Excel simulation data across multiple sheets. The pipeline handles custom sanitization and unit-correction mappings, compiling into a static JSON catalog that achieves zero-database latency.
* **Robust Calculation Engine:** Implemented a type-safe TypeScript calculation module to evaluate annual energy demand reductions. The engine features dynamic mathematical fallback logic capable of computing multi-variable energy reductions across varied building configurations when pre-compiled vectors are absent.

---

## 🛠️ Technology Stack

* **Framework:** Next.js 16 (App Router)
* **UI Library:** React 19
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4
* **Data Parsing:** SheetJS (xlsx)
* **Deployment:** Vercel (Continuous Deployment via GitHub)
* **Domain & DNS:** GoDaddy

---

## 👥 The Team & Research Context

This toolkit is the primary output for Shalini Keshri's doctoral thesis, developed under the guidance of Dr. Priyanka Dey, with the software architecture and full-stack development engineered by Shivam.

### **Shalini Keshri** – *Research Scholar & Domain Expert*
Shalini is a doctoral candidate in the Department of Architecture and Regional Planning at the Indian Institute of Technology Kharagpur (IIT Kharagpur). She holds a Bachelor's degree in Architecture (B. Arch) and a Master's degree in Urban and Regional Planning (M. Tech). She is a registered Architect with the Council of Architecture, an Associate Member of the Institute of Town Planners, India (AMITPI), and an IGBC Accredited Professional (IGBC AP). 

Her academic journey and professional orientation consistently center on sustainability in the built environment, focusing on climate-responsive and energy-efficient design. Her current research focuses on energy-efficient retrofit strategies for low-rise residential buildings in India's warm-humid climatic regions, ultimately aiming to develop practical, data-driven toolkits for industry stakeholders.

### **Dr. Priyanka Dey** – *Assistant Professor & Project Advisor*
Dr. Priyanka Dey is an Assistant Professor in the Department of Architecture and Regional Planning at IIT Kharagpur. With an academic foundation in Architecture (B. Arch) and a Master's degree in City Planning (MCP), followed by a PhD from IIT Kharagpur, she has developed a research profile grounded in the interdisciplinary relationships between people, place, and planning.

Her research encompasses a broad spectrum of urban and social issues, including housing and community planning, slum redevelopment, and the socio-cultural consequences of development-induced displacement. Her work also examines urban morphology and the socio-economic effects of infrastructural development, with an evolving focus on sustainable and energy-efficient urban development practices.

### **Shivam** – *Lead Full-Stack Developer*
Shivam is an undergraduate student at IIT Kharagpur, enrolled in the 5-year BS-MS dual degree program in Applied Geology within the Department of Geology and Geophysics. 

As the sole software engineer for MyRetroKit, Shivam architected the Next.js application, designed the interactive visualization interfaces, built the mathematical calculation engines, and managed the deployment infrastructure (Vercel/GoDaddy) to bring the academic research into a highly performant, production-ready web application.

---

## 💻 Local Development Setup

To run this project locally on your machine for development or testing:

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd clean-retro-kit