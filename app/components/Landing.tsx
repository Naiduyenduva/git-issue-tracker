import { Github, Mail, Bell, Shield, Zap, Star, Code, GitPullRequest } from 'lucide-react';
import Link from 'next/link';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 scroll-smooth">
      {/* Header/Navigation */}
      <nav className="bg-white/50 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500/10 p-2 rounded-lg">
                <Github className="w-8 h-8 text-blue-600" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">IssueTracker</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
              <Link href='/client/signup'>
              <button className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/25">
                Get Started
              </button></Link>
              <Link href='/client/login'>
              <button className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/25">
                Login
              </button></Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-grid-gray-200/50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-8">
              <Star className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-blue-700 font-medium">Never miss important issues again</span>
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Open Source
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text"> Issue Radar</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Get instant notifications when new issues are created in your favorite repositories. Stay ahead of the curve and contribute effectively to open source.
            </p>
            <div className="flex justify-center space-x-6">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/25 flex items-center space-x-3 font-medium">
                <Github className="w-5 h-5" />
                <span>Connect with GitHub</span>
              </button>
              <button className="bg-white text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all border border-gray-200 flex items-center space-x-3">
                <Code className="w-5 h-5" />
                <span>View Documentation</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features for Developers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to stay on top of open source issues and contribute effectively to your favorite projects.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-500/50 transition-colors group shadow-sm hover:shadow-md">
            <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Notifications</h3>
            <p className="text-gray-600 leading-relaxed">
              Receive instant email alerts with detailed issue information, perfectly formatted for quick understanding.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-500/50 transition-colors group shadow-sm hover:shadow-md">
            <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
              <GitPullRequest className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Custom Filters</h3>
            <p className="text-gray-600 leading-relaxed">
              Set up advanced filters based on labels, assignees, and keywords to focus on issues that matter to you.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-500/50 transition-colors group shadow-sm hover:shadow-md">
            <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Updates</h3>
            <p className="text-gray-600 leading-relaxed">
              Get notifications in real-time with our advanced webhook integration and smart caching system.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="relative bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple Setup, Powerful Results</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get started in minutes and never miss an important issue again. Our streamlined process makes it easy to stay connected.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="relative">
              <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
                <Github className="w-10 h-10 text-blue-600" />
              </div>
              <div className="absolute top-10 left-24 w-full md:w-32 h-0.5 bg-gradient-to-r from-blue-500 to-transparent hidden md:block" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Create Account</h3>
              <p className="text-gray-600 leading-relaxed">
                Securely create an account with just a few clicks.
              </p>
            </div>
            <div className="relative">
              <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <div className="absolute top-10 left-24 w-full md:w-32 h-0.5 bg-gradient-to-r from-blue-500 to-transparent hidden md:block" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Add Repositories</h3>
              <p className="text-gray-600 leading-relaxed">
                Add your favorite open source repositories to track and set up your notification preferences.
              </p>
            </div>
            <div>
              <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
                <Bell className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Stay Updated</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive instant notifications when new issues are created in your selected repositories.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-gray-200/10" />
          <div className="relative">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Level Up Your Open Source Game?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who use IssueTracker to stay updated and contribute effectively to their favorite projects.
            </p>
            <Link href='/client/signup'>
            <button className="cursor-pointer bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-medium">
              Get Started - It&apos;s Free
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-blue-500/10 p-2 rounded-lg">
                <Github className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
                IssueTracker
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Documentation</a>
            </div>
            <p className="text-gray-600 mt-4 md:mt-0">© 2025 IssueTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing