// Onpost modification, 2026-10-20: service branding and open-source notices.
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Onpost - Agent',
  description: '',
};

export default async function Page() {
  return redirect('/agents/new');
}
