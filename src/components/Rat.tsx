import { motion } from 'framer-motion';

const Rat = () => {
  return (
    <motion.div
      className="w-40 h-32 relative"
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Rat Body */}
      <motion.div
        className="absolute bottom-0 w-24 h-14 bg-[#D3CDCD] rounded-[2rem] shadow-lg"
        style={{ left: '50%', transform: 'translateX(-50%)' }}
      >
        {/* Back */}
        <div 
          className="absolute -top-1 right-0 w-14 h-12 bg-[#D3CDCD] rounded-t-[2rem]"
        />

        {/* Belly */}
        <div 
          className="absolute bottom-0 w-20 h-8 bg-[#F0EDED] rounded-[2rem]"
          style={{ left: '50%', transform: 'translateX(-50%)' }}
        />
        
        {/* Front Legs */}
        <div className="absolute bottom-0 left-4 w-1.5 h-3.5 bg-[#D3CDCD] rounded-b-lg" />
        <div className="absolute bottom-0 left-7 w-1.5 h-3 bg-[#D3CDCD] rounded-b-lg" />
        
        {/* Back Legs */}
        <div className="absolute bottom-0 right-4 w-2 h-4 bg-[#D3CDCD] rounded-b-lg" />
        <div className="absolute bottom-0 right-7 w-2 h-3.5 bg-[#D3CDCD] rounded-b-lg" />
        
        {/* Paws */}
        <div className="absolute bottom-0 left-4 w-1.5 h-1 bg-[#FFE2E2] rounded-full" />
        <div className="absolute bottom-0 left-7 w-1.5 h-1 bg-[#FFE2E2] rounded-full" />
        <div className="absolute bottom-0 right-4 w-2 h-1 bg-[#FFE2E2] rounded-full" />
        <div className="absolute bottom-0 right-7 w-2 h-1 bg-[#FFE2E2] rounded-full" />
      </motion.div>
      
      {/* Rat Head */}
      <motion.div
        className="absolute bottom-7 w-14 h-11 bg-[#D3CDCD] rounded-[2rem] shadow-md"
        style={{ left: '35%', transform: 'translateX(-50%)' }}
        animate={{
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Extended Snout */}
        <div className="absolute -bottom-1 left-1/2 w-10 h-4 bg-[#D3CDCD] rounded-[1rem]"
             style={{ transform: 'translateX(-30%)' }}>
          {/* Nose */}
          <div className="absolute right-1 top-1/2 w-2.5 h-1.5 bg-[#FF9898] rounded-full transform -translate-y-1/2" />
        </div>
        
        {/* Eyes */}
        <div className="absolute top-2.5 left-2.5 w-2.5 h-3 bg-black rounded-full overflow-hidden flex justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full translate-y-[2px]" />
          <div className="absolute w-full h-full bg-[#D3CDCD] rounded-full opacity-20" /> {/* Eye shine */}
        </div>
        <div className="absolute top-2.5 left-6.5 w-2.5 h-3 bg-black rounded-full overflow-hidden flex justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full translate-y-[2px]" />
          <div className="absolute w-full h-full bg-[#D3CDCD] rounded-full opacity-20" /> {/* Eye shine */}
        </div>
        
        {/* Whiskers */}
        <div className="absolute top-4 -left-8 w-8 h-4 flex flex-col justify-between">
          <div className="w-full h-[0.5px] bg-[#A8A4A4] transform rotate-2" />
          <div className="w-full h-[0.5px] bg-[#A8A4A4]" />
          <div className="w-full h-[0.5px] bg-[#A8A4A4] transform -rotate-2" />
        </div>
        <div className="absolute top-4 right-0 w-8 h-4 flex flex-col justify-between">
          <div className="w-full h-[0.5px] bg-[#A8A4A4] transform -rotate-2" />
          <div className="w-full h-[0.5px] bg-[#A8A4A4]" />
          <div className="w-full h-[0.5px] bg-[#A8A4A4] transform rotate-2" />
        </div>
        
        {/* Ears */}
        <div className="absolute -top-3.5 left-1 w-3.5 h-4.5 bg-[#FFE2E2] transform -rotate-[5deg] rounded-tl-[1rem] rounded-tr-[0.5rem]">
          <div className="absolute top-0.5 left-0.5 w-2.5 h-3.5 bg-[#FFD1D1] rounded-tl-[0.8rem] rounded-tr-[0.3rem]" />
        </div>
        <div className="absolute -top-3.5 left-6 w-3.5 h-4.5 bg-[#FFE2E2] transform rotate-[5deg] rounded-tl-[0.5rem] rounded-tr-[1rem]">
          <div className="absolute top-0.5 right-0.5 w-2.5 h-3.5 bg-[#FFD1D1] rounded-tl-[0.3rem] rounded-tr-[0.8rem]" />
        </div>
      </motion.div>
      
      {/* Tail */}
      <motion.div
        className="absolute bottom-3 w-28 h-1.5 bg-gradient-to-r from-[#D3CDCD] to-[#E5E0E0]"
        style={{ right: '-20px', transformOrigin: 'left center' }}
        animate={{
          rotate: [-10, 10, -10],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="absolute inset-0 rounded-full" />
        <div className="absolute right-0 w-1 h-1.5 bg-[#E5E0E0] rounded-full" />
      </motion.div>
    </motion.div>
  );
};

export default Rat; 