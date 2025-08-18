'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { coursesData } from '@/data/courses.data';
import { PackageCard } from '@/components/ui/PackageCard';
import { K9ServicePanel } from '@/components/ui/K9ServicePanel';
import { Button } from '@/components/ui/Button';
import { CustomSelect, CustomSelectItem } from '@/components/ui/CustomSelect';

type TabKey = keyof typeof coursesData;

// No necesitamos props, el componente es autónomo
export const CoursesSection: React.FC = () => {
    const searchParams = useSearchParams();
    const tabFromUrl = searchParams.get('tab');

    const getValidatedTab = (tab: string | null): TabKey => {
        const validTabs = Object.keys(coursesData) as TabKey[];
        if (tab && validTabs.includes(tab as TabKey)) {
            return tab as TabKey;
        }
        return 'personalizado';
    };

    const [activeTab, setActiveTab] = useState<TabKey>(() => getValidatedTab(tabFromUrl));

    // Opcional: Sincronizar el estado si los parámetros de la URL cambian dinámicamente
    useEffect(() => {
        setActiveTab(getValidatedTab(searchParams.get('tab')));
    }, [searchParams]);

    const tabKeys = Object.keys(coursesData) as TabKey[];
    const currentData = coursesData[activeTab];

    const renderContent = () => {
        // Usamos "type guards" para que TypeScript sepa qué propiedades están disponibles.
        if ('packages' in currentData) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentData.packages.map((pkg) => (
                        <PackageCard key={pkg.title} pkg={pkg} />
                    ))}
                </div>
            );
        }

        if ('content' in currentData) {
            return <K9ServicePanel content={currentData.content} />;
        }

        return null;
    };

    return (
        <section>
            <div className="bg-neutral-900 pt-12 pb-8 px-4 text-center space-y-4">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Nuestros Cursos</h1>
                <p className="mt-4 text-sm italic text-neutral-400 max-w-lg mx-auto">
                    <span className="text-orange-400">Selecciona aquí</span> el curso que mejor se ajuste a tus necesidades:
                </p>
                <div className="flex justify-center">
                    {/* --- 1. Select para pantallas pequeñas (móvil) --- */}
                    {/* `block sm:hidden` lo muestra solo en móvil */}
                    <div className="block sm:hidden w-full max-w-xs mx-auto">
                        <CustomSelect
                            value={activeTab}
                            onValueChange={(value) => setActiveTab(value as TabKey)}
                        >
                            {tabKeys.map((tab) => (
                                <CustomSelectItem key={tab} value={tab}>
                                    {coursesData[tab].title}
                                </CustomSelectItem>
                            ))}
                        </CustomSelect>
                    </div>

                    {/* --- 2. Botones de Tabs para pantallas medianas y grandes --- */}
                    {/* `hidden sm:flex` lo muestra a partir del breakpoint 'sm' */}
                    <div className="hidden sm:flex space-x-2 bg-neutral-600 p-1 rounded-lg">
                        {tabKeys.map((tab) => {
                            const isActive = activeTab === tab;
                            return (
                                <Button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    variant={isActive ? 'primary' : 'secondary'}
                                    size="sm"
                                    className={
                                        isActive
                                            ? 'border-2 border-orange-700/50 focus:ring-offset-0 focus:ring-0'
                                            : 'bg-neutral-700/40 hover:bg-neutral-700/70 text-neutral-200 hover:text-neutral-300 border-2 border-neutral-700/50 hover:border-neutral-700/50 focus:ring-offset-0 focus:ring-0'
                                    }
                                >
                                    {coursesData[tab].title}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="py-16 px-4 sm:px-6 lg:px-8max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                        {currentData.title}
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-5xl mx-auto leading-relaxed">
                        {currentData.description}
                    </p>
                </div>
                {/* Información de paquetes */}
                <div>
                    {renderContent()}
                </div>
            </div>
        </section>
    );
};