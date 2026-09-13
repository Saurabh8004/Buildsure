import CinematicHero from '../components/CinematicHero';
import BuildStory from '../components/BuildStory';
import BiddingExperience from '../components/BiddingExperience';
import QualityInspection from '../components/QualityInspection';
import FinalHandover from '../components/FinalHandover';

export default function Home() {
  return (
    <div>
      <CinematicHero />
      <BuildStory />
      <BiddingExperience />
      <QualityInspection />
      <FinalHandover />
    </div>
  );
}
