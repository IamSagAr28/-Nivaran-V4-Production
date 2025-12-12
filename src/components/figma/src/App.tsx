import { AuthForm } from "./components/AuthForm";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

export default function App() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image with Overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1622127800610-3022cb75dc90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzYzMTI0NDAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Modern workspace"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
                <div className="w-6 h-6 rounded bg-primary-foreground" />
              </div>
              <span className="tracking-tight">YourBrand</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="max-w-lg">
              Start your journey with us today
            </h2>
            <p className="max-w-md text-primary-foreground/80">
              Join thousands of users who trust our platform for their daily workflow. 
              Experience seamless collaboration and productivity.
            </p>
            
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-primary-foreground/60">Active Users</div>
                <div>50,000+</div>
              </div>
              <div className="w-px h-12 bg-primary-foreground/20" />
              <div>
                <div className="text-primary-foreground/60">Countries</div>
                <div>120+</div>
              </div>
              <div className="w-px h-12 bg-primary-foreground/20" />
              <div>
                <div className="text-primary-foreground/60">Satisfaction</div>
                <div>98%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <div className="w-6 h-6 rounded bg-primary-foreground" />
            </div>
            <span className="tracking-tight">YourBrand</span>
          </div>
          
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
