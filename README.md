# Resu-Me: AI-Powered Resume Assistant

> Resu You, Resu Me - Your intelligent companion for crafting the perfect resume

Resu-Me is a modern, AI-powered web application that helps job seekers create professional, ATS-optimised resumes that get noticed by recruiters and pass through automated screening systems.

## Features

### 📝 **CV Builder**
- Step-by-step guided form to build a professional resume from scratch
- Live preview that updates as you type
- 5 comprehensive sections: Personal Info, Education, Experience, Skills, and Projects
- Download options for PDF and DOCX formats

### 🎯 **CV Optimiser**
- Upload your existing CV and target job description
- Get instant keyword match score (0-100%)
- See which keywords you've matched and which you're missing
- Before/after comparison with ATS-optimised suggestions

### 🔍 **Feedback Tool**
- Comprehensive CV analysis with detailed feedback
- ATS compatibility checks
- Formatting and content recommendations
- Severity-based issue categorisation (Error, Warning, Info)
- Actionable suggestions for improvement

### 🚀 **Coming Soon: Interview Prep**
- AI-powered mock interviews
- Real-time feedback and coaching
- Question bank with real interview questions
- Answer structure training with STAR method

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- pnpm, npm, or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/resu-me.git
cd resu-me
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
# or
yarn install
```

3. **Start the development server**
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

### Building Your CV
1. Click "Build my CV" on the home page
2. Follow the 5-step form:
   - **Personal Info**: Add your contact details
   - **Education**: List your qualifications
   - **Experience**: Detail your work history
   - **Skills**: Categorise your technical and soft skills
   - **Projects**: Showcase your portfolio work
3. Watch your CV update in real-time in the preview panel
4. Download as PDF or DOCX when complete

### Optimising Existing CV
1. Click "Optimise my CV" on the home page
2. Upload your current CV (PDF, DOCX, or TXT)
3. Paste the target job description
4. Click "Optimise CV" to get your analysis
5. Review your keyword match score and recommendations
6. Download the optimised version

### Getting Feedback
1. Click "Get Feedback" on the home page
2. Upload your CV
3. Optionally add a job description for targeted analysis
4. Click "Get Feedback" for comprehensive analysis
5. Review detailed feedback cards with actionable suggestions

## 🛠 Technical Stack

### Frontend Framework
**Next.js 16** - A React framework that provides:
- Server-side rendering for better SEO and performance
- File-based routing system
- API routes for future backend integration
- Built-in optimisations for production

### User Interface
**React 19** with **TypeScript** for:
- Type-safe development
- Component-based architecture
- Modern hooks and concurrent features
- Excellent developer experience

### Styling & Design
**Tailwind CSS v4** with **shadcn/ui** components:
- Utility-first CSS framework for rapid styling
- Beautiful, accessible component library
- Dark/light theme support
- Consistent design system
- Responsive design out of the box

### Icons & Graphics
**Lucide React** - A comprehensive icon library providing:
- 1000+ consistent, beautiful icons
- Tree-shakeable for optimal bundle size
- SVG-based for crisp rendering at any size

### Development Tools
- **ESLint** - Code quality and consistency
- **TypeScript** - Type safety and better IDE support
- **Vercel Analytics** - Performance monitoring
- **PostCSS** - CSS processing and optimisation

### How It Works Behind the Hood

1. **Component Architecture**: The app uses a modular component structure where each feature (Builder, Optimiser, Feedback) is a separate page with its own components

2. **State Management**: React hooks manage local state for form data, file uploads, and analysis results. No complex state management library needed for the current scope

3. **File Processing**: File uploads are handled client-side using the FileReader API, converting documents to text for analysis

4. **Simulated AI Analysis**: Currently uses keyword matching algorithms and rule-based analysis to simulate AI feedback. Future versions will integrate real AI APIs

5. **Responsive Design**: Tailwind's responsive utilities ensure the app works perfectly on desktop, tablet, and mobile devices

6. **Performance**: Next.js optimisations like code splitting, image optimisation, and static generation ensure fast load times

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**
- Visit [vercel.com](https://vercel.com)
- Click "New Project"
- Connect your GitHub repository
- Vercel will automatically detect it's a Next.js app
- Click "Deploy"

That's it! 🎉 Vercel will:
- Automatically build and deploy your app
- Provide a production URL
- Set up automatic deployments on git push
- Handle SSL certificates and CDN

### Environment Variables (Future)
When you add backend features, add these in Vercel:
```
OPENAI_API_KEY=your_openai_key
DATABASE_URL=your_database_url
```

### Manual Deployment
For other platforms, build the app:
```bash
pnpm build
pnpm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Built with ❤️ to help job seekers land their dream jobs**
