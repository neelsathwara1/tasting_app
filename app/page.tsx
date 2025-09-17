"use client"
import React, { useState, useRef, useEffect, ReactNode, ChangeEvent, MouseEvent } from 'react';

// Type definitions for custom components
interface CardProps { children: ReactNode; className?: string; }
interface CardHeaderProps { children: ReactNode; className?: string; }
interface CardTitleProps { children: ReactNode; className?: string; }
interface CardDescriptionProps { children: ReactNode; className?: string; }
interface CardContentProps { children: ReactNode; className?: string; }
interface LabelProps { children: ReactNode; htmlFor: string; className?: string; }
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { className?: string; }
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { children: ReactNode; className?: string; }

interface SearchableMultiSelectProps {
  options: string[];
  selectedValues: string[];
  onChange: (newSelection: string[]) => void;
  placeholder: string;
}

// Form state types
type SelectedMenuState = Record<string, string[]>;
interface FormState {
  name: string;
  email: string;
  phone: string;
  selectedMenu: SelectedMenuState;
}

// Shadcn UI Component Mocks (for self-contained demonstration)
const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-[#4d2420]/80 backdrop-blur-sm border border-yellow-800/40 rounded-xl shadow-lg ${className}`}>
    {children}
  </div>
);
const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => <div className={`p-6 ${className}`}>{children}</div>;
const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => <h2 className={`text-xl font-bold tracking-tight text-yellow-100 font-serif ${className}`}>{children}</h2>;
const CardDescription: React.FC<CardDescriptionProps> = ({ children, className = '' }) => <p className={`text-sm text-yellow-200/70 ${className}`}>{children}</p>;
const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;
const Label: React.FC<LabelProps> = ({ children, htmlFor, className = '' }) => <label htmlFor={htmlFor} className={`text-sm font-medium leading-none text-yellow-100/90 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>{children}</label>;
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = '', type = 'text', ...props }, ref) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md bg-[#5a3d2b]/40 border border-yellow-800/60 px-3 py-2 text-sm text-yellow-50 ring-offset-yellow-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-yellow-200/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    ref={ref}
    {...props}
  />
));
Input.displayName = 'Input';
const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-yellow-600 to-yellow-500 text-[#42211c] hover:from-yellow-600/90 hover:to-yellow-500/90 shadow-md h-10 px-4 py-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);

// --- New Searchable Multi-Select Component ---
const SearchableMultiSelect: React.FC<SearchableMultiSelectProps> = ({ options, selectedValues, onChange, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (wrapperRef.current && event.target instanceof Node && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const handleSelect = (option: string) => {
    const newSelection = selectedValues.includes(option)
      ? selectedValues.filter((item: string) => item !== option)
      : [...selectedValues, option];
    onChange(newSelection);
  };
    
  const handleRemove = (valueToRemove: string) => {
    onChange(selectedValues.filter((item: string) => item !== valueToRemove));
  };

  const filteredOptions = options.filter((option: string) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative" ref={wrapperRef}>
      <div
        className="flex flex-wrap gap-2 items-center w-full rounded-md bg-[#5a3d2b]/40 border border-yellow-800/60 px-3 py-1.5 text-sm min-h-[40px]"
        role="listbox"
        aria-label={placeholder}
      >
        {selectedValues.map((value: string) => (
          <span key={value} className="flex items-center gap-1.5 bg-yellow-700/60 text-yellow-50 text-xs font-medium px-2 py-1 rounded" aria-label={`Selected: ${value}`}> 
            {value}
            <button onClick={() => handleRemove(value)} type="button" className="text-yellow-200 hover:text-white" aria-label={`Remove ${value}`}>×</button>
          </span>
        ))}
        <input
          type="text"
          placeholder={selectedValues.length === 0 ? placeholder : ''}
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="flex-grow bg-transparent outline-none text-yellow-50 placeholder:text-yellow-200/50"
          aria-label={placeholder}
          aria-autocomplete="list"
        />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-[#4d2420] border border-yellow-800/40 rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1" role="listbox">
            {filteredOptions.length > 0 ? filteredOptions.map((option: string, idx: number) => (
              <li
                key={option}
                className={`px-3 py-2 cursor-pointer text-sm text-yellow-100/90 hover:bg-[#5a3d2b]/60 flex items-center justify-between ${selectedValues.includes(option) ? 'font-semibold' : ''}`}
                onClick={() => handleSelect(option)}
                tabIndex={0}
                role="option"
                aria-selected={selectedValues.includes(option)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleSelect(option);
                  }
                }}
              >
                {option}
                {selectedValues.includes(option) && <span className="text-yellow-500">✓</span>}
              </li>
            )) : (
              <li className="px-3 py-2 text-sm text-yellow-200/70 text-center" role="option" aria-disabled="true">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

// Import menu data from external file
import { eventMenu } from './menuData';


const initialSelectedMenuState: SelectedMenuState = eventMenu.reduce((acc: SelectedMenuState, section) => {
  acc[section.category] = [];
  return acc;
}, {} as SelectedMenuState);


const initialFormState = {
    name: '',
    email: '',
    phone: '',
    selectedMenu: initialSelectedMenuState
};

export default function HomePage() {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState<{ message: string; type: string }>({ message: '', type: '' });
  const [showCustomMenuForm, setShowCustomMenuForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleUserDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };
  
  const handleMultiSelectChange = (category: string, newSelection: string[]) => {
    setFormData(prev => ({
        ...prev,
        selectedMenu: {
            ...prev.selectedMenu,
            [category]: newSelection
        }
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Basic client-side validation
    // Basic required fields
    if (!formData.name || !formData.email || !formData.phone) {
      setStatus({ message: 'Please fill in all required fields.', type: 'error' });
      return;
    }
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ message: 'Please enter a valid email address.', type: 'error' });
      return;
    }
    // Phone number validation (10 digits, numbers only)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setStatus({ message: 'Please enter a valid 10-digit phone number.', type: 'error' });
      return;
    }
    setStatus({ message: 'Submitting your selections...', type: 'info' });
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      let result: any = {};
      try {
        result = await response.json();
      } catch (jsonError) {
        setStatus({ message: 'Server returned an invalid response.', type: 'error' });
        setIsSubmitting(false);
        return;
      }

      if (response.ok && result.success) {
        setStatus({ message: 'Thank you! Your selections have been received.', type: 'success' });
        setFormData(initialFormState);
        setShowCustomMenuForm(false);
        setIsSubmitted(true);
      } else {
        const errorMsg = result?.error || result?.message || 'Something went wrong.';
        setStatus({ message: `Error: ${errorMsg}`, type: 'error' });
      }
    } catch (error) {
      if (error instanceof Error) {
        setStatus({ message: `Network error: ${error.message}`, type: 'error' });
      } else {
        setStatus({ message: 'An unknown error occurred.', type: 'error' });
      }
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lora:wght@400;700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Lora', serif; }
      `}</style>
      <div className="min-h-screen w-full bg-[#52302c] text-yellow-50 font-body">
        <div 
          className="absolute inset-0 -z-10 h-full w-full" 
          style={{
            backgroundImage: "url('https://www.transparenttextures.com/patterns/subtle-dark-matter.png')",
            backgroundColor: '#52302c',
            opacity: 0.2
          }}
        ></div>
        
        <header className="p-4 border-b border-yellow-800/40 sticky top-0 bg-[#52302c]/80 backdrop-blur-sm z-50">
          <nav className="container mx-auto flex justify-between items-center">
            <div className="text-xl font-bold text-yellow-400 tracking-wider font-serif">Rahul Caterers tasting event</div>
            <div><a href="#custom-menu" className="text-yellow-200 hover:text-yellow-400 transition-colors">Create your menu</a></div>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-16 sm:py-24 max-w-7xl">
          {/* Hero Content */}
          <section className="text-center space-y-6 mb-20">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">
              Rahul Caterer's Testing Event
            </h1>
            <p className="text-lg text-yellow-200/80 max-w-3xl mx-auto font-body">
              An exclusive event to savor the rich flavors of Indian heritage. Explore our curated menu or select your favorites to taste.
            </p>
          </section>

          {/* Hardcoded Menu Section */}
          <section id="menu" className="mb-20">
              <div className="text-center mb-12">
                  <h2 className="text-4xl font-serif text-yellow-300">Our Grand Menu</h2>
                  <p className="text-yellow-200/70 mt-2">A culinary journey through our curated selections</p>
              </div>
              
              <Card className="max-w-4xl mx-auto">
                <CardContent className="p-8 sm:p-12">
                    {eventMenu.map((menuSection, sectionIndex) => (
                        <div key={menuSection.category}>
                            <h3 className="text-2xl font-serif text-yellow-200 text-center mb-6">{menuSection.category}</h3>
                            <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-8 mb-8 text-yellow-200/90 text-sm">
                                {menuSection.items.map((itemName, index) => (
                                    <li key={index} className="flex items-start mb-2">
                                        <span className="text-yellow-500 mr-2 mt-1 flex-shrink-0">&#10022;</span>
                                        <span className="leading-snug">{itemName}</span>
                                    </li>
                                ))}
                            </ul>
                            {sectionIndex < eventMenu.length - 1 && (
                                <hr className="border-yellow-800/40 my-8" />
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>
          </section>

          {/* Custom Menu Section */}
          <section id="custom-menu" className="text-center pt-12">
            {isSubmitted ? (
                <div className="space-y-6">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-10 h-10 text-[#42211c]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h2 className="text-4xl font-serif font-bold text-yellow-300">Thank You!</h2>
                    <p className="text-xl text-yellow-200/90 max-w-2xl mx-auto font-body">
                        Your culinary preferences have been received with great enthusiasm! 
                    </p>
                    <p className="text-lg text-yellow-200/80 max-w-2xl mx-auto">
                        We're excited to prepare a personalized tasting experience just for you. Our chef will carefully craft each dish you've selected to ensure an unforgettable gastronomic journey.
                    </p>
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 max-w-2xl mx-auto mt-8">
                        <p className="text-yellow-200/90">
                            <strong className="text-yellow-300">What's Next?</strong><br/>
                            You'll receive a confirmation email shortly with event details and timing. 
                            We can't wait to see you at our tasting event!
                        </p>
                    </div>
                </div>
            ) : !showCustomMenuForm ? (
                <div className="space-y-4">
                    <h2 className="text-3xl font-serif font-bold text-yellow-300">Ready to Choose Your Dishes?</h2>
                    <p className="text-yellow-200/80 max-w-2xl mx-auto">Click the button below to select your favorite items from our menu for the tasting event.</p>
                    <Button onClick={() => setShowCustomMenuForm(true)} className="px-8 py-6 text-base font-bold font-serif">
                        Select My Menu
                    </Button>
                </div>
            ) : (
                <Card className="w-full max-w-3xl mx-auto">
                    <CardHeader>
                        <CardTitle>Select Your Favorites</CardTitle>
                        <CardDescription>Choose the items you'd like to try at our tasting event.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6 text-left">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5"><Label htmlFor="name">Full Name</Label><Input id="name" placeholder="Your Name" value={formData.name} onChange={handleUserDetailChange} required /></div>
                                <div className="space-y-1.5"><Label htmlFor="phone">Phone Number</Label><Input type="tel" id="phone" placeholder="10-digit number" value={formData.phone} onChange={handleUserDetailChange} required /></div>
                            </div>
                            <div className="space-y-1.5"><Label htmlFor="email">Email Address</Label><Input type="email" id="email" placeholder="your@email.com" value={formData.email} onChange={handleUserDetailChange} required /></div>
                            <hr className="border-yellow-800/40 my-6" />
                            
                            <div className="space-y-6">
                                {eventMenu.map((section) => (
                                    <div key={section.category}>
                                        <div className="font-semibold text-lg text-yellow-200 mb-2 block font-serif">{section.category}</div>
                                        <SearchableMultiSelect
                                            options={section.items}
                                            selectedValues={formData.selectedMenu[section.category] || []}
                                            onChange={(newSelection) => handleMultiSelectChange(section.category, newSelection)}
                                            placeholder={`Search and select in ${section.category}...`}
                                        />
                                    </div>
                                ))}
                            </div>
                            
                            <Button type="submit" className="w-full font-semibold !mt-8 font-serif tracking-wider" disabled={isSubmitting}>
                              {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                  <svg className="animate-spin h-5 w-5 text-yellow-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                                  Submitting...
                                </span>
                              ) : 'Submit Selections'}
                            </Button>
                        </form>
                        {status.message && (
                            <p className={`mt-4 text-sm text-center ${status.type === 'success' ? 'text-green-400' : status.type === 'error' ? 'text-red-400' : 'text-yellow-300'}`}>
                                {status.message}
                            </p>
                        )}
                    </CardContent>
                </Card>
            )}
          </section>
        </main>

        <footer className="border-t border-yellow-800/40 py-6 mt-20">
          <div className="container mx-auto text-center text-yellow-200/60 text-sm space-y-2">
              <p>Event Organizer: Rajan Sharma | For inquiries, call: +91 98765 43210</p>
              <p>&copy; {new Date().getFullYear()} The Royal Palate. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

