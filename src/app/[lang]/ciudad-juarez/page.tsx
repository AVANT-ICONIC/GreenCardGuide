import { notFound } from 'next/navigation';
import { CiudadJuarezHub } from '@/components/ciudad-juarez-hub';
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

  return <CiudadJuarezHub language={lang} />;
}
