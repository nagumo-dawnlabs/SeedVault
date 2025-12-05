import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Server, Shield, ArrowRight } from 'lucide-react';

export const ValidatorOnboarding: React.FC = () => {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const steps = [
        {
            id: 1,
            title: 'Create Identity',
            description: 'Generate your validator identity and keypairs.',
            icon: Shield,
        },
        {
            id: 2,
            title: 'Hardware Setup',
            description: 'Provision high-performance server infrastructure.',
            icon: Server,
        },
        {
            id: 3,
            title: 'Apply to Pool',
            description: 'Submit your validator for Colosseum review.',
            icon: CheckCircle,
        },
    ];

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            setIsSubmitted(true);
        }
    };

    return (
        <div className="py-12 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl font-bold mb-4 uppercase tracking-wide">Become a Gladiator</h1>
                <p className="text-colosseum-text-muted text-lg max-w-2xl mx-auto">
                    Join the elite ranks of Colosseum validators. Prove your performance, earn delegation, and support the ecosystem.
                </p>
            </motion.div>

            {/* Steps Progress */}
            <div className="flex justify-between items-center mb-12 relative">
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-colosseum-border -z-10" />
                {steps.map((s) => (
                    <div key={s.id} className="flex flex-col items-center bg-black px-4">
                        <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${step >= s.id
                                    ? 'bg-colosseum-card border-colosseum-green text-colosseum-green shadow-[0_0_10px_rgba(0,209,140,0.3)]'
                                    : 'bg-colosseum-card border-colosseum-border text-colosseum-text-muted'
                                }`}
                        >
                            <s.icon size={20} />
                        </div>
                        <span
                            className={`mt-2 text-sm font-medium uppercase tracking-wide ${step >= s.id ? 'text-white' : 'text-colosseum-text-muted'
                                }`}
                        >
                            {s.title}
                        </span>
                    </div>
                ))}
            </div>

            {/* Content Area */}
            <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-panel p-8 rounded-sm mb-8"
            >
                {isSubmitted ? (
                    <div className="text-center py-12">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-24 h-24 bg-colosseum-green/20 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <CheckCircle size={48} className="text-colosseum-green" />
                        </motion.div>
                        <h2 className="text-3xl font-bold mb-4 uppercase tracking-wide">Application Submitted!</h2>
                        <p className="text-colosseum-text-muted mb-8">
                            Your application is under review. We will contact you shortly via the provided channels.
                        </p>
                        <button
                            onClick={() => {
                                setStep(1);
                                setIsSubmitted(false);
                            }}
                            className="text-colosseum-green hover:text-white transition-colors uppercase tracking-wide font-medium"
                        >
                            Start New Application
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">{steps[step - 1].title}</h2>
                        <p className="text-colosseum-text-muted mb-8">{steps[step - 1].description}</p>

                        <div className="bg-black/50 p-6 rounded-sm border border-colosseum-border mb-8 font-mono text-sm text-colosseum-text-muted">
                            {step === 1 && (
                                <div className="space-y-2">
                                    <p>$ solana-keygen new -o validator-keypair.json</p>
                                    <p>$ solana config set --url mainnet-beta</p>
                                </div>
                            )}
                            {step === 2 && (
                                <div className="space-y-2">
                                    <p>CPU: 12+ cores / 24+ threads</p>
                                    <p>RAM: 256GB+ ECC Memory</p>
                                    <p>Disk: 2TB+ NVMe SSD (PCIe Gen4)</p>
                                </div>
                            )}
                            {step === 3 && (
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Validator Name"
                                        className="w-full bg-black border border-colosseum-border rounded-sm px-4 py-2 focus:border-colosseum-green outline-none text-white"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Identity Pubkey"
                                        className="w-full bg-black border border-colosseum-border rounded-sm px-4 py-2 focus:border-colosseum-green outline-none text-white"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleNext}
                                className="btn-primary flex items-center space-x-2"
                            >
                                <span>{step === 3 ? 'Submit Application' : 'Continue'}</span>
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
};
