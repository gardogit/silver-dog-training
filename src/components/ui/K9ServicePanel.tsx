import React from 'react';
import { Button } from '@/components/ui/Button';
import { FaShieldAlt } from 'react-icons/fa';
import { K9Data } from '@/data/courses.data';

interface K9ServicePanelProps {
    content: K9Data;
}

export const K9ServicePanel: React.FC<K9ServicePanelProps> = ({ content }) => {
    return (
        <div className="bg-neutral-50 border-3 border-neutral-200 rounded-lg p-8 lg:p-12 max-w-3xl mx-auto select-none">
            <h3 className="text-3xl font-bold text-neutral-900 mb-4">{content.title}</h3>
            
            {content.description.map((paragraph, index) => (
                <p key={index} className="text-neutral-600 leading-relaxed mb-4">
                    {paragraph}
                </p>
            ))}

            <div className="mt-8">
                <h4 className="text-xl font-semibold text-neutral-800 mb-4">Áreas de Especialización:</h4>
                <ul className="space-y-3">
                    {content.specialties.map((specialty, index) => (
                        <li key={index} className="flex items-start gap-3 text-neutral-700">
                            <FaShieldAlt className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                            <span>{specialty}</span>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="mt-10 flex justify-center">
                <Button variant="primary" size="lg" className="hover:border-orange-700">
                    Solicitar Consulta
                </Button>
            </div>
        </div>
    );
};