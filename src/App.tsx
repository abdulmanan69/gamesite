import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GtaSpecialSection } from './components/GtaSpecialSection';
import { RigStatusTracker } from './components/RigStatusTracker';
import { GameCatalog } from './components/GameCatalog';
import { TournamentSection } from './components/TournamentSection';
import { FuelBarSection } from './components/FuelBarSection';
import { PricingSection } from './components/PricingSection';
import { BookingModal } from './components/BookingModal';
import { TrailerModal } from './components/TrailerModal';
import { Footer } from './components/Footer';
import type { GamingRig, PricingPlan, Game, Tournament, FuelItem } from './data/gamingData';
import { Check } from 'lucide-react';
import { BootScreen } from './components/BootScreen';
import { rs } from './data/money';
import { ShaderGrid } from './components/ShaderGrid';
import { Marquee } from './components/Marquee';

export function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [trailerModalOpen, setTrailerModalOpen] = useState(false);
  const [selectedRig, setSelectedRig] = useState<GamingRig | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [bookingCategory, setBookingCategory] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleOpenBooking = (category?: string) => {
    setSelectedRig(null);
    setSelectedPlan(null);
    setBookingCategory(category);
    setBookingModalOpen(true);
  };

  const handleSelectRig = (rig: GamingRig) => {
    setSelectedRig(rig);
    setSelectedPlan(null);
    setBookingCategory(rig.name.includes('Vice City') ? 'gta6-vip' : undefined);
    setBookingModalOpen(true);
  };

  const handleSelectPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setSelectedRig(null);
    setBookingCategory(plan.isGtaSpecial ? 'gta6-vip' : undefined);
    setBookingModalOpen(true);
  };

  const handleSelectGame = (game: Game) => {
    showToast(`${game.title} will be ready on your station`);
    handleOpenBooking();
  };

  const handleRegisterTournament = (tourney: Tournament) => {
    showToast(`Registered for ${tourney.title}`);
    handleOpenBooking('tourney-reg');
  };

  const handleAddFuelItem = (item: FuelItem) => {
    showToast(`${item.name} added to your order · ${rs(item.price)}`);
  };

  const scrollToGta = () => {
    const el = document.getElementById('gta6-zone');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
    {/* Shader sits outside the content wrapper so nothing in the page can paint under it */}
    <ShaderGrid />
    <div className="relative z-[1] min-h-screen text-fg flex flex-col font-sans">
      <BootScreen />
      
      {/* Toast Notification */}
      {toastMessage && (
        <div role="status" className="fixed bottom-6 right-6 left-6 sm:left-auto z-50 flex items-center gap-3 px-4 h-12 rounded-xl bg-ink-raised border border-line text-sm text-fg shadow-[0_8px_24px_rgba(0,0,0,0.4)] animate-rise">
          <Check className="w-4 h-4 text-ok shrink-0" strokeWidth={1.5} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar with Sound Control & GTA Urgent Top Bar */}
      <Navbar 
        onOpenBooking={() => handleOpenBooking()}
        onOpenGtaModal={() => {
          handleOpenBooking('gta6-vip');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero 
          onOpenBooking={() => handleOpenBooking()}
          onOpenTrailer={() => setTrailerModalOpen(true)}
          onExploreGta={scrollToGta}
        />

        <Marquee />

        {/* Featured GTA VI Launch Spotlight Section */}
        <GtaSpecialSection 
          onOpenBooking={(prefill) => handleOpenBooking(prefill)}
          onOpenTrailer={() => setTrailerModalOpen(true)}
        />

        {/* Live Battle Station Telemetry & Cockpits Tracker */}
        <RigStatusTracker 
          onSelectRig={handleSelectRig}
        />

        {/* 500+ Game Library Catalog with Live Search & Filter */}
        <GameCatalog 
          onSelectGame={handleSelectGame}
          onOpenGta={scrollToGta}
        />

        {/* Weekly Esports Tournaments Grid */}
        <TournamentSection 
          onRegister={handleRegisterTournament}
        />

        {/* Cyber Fuel & Snack Bar */}
        <FuelBarSection 
          onAddFuelItem={handleAddFuelItem}
        />

        {/* Membership & Session Pass Pricing */}
        <PricingSection 
          onSelectPlan={handleSelectPlan}
        />

      </main>

      {/* Footer */}
      <Footer 
        onOpenBooking={() => handleOpenBooking()}
        onOpenGta={scrollToGta}
      />

      {/* Interactive Rig Booking / Reservation Modal */}
      <BookingModal 
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedRig={selectedRig}
        preselectedPlan={selectedPlan}
        preselectedCategory={bookingCategory}
      />

      {/* GTA VI 4K Official Trailer Modal */}
      <TrailerModal 
        isOpen={trailerModalOpen}
        onClose={() => setTrailerModalOpen(false)}
        onBookLaunch={() => {
          handleOpenBooking('gta6-vip');
        }}
      />
    </div>
    </>
  );
}

export default App;
