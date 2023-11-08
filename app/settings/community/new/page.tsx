'use client';
import { useSearchParams } from 'next/navigation';

export default function CommunitySettingPage() {
  const searchParams = useSearchParams();

  const category = searchParams.get('category');
  return (
    <div>
      <p>커뮤니티가 없는 사용자만 접근 가능</p>
      <p>여기서 새로운 커뮤니티 등록</p>
      {category}
    </div>
  );
}
