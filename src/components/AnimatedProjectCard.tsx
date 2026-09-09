import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Building2, Shield } from 'lucide-react';

interface ProjectCardProps {
  name: string;
  type: string;
  location: string;
  size: string;
  budget: string;
  deadline: string;
  status: string;
  index: number;
}

export default function AnimatedProjectCard({ 
  name, 
  type, 
  location, 
  size, 
  budget, 
  deadline, 
  status,
  index 
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl p-6 border border-border shadow-md hover:shadow-2xl transition-all cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <motion.div
          whileHover={{ rotate: 5 }}
          className="w-12 h-12 bg-blue/10 rounded-xl flex items-center justify-center"
        >
          <Building2 size={20} className="text-blue" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
          className="flex items-center gap-1 px-2 py-1 bg-green/10 rounded-full"
        >
          <Shield size={10} className="text-green" />
          <span className="text-xs font-semibold text-green">{status}</span>
        </motion.div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-navy group-hover:text-blue transition-colors mb-2">
        {name}
      </h3>
      <p className="text-sm text-text-muted flex items-center gap-1 mb-4">
        <MapPin size={12} /> {location}
      </p>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-bg rounded-lg p-2.5">
          <p className="text-[10px] text-text-muted uppercase tracking-wide">Type</p>
          <p className="text-xs font-semibold text-text">{type}</p>
        </div>
        <div className="bg-bg rounded-lg p-2.5">
          <p className="text-[10px] text-text-muted uppercase tracking-wide">Size</p>
          <p className="text-xs font-semibold text-text">{size}</p>
        </div>
      </div>

      <div className="bg-bg rounded-lg p-2.5 mb-4">
        <p className="text-[10px] text-text-muted uppercase tracking-wide">Budget Range</p>
        <p className="text-sm font-bold text-navy">{budget}</p>
      </div>

      <div className="flex items-center gap-2 text-xs text-text-muted mb-4">
        <Clock size={12} />
        <span>Bid deadline: {deadline}</span>
      </div>

      {/* CTA */}
      <motion.div
        whileHover={{ x: 5 }}
        className="flex items-center justify-between pt-4 border-t border-border"
      >
        <span className="text-xs font-semibold text-orange">View Project</span>
        <ArrowRight size={16} className="text-orange group-hover:translate-x-1 transition-transform" />
      </motion.div>
    </motion.div>
  );
}
