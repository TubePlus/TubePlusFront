import SimpleCard from '@/components/SimpleCard';
import { Button } from '@nextui-org/button';
import { useQuery } from '@tanstack/react-query';

const SummaryCard = () => {
  return (
    <div className="flex flex-col gap-2">
      <SimpleCard title="Settings Summary">
        <span className="px-2">My Settings...</span>
        <ul className="px-2">
          <li>프로필</li>
          <li>이메일</li>
          <li>username</li>
          <li>about(bio)</li>
          <li>is_creator</li>
          <li>notification</li>
          <li>safetyPrivacy</li>
          <li>community name</li>
          <li>community bio</li>
          <li>api key 인증 여부...등등</li>
        </ul>
      </SimpleCard>

      <Button
        className={
          'text-success-foreground border border-success-500 hover:bg-success-600'
        }
        color="success"
        fullWidth
      >
        Update Profile
      </Button>
    </div>
  );
};

export default SummaryCard;
