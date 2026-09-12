import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

export default function Messages() {
  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-navy">Messages</h1>
        <p className="text-text-muted mt-1">Communicate with contractors and team members</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-border p-12 text-center"
      >
        <MessageSquare size={64} className="text-text-muted mx-auto mb-4" />
        <h3 className="text-xl font-bold text-navy mb-2">No messages yet</h3>
        <p className="text-text-muted">
          Messages will appear here once you have conversations
        </p>
      </motion.div>
    </div>
  );
}
