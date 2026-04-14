import { notFound } from 'next/navigation';
import { CiudadJuarezHub } from '@/components/ciudad-juarez-hub';
import { loadCiudadJuarezHubContent } from '@/lib/content/loadCiudadJuarezHubContent';
import { isSupportedLanguage } from '@/lib/content/locale';

export default async function CiudadJuarezPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  return <CiudadJuarezHub content={loadCiudadJuarezHubContent(lang)} />;
}
