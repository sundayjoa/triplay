"use client";

import Navbar from "@/components/Navbar";
import '../styles/events.css';
import RegionSelect from '@/components/RegionSelect';

export default function EventsPage() {
    return (
        <main>
            <Navbar />
            <RegionSelect />
        </main>
    );
}
