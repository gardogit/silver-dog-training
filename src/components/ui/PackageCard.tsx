import React from 'react';
import { Button } from '@/components/ui/Button'; 
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { FaCheck } from 'react-icons/fa';
import { Package } from '@/data/courses.data';

interface PackageCardProps {
    pkg: Package;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
    return (
        <Card className="h-full flex flex-col px-6 pt-8 pb-6 bg-white ring-2 ring-neutral-200/0 hover:ring-orange-400 transition-colors duration-300 hover:border-orange-400 select-none group">
            <CardHeader className="p-0 mb-4">
                <CardTitle as="h3" className="text-2xl font-bold text-neutral-900">{pkg.title}</CardTitle>
                <CardDescription className="text-neutral-600 pt-2">{pkg.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-0">
                <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-neutral-700">
                            <FaCheck className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <div className="pt-6 mt-auto">
                <Button variant="secondary" size="lg" fullWidth className="group-hover:bg-orange-200 group-hover:border-orange-200 hover:bg-orange-200 hover:border-orange-400 focus:ring-offset-0 focus:ring-0">
                    Solicitar Paquete
                </Button>
            </div>
        </Card>
    );
};
