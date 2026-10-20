// Onpost modification, 2026-10-20: service branding and open-source notices.
import { Metadata } from 'next';
import { Agent } from '@gitroom/frontend/components/agents/agent';
import { AgentChat } from '@gitroom/frontend/components/agents/agent.chat';
export const metadata: Metadata = {
  title: 'Onpost - Agent',
  description: '',
};
export default async function Page() {
  return <AgentChat />;
}
