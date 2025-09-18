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

// Shadcn UI Component Mocks (redesigned with cream-golden theme)
const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl shadow-2xl transition-all duration-300 ${className}`}>
    {children}
  </div>
);
const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => <div className={`p-6 ${className}`}>{children}</div>;
const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => <h2 className={`text-xl font-bold tracking-tight text-golden-800 font-serif ${className}`}>{children}</h2>;
const CardDescription: React.FC<CardDescriptionProps> = ({ children, className = '' }) => <p className={`text-sm text-warm-brown-600 ${className}`}>{children}</p>;
const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;
const Label: React.FC<LabelProps> = ({ children, htmlFor, className = '' }) => <label htmlFor={htmlFor} className={`text-sm font-medium leading-none text-warm-brown-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>{children}</label>;
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = '', type = 'text', ...props }, ref) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md bg-cream-100 border border-golden-400 px-3 py-2 text-sm text-warm-brown-800 ring-offset-cream-100 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-warm-brown-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${className}`}
    ref={ref}
    {...props}
  />
));
Input.displayName = 'Input';
const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-golden-700 text-white hover:bg-golden-800 shadow-md h-10 px-4 py-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);// --- New Searchable Multi-Select Component ---
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
        className="flex flex-wrap gap-2 items-center w-full rounded-md bg-cream-100 border border-golden-400 px-3 py-1.5 text-sm min-h-[40px]"
        role="listbox"
        aria-label={placeholder}
      >
        {selectedValues.map((value: string) => (
          <span key={value} className="flex items-center gap-1.5 bg-warm-brown-700 text-cream-50 text-xs font-medium px-2 py-1 rounded" aria-label={`Selected: ${value}`}> 
            {value}
            <button onClick={() => handleRemove(value)} type="button" className="text-cream-100 hover:text-white" aria-label={`Remove ${value}`}>×</button>
          </span>
        ))}
        <input
          type="text"
          placeholder={selectedValues.length === 0 ? placeholder : ''}
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="flex-grow bg-transparent outline-none text-warm-brown-800 placeholder-warm-brown-400"
          aria-label={placeholder}
          aria-autocomplete="list"
        />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-cream-50 border border-golden-400 rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1" role="listbox">
            {filteredOptions.length > 0 ? filteredOptions.map((option: string, idx: number) => (
              <li
                key={option}
                className={`px-3 py-2 cursor-pointer text-sm text-warm-brown-800 hover:bg-cream-200 flex items-center justify-between ${selectedValues.includes(option) ? 'font-semibold bg-golden-300' : ''}`}
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
                {selectedValues.includes(option) && <span className="text-golden-700">✓</span>}
              </li>
            )) : (
              <li className="px-3 py-2 text-sm text-warm-brown-400 text-center" role="option" aria-disabled="true">No results found</li>
            )}
          </ul>
          {/* Done button to close dropdown */}
          <div className="border-t border-golden-200 p-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full px-3 py-2 text-sm bg-golden-400 hover:bg-golden-500 text-warm-brown-800 rounded-md font-medium transition-colors"
            >
              Done ({selectedValues.length} selected)
            </button>
          </div>
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
      <div className="min-h-screen w-full bg-cream-50 text-warm-brown-800 font-body">
        <div 
          className="absolute inset-0 -z-10 h-full w-full" 
          style={{
            backgroundImage: "linear-gradient(135deg, rgba(245, 240, 232, 1) 0%, rgba(240, 230, 210, 1) 25%, rgba(232, 213, 183, 1) 50%, rgba(225, 200, 165, 1) 100%)",
            opacity: 0.3
          }}
        ></div>
        
                <header className="p-4 border-b-2 border-golden-400 sticky top-0 bg-cream-50/95 backdrop-blur-md z-50 shadow-lg">
          <nav className="container mx-auto flex justify-center items-center">
            <div className="flex items-center space-x-4">
              <img src="/rahul-caterers-logo.png" alt="Rahul Caterers Logo" className="h-12 w-auto" />
              <div className="text-xl font-bold text-golden-800 tracking-wider font-serif text-center drop-shadow-sm">
                Rahul Caterer's Tasting Event
              </div>
            </div>
          </nav>
        </header>


        <main className="container mx-auto px-4 py-16 sm:py-24 max-w-7xl relative">
          {/* Hero Content */}
          <section className="text-center space-y-8 mb-20 relative">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-tight text-golden-700">
              Rahul Caterers
            </h1>
            <h1 className="text-3xl sm:text-4xl font-serif text-golden-700 tracking-wide">
              Presents
            </h1>
            
            <div className="space-y-4 max-w-4xl mx-auto">
              <h3 className="text-3xl sm:text-4xl font-serif text-golden-700 font-bold m-8">
                A Special Evening of Flavours
              </h3>
              {/* <p className="text-lg text-warm-brown-700 font-body leading-relaxed">
                Hello Food Lovers, We’re Excited To Invite You To Our Exclusive Food Tasting Event, Where Every Bite Tells A Story! Come, Explore Our Menu, Enjoy Our Signature Dishes & Help Us Make Your Next Event Truly Unforgettable. on 20th September 2025 6.30 pm onwards.
              </p> */}
                <p className="text-xl font-serif text-warm-brown-700">
                    <strong>Hello Food Lovers,</strong>
                </p>
                
                <p className="text-lg font-serif text-warm-brown-700 font-body leading-relaxed">
                    We’re Excited To Invite You To Our Exclusive Food Tasting Event, Where Every Bite Tells A Story! Come, Explore Our Menu, Enjoy Our Signature Dishes & Help Us Make Your Next Event Truly Unforgettable.
                </p>

                <p className="text-lg font-serif text-warm-brown-700">
                    on <strong>20th September 2025</strong> at <strong>6.30 pm onwards.</strong>
                </p>

                <div className="space-y-4">
                    <p className="text-2xl font-serif font-bold text-golden-700">
                        :: Venue ::
                    </p>
                    <p className="text-lg font-serif text-warm-brown-700">
                        <strong>Shree Balaji Garden,<br />
                        Virod Road, Harni, Vadodara</strong>
                    </p>
                </div>

                <div className="space-y-4">
                    <p className="text-2xl font-serif font-bold text-golden-700">
                        :: Hosted by ::
                    </p>
                    <p className="text-lg font-serif text-warm-brown-700">
                        <strong>Rahul Caterers, Vadodara.</strong>
                    </p>
                    <p className="text-lg font-sans-serif text-warm-brown-700">
                        <strong>
                        M : 99255 54186, 98255 67629, 85307 07029</strong>
                    </p>
                </div>
                
                <p className="text-2xl font-serif text-warm-brown-700">
                    <strong>Bring your appetite - we’ll bring the flavours!</strong>
                </p>

            </div>
          </section>

          {/* Menu Section */}
          <section id="menu" className="mb-20">
              <div className="text-center mb-12 relative">
                  <h2 className="text-4xl font-serif text-golden-700 drop-shadow-sm">Prepared with Passion, Delivered With Pride</h2>
                  <p className="text-3xl font-serif text-golden-700 mt-2"><strong>Our Signature Menu</strong></p>
              </div>
              
              <div className="max-w-4xl mx-auto bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl shadow-2xl p-8 sm:p-12">
                    {eventMenu.map((menuSection, sectionIndex) => (
                        <div key={menuSection.category} className="mb-8 last:mb-0">
                            <h3 className="text-2xl font-serif text-golden-700 text-center mb-6 font-bold drop-shadow-sm">{menuSection.category}</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-warm-brown-700 text-sm">
                                {menuSection.items.map((itemName, index) => (
                                    <li key={index} className="flex items-start group hover:bg-golden-50/50 p-2 rounded-md transition-all duration-200">
                                        <span className="text-golden-600 mr-3 mt-0.5 flex-shrink-0 group-hover:text-golden-700 transition-colors">◆</span>
                                        <span className="leading-relaxed group-hover:text-warm-brown-800 transition-colors">{itemName}</span>
                                    </li>
                                ))}
                            </ul>
                            {sectionIndex < eventMenu.length - 1 && (
                                <div className="border-b border-golden-300/30 mt-8"></div>
                            )}
                        </div>
                    ))}
              </div>
          </section>

          {/* Custom Menu Section */}
          <section id="custom-menu" className="text-center pt-12">
            {isSubmitted ? (
                <div className="space-y-6">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-r from-golden-400 to-golden-300 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-10 h-10 text-warm-brown-800" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h2 className="text-4xl font-serif font-bold text-golden-600">Thank You for Your Response!</h2>
                    <p className="text-xl text-warm-brown-700 max-w-2xl mx-auto font-body">
                        We have received your menu preferences and are delighted by your interest in our tasting event.
                    </p>
                    <div className="bg-golden-50 border border-golden-200 rounded-lg p-6 max-w-2xl mx-auto mt-8">
                        <p className="text-warm-brown-700">
                            <strong className="text-golden-700">Thank you once again!</strong><br/>
                            you will be contacted shortly with more details about your selections and the event.
                        </p>
                    </div>
                </div>
            ) : !showCustomMenuForm ? (
                <div className="space-y-4">
                    <h2 className="text-3xl font-serif font-bold text-golden-600">Please Share Your Preferences</h2>
                    <p className="text-warm-brown-600 max-w-2xl mx-auto">Help us customize your tasting experience by selecting your preferred dishes from our signature menu.</p>
                    <Button onClick={() => setShowCustomMenuForm(true)} className="px-8 py-6 text-base font-bold font-serif">
                        Create your own menu
                    </Button>
                </div>
            ) : (
                <Card className="w-full max-w-3xl mx-auto">
                    <CardHeader>
                        <CardTitle>Your Menu Preferences</CardTitle>
                        <CardDescription>Please select the dishes you liked at our event</CardDescription>
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
                                        <div className="font-semibold text-lg text-golden-700 mb-2 block font-serif">{section.category}</div>
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
                                  <svg className="animate-spin h-5 w-5 text-cream-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                                  Submitting...
                                </span>
                              ) : 'Submit Selections'}
                            </Button>
                        </form>
                        {status.message && (
                            <p className={`mt-4 text-sm text-center ${status.type === 'success' ? 'text-green-600' : status.type === 'error' ? 'text-red-600' : 'text-golden-600'}`}>
                                {status.message}
                            </p>
                        )}
                    </CardContent>
                </Card>
            )}
          </section>
        </main>

        <footer className="border-t border-golden-200 py-8 mt-20">
          <div className="container mx-auto text-center text-warm-brown-500 text-sm space-y-3">
              <div className="flex justify-center mb-4">
                <img 
                  src="/rahul-caterers-logo.png" 
                  alt="Rahul Caterers" 
                  className="h-8 w-auto object-contain opacity-70"
                />
              </div>
              <p className="font-semibold text-golden-700">Rahul Caterers</p>
              <p>Contact: +91 85307 07029</p>
              <p className="text-xs text-warm-brown-400 mt-4">&copy; {new Date().getFullYear()} Rahul Caterers. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

