'use client';
import { useSearchParams } from 'next/navigation';

export default function CommunitySettingPage() {
  const searchParams = useSearchParams();

  const category = searchParams.get('category');
  return <div>{category}</div>;
}
