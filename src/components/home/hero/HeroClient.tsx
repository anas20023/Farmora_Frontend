'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
    Activity,
    ArrowUpRight,
    Check,
    CheckCircle2,
    Cpu,
    Droplets,
    MapPin,
    ShieldCheck,
    X,
} from 'lucide-react';
import type { HeroData } from '@/types/hero';

interface HeroClientProps {
    data: HeroData;
}

export default function HeroClient({ data }: HeroClientProps) {
    const router = useRouter();
    const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState('Bogura Organic Tomatoes');
    const [reserveKg, setReserveKg] = useState<number>(50);
    const [activeSpecimen, setActiveSpecimen] = useState<number>(0);

    const pricePerKg = 65;
    const totalEst = reserveKg * pricePerKg;

    const handleReserveConfirm = () => {
        toast.success(
            `Escrow batch initiated: ${reserveKg}kg of ${selectedCrop} reserved (৳${totalEst}). Guaranteed soil telemetry SLA.`,
            {
                duration: 4500,
                style: {
                    borderRadius: '4px',
                    background: '#0c7866',
                    color: '#ffffff',
                    fontSize: '14px',
                },
            },
        );
        setIsReserveModalOpen(false);
    };

    const specimens = [
        {
            title: 'Organic Tomatoes',
            cluster: 'Bogura Green Valley',
            fact: 'Moisture 61% · Harvest in 6 days',
            price: '৳65/kg',
            img: '/crops/tomatoes.jpg',
            bg: 'var(--field-clay)',
            ink: 'var(--field-clay-ink)',
            tag: 'Telemetry Active',
        },
        {
            title: 'IoT Probe Node #240',
            cluster: 'Solar Gateway LTE',
            fact: 'NPK 42-18-35 · pH 6.4',
            price: 'Telemetry Live',
            img: '/images/hero-farm-iot.jpg',
            bg: 'var(--field-slate)',
            ink: 'var(--field-slate-ink)',
            tag: 'Hardware Specimen',
        },
        {
            title: 'Barind Winter Rice',
            cluster: 'Barind Tech Farm',
            fact: 'Yield 4.2 t/ha · Stage: Grain Fill',
            price: '৳52/kg',
            img: '/crops/rice.jpg',
            bg: 'var(--field-gold)',
            ink: 'var(--field-gold-ink)',
            tag: 'Pre-Order Open',
        },
        {
            title: 'Crisp Bell Peppers',
            cluster: 'Sonargaon Heritage',
            fact: 'Brix 5.2 · Organic Compost',
            price: '৳110/kg',
            img: '/crops/bell-peppers.jpg',
            bg: 'var(--field-spruce)',
            ink: 'var(--field-spruce-ink)',
            tag: 'Grade A Export',
        },
    ];

    return (
        <section className="relative w-full overflow-hidden bg-background">
            {/* Split 50/50 stage */}
            <div className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-7xl lg:grid-cols-12">
                {/* Left Half: Statement, supporting proof & direct action */}
                <div className="flex flex-col justify-between p-6 sm:p-10 lg:col-span-6 lg:p-14">
                    <div>
                        <div className="mb-8 flex items-center gap-2">
                            <span className="inline-block size-2.5 rounded-full bg-accent" />
                            <span className="text-xs font-medium text-muted">
                                240 Soil Telemetry Nodes Active · Bogura & Dinajpur
                            </span>
                        </div>

                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-foreground">
                            Transparent Soil, Direct Harvest.
                        </h1>

                        <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted">
                            Reserve monitored crops directly from verified growers in Bogura, Dinajpur, and Sonargaon. Backed by real-time IoT soil probes, AI yield confidence, and escrow batch guarantees.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <button
                                type="button"
                                onClick={() => setIsReserveModalOpen(true)}
                                className="inline-flex items-center gap-2 rounded bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
                            >
                                <span>Reserve Harvest Batch</span>
                                <ArrowUpRight className="size-4" />
                            </button>

                            <a
                                href="#telemetry"
                                className="inline-flex items-center gap-2 rounded border border-border bg-surface px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-secondary"
                            >
                                <span>Inspect Telemetry</span>
                            </a>
                        </div>
                    </div>

                    {/* Bottom proof strip */}
                    <div className="mt-12 grid grid-cols-3 gap-4 pt-6">
                        <div>
                            <div className="font-display text-2xl font-bold text-foreground">0%</div>
                            <div className="text-xs text-muted">Middlemen markup</div>
                        </div>
                        <div>
                            <div className="font-display text-2xl font-bold text-foreground">24h</div>
                            <div className="text-xs text-muted">Harvest to delivery</div>
                        </div>
                        <div>
                            <div className="font-display text-2xl font-bold text-foreground">100%</div>
                            <div className="text-xs text-muted">Soil sensor verified</div>
                        </div>
                    </div>
                </div>

                {/* Right Half: Specimen mosaic with tone-step background */}
                <div className="flex flex-col justify-between bg-surface-secondary/60 p-6 sm:p-10 lg:col-span-6 lg:p-12">
                    <div className="flex items-center justify-between pb-6">
                        <span className="text-xs font-semibold text-muted">
                            Catalogue Specimens ({specimens.length})
                        </span>
                        <span className="text-xs text-muted">Click to inspect node</span>
                    </div>

                    {/* Staggered specimen mosaic */}
                    <div className="grid grid-cols-2 gap-4">
                        {specimens.map((item, idx) => (
                            <div
                                key={item.title}
                                onClick={() => setActiveSpecimen(idx)}
                                className={`cursor-pointer rounded transition-transform ${
                                    activeSpecimen === idx ? 'ring-2 ring-accent' : ''
                                }`}
                                style={{
                                    backgroundColor: item.bg,
                                    color: item.ink,
                                }}
                            >
                                <div className="p-4 sm:p-5">
                                    <div className="flex items-center justify-between text-xs opacity-85">
                                        <span>{item.tag}</span>
                                        <span>{item.price}</span>
                                    </div>

                                    <div className="relative my-3 h-32 w-full overflow-hidden rounded bg-black/10 sm:h-36">
                                        <Image
                                            src={item.img}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>

                                    <div className="mt-2 font-display text-lg font-bold leading-tight">
                                        {item.title}
                                    </div>
                                    <div className="mt-1 text-xs opacity-90">{item.cluster}</div>
                                    <div className="mt-2 text-xs font-medium opacity-75">{item.fact}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Live batch quick-bar */}
                    <div className="mt-6 flex items-center justify-between rounded bg-surface p-4 text-foreground border border-border">
                        <div className="flex items-center gap-3">
                            <span className="flex size-8 items-center justify-center rounded bg-accent/10 text-accent">
                                <Activity className="size-4" />
                            </span>
                            <div>
                                <div className="text-xs font-semibold text-foreground">
                                    Active: {specimens[activeSpecimen].title}
                                </div>
                                <div className="text-xs text-muted">
                                    {specimens[activeSpecimen].fact}
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setSelectedCrop(specimens[activeSpecimen].title);
                                setIsReserveModalOpen(true);
                            }}
                            className="rounded bg-foreground px-3.5 py-1.5 text-xs font-semibold text-background hover:opacity-90"
                        >
                            Pre-Order
                        </button>
                    </div>
                </div>
            </div>

            {/* Interactive Live Batch Modal */}
            {isReserveModalOpen && (
                <div
                    data-ui="true"
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                >
                    <div className="w-full max-w-lg rounded bg-surface p-6 text-foreground border border-border">
                        <div className="flex items-center justify-between pb-4">
                            <div>
                                <h3 className="font-display text-2xl font-bold">Reserve Harvest Batch</h3>
                                <p className="text-xs text-muted mt-1">Smart agricultural escrow pre-order</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsReserveModalOpen(false)}
                                className="rounded p-1 text-muted hover:text-foreground"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        <div className="mt-5 space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-muted block mb-1">
                                    CROP SPECIMEN & PLOT
                                </label>
                                <select
                                    value={selectedCrop}
                                    onChange={(e) => setSelectedCrop(e.target.value)}
                                    className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                                >
                                    <option value="Bogura Organic Tomatoes">Bogura Organic Tomatoes (Plot B-4 · ৳65/kg)</option>
                                    <option value="Barind Winter Rice">Barind Winter Rice (Plot A-1 · ৳52/kg)</option>
                                    <option value="Sonargaon Bell Peppers">Sonargaon Bell Peppers (Plot S-9 · ৳110/kg)</option>
                                    <option value="Dinajpur Cauliflower">Dinajpur Cauliflower (Plot D-3 · ৳45/kg)</option>
                                </select>
                            </div>

                            <div>
                                <div className="flex items-center justify-between text-xs font-semibold text-muted mb-1">
                                    <span>BATCH QUANTITY</span>
                                    <span className="text-foreground">{reserveKg} kg</span>
                                </div>
                                <input
                                    type="range"
                                    min="20"
                                    max="500"
                                    step="10"
                                    value={reserveKg}
                                    onChange={(e) => setReserveKg(Number(e.target.value))}
                                    className="w-full accent-accent"
                                />
                                <div className="flex justify-between text-xs text-muted mt-1">
                                    <span>Min: 20 kg</span>
                                    <span>Commercial max: 500 kg</span>
                                </div>
                            </div>

                            <div className="rounded bg-surface-secondary p-4 space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-muted">Direct Farmer Price</span>
                                    <span className="font-medium text-foreground">৳{pricePerKg} / kg</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted">Telemetry SLA & Cold-Chain Escrow</span>
                                    <span className="font-medium text-accent">Included (0% markup)</span>
                                </div>
                                <div className="flex justify-between pt-2 font-display text-base font-bold">
                                    <span>Total Escrow Commitment</span>
                                    <span className="text-foreground">৳{totalEst.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="text-xs text-muted flex items-start gap-2">
                                <ShieldCheck className="size-4 shrink-0 text-accent" />
                                <span>
                                    Funds are released only when digital harvest verification and weight receipt are approved at delivery.
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsReserveModalOpen(false)}
                                className="rounded px-4 py-2 text-sm font-medium text-muted hover:text-foreground"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleReserveConfirm}
                                className="rounded bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90"
                            >
                                Confirm Pre-Order Escrow
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
