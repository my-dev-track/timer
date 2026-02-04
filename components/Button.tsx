
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "px-12 py-5 rounded-[3rem] font-black uppercase tracking-[0.15em] text-[11px] transition-all duration-500 active:scale-95 flex items-center justify-center gap-4 italic select-none";
  const variants = {
    primary: "bg-red-600 hover:bg-red-500 text-white shadow-[0_15px_35px_rgba(220,38,38,0.3)] hover:shadow-[0_20px_50px_rgba(220,38,38,0.5)] border border-white/5",
    secondary: "bg-white hover:bg-gray-100 text-black shadow-2xl",
    outline: "border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white shadow-[0_0_20px_rgba(220,38,38,0.1)]"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
