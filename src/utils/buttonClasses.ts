/**
 * Enterprise-grade button styling utilities for B2B website
 * Provides consistent, premium button styles with better visual hierarchy
 */

export const buttonClasses = {
  // Primary CTA buttons - most important actions
  primary: 'inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-lg bg-foreground text-background font-semibold text-sm md:text-base transition-all duration-200 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
  
  // Secondary CTA buttons - secondary actions
  secondary: 'inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-lg border-2 border-foreground bg-transparent text-foreground font-semibold text-sm md:text-base transition-all duration-200 hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
  
  // Dark theme primary
  darkPrimary: 'inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-lg bg-white text-black font-semibold text-sm md:text-base transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
  
  // Dark theme secondary
  darkSecondary: 'inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-lg border-2 border-white bg-transparent text-white font-semibold text-sm md:text-base transition-all duration-200 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
  
  // Text link buttons
  textLink: 'inline-flex items-center justify-center gap-2 px-4 py-2 text-foreground font-semibold text-sm transition-all duration-200 hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
  
  // Minimal button style for secondary actions
  minimal: 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-panel text-foreground font-medium text-sm transition-all duration-200 hover:bg-panel-strong focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground disabled:opacity-50 disabled:cursor-not-allowed',
};

export const buttonGroupClasses = 'flex flex-wrap gap-3 sm:gap-4';
