import { Link } from "react-router-dom";

const Page = () => {
    

    return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-accent rounded-full blur-2xl opacity-30 animate-[float_8s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/30 rounded-full blur-xl opacity-40 animate-[float_4s_ease-in-out_infinite_1s]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-12 max-w-2xl mx-auto">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="relative">
            {/* Glow Effect Behind Title */}
            <div className="absolute inset-0 bg-gradient-primary blur-3xl opacity-30 scale-110 animate-pulse-slow" />
            <h1 className="relative text-7xl md:text-8xl lg:text-9xl font-bold text-glow bg-gradient-accent bg-clip-text text-transparent animate-fade-in animate-scale-in">
              Welcome
            </h1>
          </div>
          
          <div className="relative">
            <p className="text-xl md:text-2xl text-text-secondary font-medium leading-relaxed animate-fade-in opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
              Discover my favorite characters and find why they are so special.
            </p>
            {/* Subtle underline animation */}
            <div className="mx-auto mt-4 h-0.5 w-0 bg-gradient-accent animate-[expand_1s_ease-out_0.8s_forwards]" />
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="space-y-8 animate-fade-in opacity-0 [animation-delay:0.6s] [animation-fill-mode:forwards]">
          <div className="relative group">
            {/* Floating glow effect */}
            <div className="absolute -inset-2 bg-gradient-primary rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-all duration-500" />
            
            <Link
              to="/characters"
              className="relative inline-flex items-center justify-center px-12 py-5 bg-gradient-accent text-accent-foreground font-bold text-lg rounded-2xl shadow-ranking hover:shadow-glow transition-all duration-500 hover:scale-105 hover:-translate-y-1 transform-gpu"
            >
              <span className="relative z-10">Go to My Fav Characters</span>
              
              {/* Button shine effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-[shine_1s_ease-out]" />
            </Link>
          </div>
          
          {/* Subtle call to action hint */}
          <div className="flex items-center justify-center space-x-2 text-text-secondary/60 animate-bounce [animation-delay:1.5s]">
            <div className="w-1 h-1 bg-current rounded-full animate-pulse" />
            <span className="text-sm font-medium">Start your journey</span>
            <div className="w-1 h-1 bg-current rounded-full animate-pulse [animation-delay:0.5s]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;